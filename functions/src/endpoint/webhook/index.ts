import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from "express";
import * as functions from "firebase-functions";
import { deleteEnroll } from './deleteEnroll';
import { deleteSession } from './deleteSession';
import { strip } from './stripe';
import { createContext, createRouter } from './trpcUtil';


const app = express();

const appRouter = createRouter()
  .merge('deleteEnroll', deleteEnroll)
  .merge('stripe', strip)
  .merge('deleteSession', deleteSession);

// app.use(genMiddleware({
//   corsDomain: "all"
// }));
app.use(
  '/',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

export type AppRouter = typeof appRouter;

export default functions.region('asia-east2').https.onRequest(app);