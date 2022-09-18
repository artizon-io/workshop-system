import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { authMiddleware } from "../middleware/auth";
import { createRouter } from "./trpcUtil";


export const deleteWorkshop = createRouter()
  .middleware(authMiddleware)
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
          cause: err
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