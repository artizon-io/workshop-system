import * as admin from "firebase-admin";
import { idSchema, UserSchemaLibrary, WorkshopSchemaLibrary } from "@mingsumsze/common"
import { object, string, ZodError } from "zod";
import { TRPCError } from "@trpc/server";
import { authMiddleware } from "../middleware/auth";
import { createRouter } from "./trpcUtil";


export const deleteAdmin = createRouter()
  .middleware(authMiddleware)
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
        const user = await admin.auth().getUserByPhoneNumber(input.phone);
        admin.auth().deleteUser(user.uid);

      } catch(err) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User ${input.phone} isn't an admin`,
          cause: err
        });
      }

      return {
        message: `Successfully delete admin ${input.phone}`
      };
    },
    output: object({
      message: string(),
    })
  });