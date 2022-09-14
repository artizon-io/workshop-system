import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-08-01'
});

export const getStripe = () => stripe;