import * as admin from "firebase-admin";
import { UserSchemaLibrary, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { Context, createRouter, Meta } from "./trpcUtil";

export const createAdmin = createRouter()
  .mutation('', {
    meta: {
      auth: "admin",
      appCheck: false
    },
    input: object({
      phone: UserSchemaLibrary.phone
    }),
    resolve: async ({ input, ctx, type }) => {
      try {
        const user = await admin.auth().createUser({
          phoneNumber: input.phone
        })
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });  

      } catch(err) {
        // https://trpc.io/docs/v9/error-handling#error-codes
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User is already an admin",
        })
      }

      return {
        message: `Successfully made ${input.phone} an admin`
      };
    },
    output: object({
      message: string()
    })
  });