import { TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from "express";
import * as functions from "firebase-functions";
import { getStripe } from '../../utils/getStripe';
import { deleteEnroll } from './deleteEnroll';
import { deleteSession } from './deleteSession';
import { strip } from './stripe';
import { createContext, createRouter } from './trpcUtil';


const app = express();

const appRouter = createRouter()
  .middleware(async ({ ctx, next, path, rawInput, type, meta }) => {
    if (!meta?.stripe)
      return next();
  
    if (!ctx.stripeSignature)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `Missing stripe signature`,
      });
      
    const stripe = getStripe();
  
    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        rawInput as string,  // same as request.body
        ctx.stripeSignature,
        `${process.env.MODE}` === "prod"
          ? `${process.env.STRIPE_ENDPOINT_SECRET}`
          : `${process.env.STRIPE_ENDPOINT_SECRET_TEST}`
      );
    } catch (err) {
      functions.logger.error(`Fail to construct stripe event object`, err)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  
    // Context swapping
    // See: https://trpc.io/docs/v9/middlewares#context-swapping
    return next({
      ctx: {
        ...ctx,
        stripeEvent
      }
    });
  })
  .merge('deleteEnroll', deleteEnroll)
  .merge('stripe', strip)
  .merge('deleteSession', deleteSession);


app.use(cors({ origin: "*" }));
app.use(bodyParser.json({}));
app.use(
  '/',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

export type AppRouter = typeof appRouter;

export default functions.runWith({ secrets: ["STRIPE_ENDPOINT_SECRET", "STRIPE_ENDPOINT_SECRET_TEST"] })
  .region('asia-east2').https.onRequest(app);