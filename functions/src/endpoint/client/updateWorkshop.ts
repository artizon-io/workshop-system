import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopConfidential, WorkshopConfidentialSchema, WorkshopConfidentialSchemaLibrary, WorkshopSchema, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { any, object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./trpcUtil";
import * as functions from "firebase-functions";


const {
  title, capacity, datetime, description, duration, fee, language, venue
} = WorkshopSchemaLibrary;

export const updateWorkshop = createRouter()
  .mutation('', {
    meta: {
      auth: "admin",
      appCheck: false
    },
    input: object({
      id: idSchema,
      title: title.optional(),
      capacity: capacity.optional(),
      datetime: datetime.optional(),
      description: description.optional(),
      duration: duration.optional(),
      fee: fee.optional(),
      language: language.optional(),
      venue: venue.optional()
    }),
    resolve: async ({ input, ctx, type }) => {
      const id = input.id;
      // const data = {
      //   datetime: input.datetimeStr
      //     ? admin.firestore.Timestamp.fromMillis(Date.parse(input.datetimeStr))
      //     : undefined,
      //   ...input,
      //   id: undefined
      // };
      const data = {
        ...input,
        id: undefined
      };

      try {  
        await admin.firestore().doc(`/workshops/${id}`).update(data);
      } catch(err) {
        functions.logger.error(`Fail to update workshop ${id}`, err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
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