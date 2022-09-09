import Stripe from "stripe";


export const initStripe = () => {
  return new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: '2022-08-01'
  });
}