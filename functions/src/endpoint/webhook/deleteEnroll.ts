import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopConfidential, WorkshopConfidentialSchema, WorkshopConfidentialSchemaLibrary, WorkshopSchema, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { any, object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { validate } from "../../utils/validate";
import { createRouter } from "./trpcUtil";
import * as functions from "firebase-functions";


export const deleteEnroll = createRouter()
  .mutation('', {
    meta: {
      stripe: false
    },
    input: object({
      workshopId: idSchema,
      enrollId: WorkshopConfidentialSchemaLibrary.enrolls.id
    }),
    resolve: async ({ input, ctx, type }) => {
      await admin.firestore().runTransaction(async t => {
        const doc = (await t.get(admin.firestore().doc(`/workshop-confidential/${input.workshopId}`))).data();
        if (!doc)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Workshop ${input.workshopId} doesn't exist`
          });
    
        const {data, issues} = validate(
          WorkshopConfidentialSchema,
          doc
        );
      
        if (issues) {
          functions.logger.error(`Workshop confidential ${input.workshopId} doc incorrect schema`, issues)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }
    
        const enrolls = data.enrolls;
        const enroll = enrolls.find(enroll => enroll.id === input.enrollId);
    
        try {
          t.update(admin.firestore().doc(`/workshop-confidential/${input.workshopId}`), {
            current: admin.firestore.FieldValue.increment(-1),
            enrolls: admin.firestore.FieldValue.arrayRemove(enroll)
          });
        } catch(err) {
          functions.logger.error(`Fail to update workshop-confidential ${input.workshopId}`, issues)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      });
    
      return {
        message: `Successfully delete enroll ${input.enrollId} on workshop ${input.workshopId}`
      }
    },
    output: object({
      message: string()
    })
  });