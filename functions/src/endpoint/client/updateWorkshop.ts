import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopConfidential, WorkshopConfidentialSchema, WorkshopConfidentialSchemaLibrary, WorkshopSchema, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { any, object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { authMiddleware } from "../middleware/auth";
import { createRouter } from "./trpcUtil";


const {
  title, capacity, datetime, datetimeStr, description, duration, fee, language, venue
} = WorkshopSchemaLibrary;

export const updateWorkshop = createRouter()
  .middleware(authMiddleware)
  .mutation('', {
    meta: {
      auth: "admin",
      appCheck: false
    },
    input: object({
      id: idSchema,
      title: title.optional(),
      capacity: capacity.optional(),
      datetimeStr: datetimeStr.optional(),
      description: description.optional(),
      duration: duration.optional(),
      fee: fee.optional(),
      language: language.optional(),
      venue: venue.optional()
    }),
    resolve: async ({ input, ctx, type }) => {
      const id = input.id;
      const data = {
        datetime: input.datetimeStr
          ? admin.firestore.Timestamp.fromMillis(Date.parse(input.datetimeStr))
          : undefined,
        ...input,
        id: undefined
      };

      try {  
        await admin.firestore().doc(`/workshops/${id}`).update(data);
      } catch(err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Fail to update workshop ${id}`,
          cause: err
        });
      }

      return {
        message: `Successfully update workshop ${id}`
      };
    },
    output: object({
      message: string(),
    })
  });