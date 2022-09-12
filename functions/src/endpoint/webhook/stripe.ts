import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


export const stripe = functions.region(process.env.APP_LOCATION).https.onRequest(async (request, response) => {
  response.sendStatus(200);
  return;
});