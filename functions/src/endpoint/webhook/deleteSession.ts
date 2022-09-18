import { any, object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { sessionIdSchema } from "../../types/sessionIdSchema";
import { sessionStore } from "../middleware/session";
import { createRouter } from "./trpcUtil";


export const deleteSession = createRouter()
  .mutation('', {
    meta: {
    },
    input: object({
      sessionId: sessionIdSchema,
    }),
    resolve: async ({ input, ctx, type }) => {
      sessionStore.destroy(input.sessionId, (err => {
        if (err)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Fail to delete session ${input.sessionId}`,
            cause: err
          });
      }));
    
      return {
        message: `Successfully delete session ${input.sessionId}`
      }
    },
    output: object({
      message: string()
    })
  });