import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from "express";
import * as functions from "firebase-functions";
import { createAdmin } from './createAdmin';
import { createWorkshop } from './createWorkshop';
import { deleteAdmin } from './deleteAdmin';
import { deleteWorkshop } from './deleteWorkshop';
import { enroll } from './enroll';
import { initiateEnroll } from './intiateEnroll';
import { createContext, createRouter } from './trpcUtil';
import { updateWorkshop } from './updateWorkshop';


const app = express();

const appRouter = createRouter()
  .merge('createAdmin', createAdmin)
  .merge('createWorkshop', createWorkshop)
  .merge('deleteAdmin', deleteAdmin)
  .merge('deleteWorkshop', deleteWorkshop)
  .merge('enroll', enroll)
  .merge('initiateEnroll', initiateEnroll)
  .merge('updateWorkshop', updateWorkshop);

// app.use(genMiddleware({
//   useAuth: "admin",
//   corsDomain: "all"
// }));
app.use(
  '/',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

export type AppRouter = typeof appRouter;  // To be imported by client

export default functions.region('asia-east2').https.onRequest(app);