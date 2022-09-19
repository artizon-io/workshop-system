import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./trpcUtil";
import * as functions from "firebase-functions";


export const deleteWorkshop = createRouter()
  .mutation('', {
    meta: {
      auth: "admin",
      appCheck: false
    },
    input: object({
      id: idSchema
    }),
    resolve: async ({ input, ctx, type }) => {
      try {  
        await admin.firestore().doc(`/workshops/${input.id}`).delete();
      } catch(err) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Workshop ${input.id} doesn't exist`,
        });
      }
    
      return {
        message: `Successfully delete workshop ${input.id}`
      };
    },
    output: object({
      message: string(),
    })
  });