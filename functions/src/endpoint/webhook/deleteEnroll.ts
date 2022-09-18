import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopConfidential, WorkshopConfidentialSchema, WorkshopConfidentialSchemaLibrary, WorkshopSchema, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { any, object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { validate } from "../../utils/validate";
import { createRouter } from "./trpcUtil";


export const deleteEnroll = createRouter()
  .mutation('', {
    meta: {
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
      
        if (issues)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Workshop confidential ${input.workshopId} doc incorrect schema`,
            cause: issues
          });
    
        const enrolls = data.enrolls;
        const enroll = enrolls.find(enroll => enroll.id === input.enrollId);
    
        try {
          t.update(admin.firestore().doc(`/workshop-confidential/${input.workshopId}`), {
            current: admin.firestore.FieldValue.increment(-1),
            enrolls: admin.firestore.FieldValue.arrayRemove(enroll)
          });
        } catch(err) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Fail to update workshop-confidential ${input.workshopId}`,
            cause: issues
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