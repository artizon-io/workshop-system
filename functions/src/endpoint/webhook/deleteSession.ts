import { any, object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { sessionIdSchema } from "../../types/sessionIdSchema";
import { sessionStore } from "../middleware/session";
import { createRouter } from "./trpcUtil";
import * as functions from "firebase-functions";


export const deleteSession = createRouter()
  .mutation('', {
    meta: {
      stripe: false
    },
    input: object({
      sessionId: sessionIdSchema,
    }),
    resolve: async ({ input, ctx, type }) => {
      sessionStore.destroy(input.sessionId, (err => {
        if (err) {
          functions.logger.error(`Fail to delete session ${input.sessionId}`, err)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      }));
    
      return {
        message: `Successfully delete session ${input.sessionId}`
      }
    },
    output: object({
      message: string()
    })
  });