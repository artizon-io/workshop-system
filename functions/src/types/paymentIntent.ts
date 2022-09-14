import { stripeMetadata } from "./stripeMetadata";

export interface paymentIntent {
  amount: number;
  metadata: stripeMetadata;
}