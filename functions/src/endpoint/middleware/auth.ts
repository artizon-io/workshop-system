import * as admin from "firebase-admin";
import { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";
import { TRPCError } from "@trpc/server";


// Deprecated. Wait until tRPC v10 rolls out! (proper support for procedure-level middleware)

// export const authMiddleware = async <
//   TContext extends { authorization: string },
//   TMeta extends { auth?: "admin" | "user"; appCheck: boolean }
// >({ ctx, next, path, rawInput, type, meta } : Parameters<MiddlewareFunction<TContext, TContext, TMeta>>[number]) : ReturnType<MiddlewareFunction<TContext, TContext, TMeta>> => {
// export const authMiddleware : MiddlewareFunction<any, any, any> = async ({ ctx, next, path, rawInput, type, meta }) => {
//   if (!meta?.auth)
//     return next();

//   // superuser mode for testing in dev mode
//   if (`${process.env.MODE}` === 'dev' && `${process.env.SECRET}` === ctx.authorization)
//     return next();

//   switch(meta.auth) {
//     case "admin":
//     case "user":
//       let id;
//       try {
//         id = await admin.auth().verifyIdToken(`${ctx.authorization}`);
//       } catch(err) {
//         throw new TRPCError({
//           code: "UNAUTHORIZED",
//           message: `Invalid Id token`,
//           cause: err
//         });
//       }
//       if (meta.auth === "user") break;

//       const user = await admin.auth().getUser(id.uid);
//       if (!user.customClaims?.admin)
//         throw new TRPCError({
//           code: "UNAUTHORIZED",
//           message: `Not an admin`,
//         });

//       break;
//   }

//   if (!meta.appCheck)
//     return next();

//   try {
//     await admin.appCheck().verifyToken(`${ctx.authorization}`);
//   } catch(err) {
//     throw new TRPCError({
//       code: "UNAUTHORIZED",
//       message: `Invalid app check token`,
//       cause: err
//     });
//   }

//   return next();
// }