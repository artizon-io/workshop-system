import * as trpc from "@trpc/server";
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
import * as admin from "firebase-admin";
import { TRPCError } from '@trpc/server';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { session } from '../middleware/session';
import { getTransformer } from "@mingsumsze/common";


const app = express();

const appRouter = createRouter()
  .transformer(getTransformer())
  .middleware(async ({ ctx, next, path, rawInput, type, meta }) => {
    if (!meta?.auth)
      return next();
  
    // superuser mode for testing in dev mode
    if (`${process.env.MODE}` === 'dev' && `${process.env.SECRET}` === ctx.authorization)
      return next();
  
    switch(meta.auth) {
      case "admin":
      case "user":
        let id;
        try {
          id = await admin.auth().verifyIdToken(`${ctx.authorization}`);
        } catch(err) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: `Invalid Id token`,
          });
        }
        if (meta.auth === "user") break;
  
        const user = await admin.auth().getUser(id.uid);
        if (!user.customClaims?.admin)
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: `Not an admin`,
          });
  
        break;
    }
  
    if (!meta.appCheck)
      return next();
  
    try {
      await admin.appCheck().verifyToken(`${ctx.authorization}`);
    } catch(err) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: `Invalid app check token`,
      });
    }
  
    return next();
  })
  .merge('createAdmin', createAdmin)
  .merge('createWorkshop', createWorkshop)
  .merge('deleteAdmin', deleteAdmin)
  .merge('deleteWorkshop', deleteWorkshop)
  .merge('enroll', enroll)
  .merge('initiateEnroll', initiateEnroll)
  .merge('updateWorkshop', updateWorkshop);

// See https://stackoverflow.com/questions/24687313/what-exactly-does-the-access-control-allow-credentials-header-do
app.use(cors({
  origin: "*",
  // credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(session);
app.use(
  '/',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

export type AppRouter = typeof appRouter;  // To be imported by client

export default functions.runWith({ secrets: ["STRIPE_SECRET", "STRIPE_SECRET_TEST", "SECRET", "SESSION_SECRET"] })
  .region('asia-east2').https.onRequest(app);