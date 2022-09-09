import * as functions from "firebase-functions";

import * as admin from "firebase-admin";


export const stripe = functions.region('asia-east2').https.onRequest(async (request, response) => {
  admin.initializeApp();
  
  response.send(200);
});