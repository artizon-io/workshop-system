import Stripe from "stripe";

const stripe = new Stripe(`${process.env.MODE === 'prod'}` ? `${process.env.STRIPE_SECRET}` : `${process.env.STRIPE_SECRET_TEST}`, {
  apiVersion: '2022-08-01'
});

export const getStripe = () => stripe;