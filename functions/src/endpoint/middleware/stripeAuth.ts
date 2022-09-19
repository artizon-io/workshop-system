// import * as admin from "firebase-admin";
// import { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";
// import { TRPCError } from "@trpc/server";
// import { getStripe } from "../../utils/getStripe";


// export const stripeAuthMiddleware : MiddlewareFunction<any, any, any> = async ({ ctx, next, path, rawInput, type, meta }) => {
//   if (!meta?.stripe)
//     return next();

//   if (!ctx.stripeSignature)
//     throw new TRPCError({
//       code: "UNAUTHORIZED",
//       message: `Missing stripe signature`,
//     });
    
//   const stripe = getStripe();

//   let stripeEvent;
//   try {
//     stripeEvent = stripe.webhooks.constructEvent(
//       rawInput as string,  // same as request.body
//       ctx.stripeSignature,
//       `${process.env.MODE}` === "prod"
//         ? `${process.env.STRIPE_ENDPOINT_SECRET}`
//         : `${process.env.STRIPE_ENDPOINT_SECRET_TEST}`
//     );
//   } catch (err) {
//     throw new TRPCError({
//       code: "INTERNAL_SERVER_ERROR",
//       message: `Fail to construct stripe event object`,
//       cause: err
//     });
//   }

//   // Context swapping
//   // See: https://trpc.io/docs/v9/middlewares#context-swapping
//   return next({
//     ctx: {
//       ...ctx,
//       stripeEvent
//     }
//   });
// }