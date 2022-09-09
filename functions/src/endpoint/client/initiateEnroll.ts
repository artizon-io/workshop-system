import * as functions from "firebase-functions";
import { v4 as uuidv4 } from 'uuid';
import { CloudTasksClient } from '@google-cloud/tasks';

import * as admin from "firebase-admin";
import { verifyAdmin, verifyAppCheck, verifyLogin } from "../../utils/verify";
import { initStripe } from "../../utils/stripe";
import { getError } from "../../utils/error";


export const initiateEnroll = functions.region('asia-east2').https.onCall(async (data, context) => {
  admin.initializeApp();

  verifyAppCheck(context);

  // verifyLogin(context);

  let enrollId : string;
  let fee : number;

  try {
    await admin.firestore().runTransaction(async t => {
      const workshopDoc = await t.get(admin.firestore().doc(`/workshops/${data.workshopId}`));

      const capacity = workshopDoc.data()?.capacity;
      if (capacity == null)  // === null || typeof === undefined
        throw new functions.https.HttpsError(
          "invalid-argument",
          `"Capacity" field does not exist on workshop with ID ${data.workshopId}`
        );

      const workshopConfidentialDocRef = admin.firestore().doc(`/workshop-confidential/${data.workshopId}`);
      const workshopConfidentialDoc = await t.get(workshopConfidentialDocRef);

      const current = workshopConfidentialDoc.data()?.current;
      if (current == null)
        throw new functions.https.HttpsError(
          "invalid-argument",
          `"Current" field does not exist on workshop-confidential with ID ${data.workshopId}`
        );

      if (current+1 >= capacity)
        throw new functions.https.HttpsError(
          "resource-exhausted",
          `Workshop is full`
        );

      enrollId = uuidv4();
      fee = workshopDoc.data()?.fee;
      if (fee == null)
        throw new functions.https.HttpsError(
          "unavailable",
          `"Fee" field does not exist on workshop with ID ${data.workshopId}`
        );

      t.update(workshopConfidentialDocRef, {
        current: current+1,
        enrolls: admin.firestore.FieldValue.arrayUnion({
          id: enrollId,
          paymentStatus: 'unpaid'
        })
      });
    });

    functions.logger.info("Appending cloud task to queue");

    const projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
    const location = 'asia-east2';

    const tasksClient = new CloudTasksClient();
    const queuePath = tasksClient.queuePath(
      projectId,
      location,  // location
      'ttl'  // queue
    );

    await tasksClient.createTask({
      parent: queuePath,
      task: {
        httpRequest: {
          httpMethod: 'POST',
          url: `https://${location}-${projectId}.cloudfunctions.net/deleteEnrollSession`,
          headers: {
            'Context-Type': 'application/json'
          },
          body: Buffer.from(JSON.stringify({
            workshopId: data.workshopId,
            enrollId: enrollId!
          })).toString('base64'),
        },
        scheduleTime: {
          seconds: 15 * 60 + Date.now() / 1000
        }
      },
    });

    functions.logger.info("Creating stripe payment intents");

    const stripe = initStripe();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: fee! * 100,
      currency: "hkd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return {
      message: "Success",
      enrollId: enrollId!,
      stripeClientSecret: paymentIntent.client_secret,
    };

  } catch(err) {
    functions.logger.error(err);
    return getError(err);
  }
});