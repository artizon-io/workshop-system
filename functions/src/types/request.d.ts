import type Stripe from "stripe";

// See https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
declare global {
  namespace Express {
    export interface Request {
      stripeEvent: Stripe.Event;
    }
  }
}