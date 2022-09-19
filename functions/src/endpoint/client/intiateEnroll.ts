import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopConfidential, WorkshopConfidentialSchema, WorkshopConfidentialSchemaLibrary, WorkshopSchema, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { any, object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { validate } from "../../utils/validate";
import { v4 as uuid } from 'uuid';
import { getStripe } from "../../utils/getStripe";
import { createTask } from "../../utils/createTask";
import { createRouter } from "./trpcUtil";
import { sessionStore } from "../middleware/session";
import * as functions from "firebase-functions";


export const initiateEnroll = createRouter()
  .mutation('', {
    meta: {
      auth: "user",
      appCheck: false
    },
    input: object({
      workshopId: idSchema,
    }),
    resolve: async ({ input, ctx, type }) => {
      const [enrollId, fee, stripeClientSecret] = await admin.firestore().runTransaction(async t => {
        const workshopDoc = (await t.get(admin.firestore().doc(`/workshops/${input.workshopId}`))).data();
        if (!workshopDoc)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Workshop ${input.workshopId} doesn't exist`
          });
    
        const {data, issues} = validate(
          WorkshopSchema,
          workshopDoc
        );
      
        if (issues) {
          functions.logger.error(`Workshop ${input.workshopId} doc incorrect schema`, issues);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }
    
        const workshopConfidentialDoc = (await t.get(admin.firestore().doc(`/workshop-confidential/${input.workshopId}`))).data();
        if (!workshopConfidentialDoc) {
          functions.logger.error(`Workshop confidential ${input.workshopId} doesn't exist`);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR"
          });
        }
    
        const {data: cData, issues: cIssues} = validate(
          WorkshopConfidentialSchema,
          workshopConfidentialDoc
        );
      
        if (cIssues) {
          functions.logger.error(`Workshop confidential ${input.workshopId} doc incorrect schema`, cIssues)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }
    
        if (cData.current+1 > data.capacity)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Workshop ${input.workshopId} is full`,
          });
    
        const enrollId = uuid();
    
        const stripe = getStripe();
    
        const paymentIntent = await stripe.paymentIntents.create({
          amount: fee! * 100,
          currency: "hkd",
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: {
            workshopId: input.workshopId,
            enrollId
          },
          // application_fee_amount: (fee! * 0.034 + 2.35) * 100,  // stripe charge 3.4% + HKD2.35 per successful card charge
        });
    
        // See https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
        type WorkshopConfidentialEnroll = WorkshopConfidential['enrolls'][number];
    
        t.update(admin.firestore().doc(`/workshop-confidential/${input.workshopId}`), {
          current: admin.firestore.FieldValue.increment(1),
          enrolls: admin.firestore.FieldValue.arrayUnion({
            id: enrollId,
            paymentStatus: 'unpaid',
            stripePaymentId: paymentIntent.id
          } as WorkshopConfidentialEnroll)
        });
    
        return [enrollId, data.fee, paymentIntent.client_secret];
      }) as [string, number, string];
    

      if (ctx.session.enrollInfo) {  // delete existing reservation immediately if one exists
        await createTask(
          'deleteEnroll',  // endpoint
          {  // payload
            workshopId: ctx.session.enrollInfo.workshopId,
            enrollId: ctx.session.enrollInfo.enrollId
          },
          0,  // delay in minutes
          'ttl'  // task queue
        );
      }

      sessionStore.set(ctx.session.id, {
        enrollInfo: {
          workshopId: input.workshopId,
          enrollId,
        },
        cookie: ctx.session.cookie
      });
      await createTask(
        'deleteSession',  // endpoint
        {  // payload
          sessionId: ctx.session.id,
        },
        15,  // delay in minutes
        'ttl'  // task queue
      );
    
      await createTask(
        'deleteEnroll',  // endpoint
        {  // payload
          workshopId: input.workshopId,
          enrollId: enrollId
        },
        15,  // delay in minutes
        'ttl'  // task queue
      );
    
      return {
        message: "Success",
        enrollId: enrollId,
        stripeClientSecret
      };
    },
    output: object({
      message: string(),
      enrollId: WorkshopConfidentialSchemaLibrary.enrolls.id,
      stripeClientSecret: any()
    })
  });