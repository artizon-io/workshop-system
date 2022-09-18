// import { NextFunction, Request, Response } from "express";
// import * as functions from "firebase-functions";
// import { getStripe } from "../../utils/getStripe";



// export const stripeAuth = async (request : Request, response : Response, next : NextFunction) => {
//   const stripeSignature = request.headers['stripe-signature'] as string;
//   if (!stripeSignature) {
//     const message = "stripe-signature missing from request header";
//     functions.logger.info(message)
//     return response.status(400).send({message});
//   }

//   const stripe = getStripe();

//   try {
//     let stripeEvent = stripe.webhooks.constructEvent(request.body, stripeSignature, `${process.env.MODE}` === "prod" ? `${process.env.STRIPE_ENDPOINT_SECRET}` : `${process.env.STRIPE_ENDPOINT_SECRET_TEST}`);
//     request.stripeEvent = stripeEvent;
//   } catch (err) {
//     functions.logger.error(err);
//     return response.sendStatus(500);
//   }

//   return next();
// }