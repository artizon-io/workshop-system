import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';


export interface Meta {
  // cors: string;
}

export const createRouter = () => trpc.router<Context, Meta>();

export async function createContext(opts?: trpcExpress.CreateExpressContextOptions) {
  const stripeSignature = opts?.req.headers['stripe-signature'];

  return {
    stripeSignature,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;