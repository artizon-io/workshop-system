import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { authMiddleware } from "../middleware/auth";
import { createRouter } from "./trpcUtil";

const {
  title, capacity, datetime, datetimeStr, description, duration, fee, language, venue
} = WorkshopSchemaLibrary;

export const createWorkshop = createRouter()
  .middleware(authMiddleware)
  .mutation('', {
    meta: {
      auth: "admin",
      appCheck: false
    },
    input: object({
      title,
      capacity,
      datetimeStr,
      description,
      duration,
      fee,
      language,
      venue
    }),
    resolve: async ({ input, ctx, type }) => {
      const data = {
        datetime: admin.firestore.Timestamp.fromMillis(Date.parse(input.datetimeStr)),
        ...input,
        datetimeStr: undefined
      };
    
      let id : string;
      try {  
        const docRef = await admin.firestore().collection(`/workshops`).add(data);
        id = docRef.id;
      } catch(err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Fail to create workshop",
          cause: err
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