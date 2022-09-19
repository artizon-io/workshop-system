import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import session, { Session, SessionData } from 'express-session';
import { Timestamp } from "firebase-admin/firestore";


export interface Meta {
  auth?: "admin" | "user";
  appCheck: boolean;
}

export const createRouter = () => trpc.router<Context, Meta>();  // for creating sub router

// Request context: populating the context object for the "middlewares" of tRPC
// The app's context - is generated for each incoming request
export async function createContext(opts: trpcExpress.CreateExpressContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  return {
    session: opts.req.session,
    authorization: opts.req.headers.authorization,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;