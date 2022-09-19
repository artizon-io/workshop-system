import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopSchema, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./trpcUtil";
import * as functions from "firebase-functions";

export const createWorkshop = createRouter()
  .mutation('', {
    meta: {
      auth: "admin",
      appCheck: false
    },
    input: WorkshopSchema,
    resolve: async ({ input, ctx, type }) => {
      // const data = {
      //   datetime: admin.firestore.Timestamp.fromMillis(Date.parse(input.datetimeStr)),
      //   ...input,
      //   datetimeStr: undefined
      // };
      const data = input;
    
      let id : string;
      try {  
        const docRef = await admin.firestore().collection(`/workshops`).add(data);
        id = docRef.id;
      } catch(err) {
        functions.logger.error("Fail to create workshop", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    
      return {
        message: `Successfully create workshop ${id}`,
        workshopId: id
      };
    },
    output: object({
      message: string(),
      workshopId: idSchema
    })
  });