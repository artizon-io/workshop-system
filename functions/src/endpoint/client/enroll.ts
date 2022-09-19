import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopConfidentialSchema, WorkshopConfidentialSchemaLibrary, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { validate } from "../../utils/validate";
import { createRouter } from "./trpcUtil";
import * as functions from "firebase-functions";


export const enroll = createRouter()
  .mutation('', {
    meta: {
      auth: "user",
      appCheck: false
    },
    input: object({
      workshopId: idSchema,
      enrollId: WorkshopConfidentialSchemaLibrary.enrolls.id,
      firstName: WorkshopConfidentialSchemaLibrary.enrolls.firstName,
      lastName: WorkshopConfidentialSchemaLibrary.enrolls.lastName,
      phone: WorkshopConfidentialSchemaLibrary.enrolls.phone,
      email: WorkshopConfidentialSchemaLibrary.enrolls.email,
    }),
    resolve: async ({ input, ctx, type }) => {
      if (
        ctx.session.enrollInfo?.workshopId !== input.workshopId ||
        ctx.session.enrollInfo?.enrollId !== input.enrollId
      )
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User is not currently enrolled to ${input.enrollId} on workshop ${input.workshopId}`
        });

      const doc = (await admin.firestore().doc(`/workshop-confidential/${input.workshopId}`).get()).data();
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
        functions.logger.error(`Workshop ${input.workshopId} doc incorrect schema`, issues); 
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      
      const enrolls = data.enrolls;
      const enroll = enrolls.find(enroll => enroll.id === input.enrollId);
      if (!enroll)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Enroll ${input.enrollId} doesn't exist on workshop ${input.workshopId}`,
          cause: issues
        });
    
      enroll.firstName = input.firstName;
      enroll.lastName = input.lastName;
      enroll.phone = input.phone;
      enroll.email = input.email;
    
      try {
        await admin.firestore().doc(`/workshop-confidential/${input.workshopId}`).update({
          enrolls
        });
        return {
          message: `Successfully enrolled`
        }
      } catch(err) {
        functions.logger.error(`Fail to update workshop-confidential ${input.workshopId}`, err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
    output: object({
      message: string(),
    })
  });