import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';


export interface Meta {
  auth?: "admin" | "user";
  appCheck: boolean;
}

export const createRouter = () => trpc.router<Context, Meta>();  // for creating sub router

// Request context: populating the context object for the "middlewares" of tRPC
// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcExpress.CreateExpressContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  const session = opts?.req.headers.session;

  return {
    session,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;