import * as functions from "firebase-functions";
import { v4 as uuidv4 } from 'uuid';
import { CloudTasksClient } from '@google-cloud/tasks';
import * as admin from "firebase-admin";
import { initStripe } from "../../utils/stripe";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as csrf from "csurf";
import * as bodyParser from "body-parser";
import { auth } from "../middleware/auth";

const app = express();

app.use(cors({
  origin: true  // any origin: to be change to custom domain during production
}));

// app.use(auth);

app.use(cookieParser());

app.use(bodyParser.json({}));

// app.use(csrf());

// export const initiateEnroll = functions.region('asia-east2').https.onCall(async (data, context) => {
app.post("/", async (request, response) => {
  // verifyAppCheck(context);

  let enrollId : string;
  let fee : number;

  const data = request.body as {
    workshopId: string
  };

  try {
    let hasError = false;

    functions.logger.info("Ready to run transaction");

    await admin.firestore().runTransaction(async t => {
      functions.logger.info("Ready to get workshop document");

      const workshopDoc = await t.get(admin.firestore().doc(`/workshops/${data.workshopId}`));

      functions.logger.info("Ready to retrieve capacity field");

      const capacity = workshopDoc.data()?.capacity;
      if (capacity == null) {  // === null || typeof === undefined
        hasError = true;
        return response.status(400).send(`"Capacity" field does not exist on workshop with ID ${data.workshopId}`);
      }

      functions.logger.info("Ready to get workshop-confidential document");

      const workshopConfidentialDocRef = admin.firestore().doc(`/workshop-confidential/${data.workshopId}`);
      const workshopConfidentialDoc = await t.get(workshopConfidentialDocRef);

      functions.logger.info("Ready to get current field");

      const current = workshopConfidentialDoc.data()?.current;
      if (current == null) {
        hasError = true;
        return response.status(400).send(`"Current" field does not exist on workshop-confidential with ID ${data.workshopId}`);
      }

      if (current+1 >= capacity) {
        hasError = true;
        return response.status(400).send(`Workshop is full`);
      }

      enrollId = uuidv4();
      fee = workshopDoc.data()?.fee;
      if (fee == null) {
        hasError = true;
        return response.status(500).send(`"Fee" field does not exist on workshop with ID ${data.workshopId}`);
      }

      functions.logger.info("Ready to reserve a place for user");

      t.update(workshopConfidentialDocRef, {
        current: current+1,
        enrolls: admin.firestore.FieldValue.arrayUnion({
          id: enrollId,
          paymentStatus: 'unpaid'
        })
      });

      return null;
    });

    if (hasError)
      return;

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

    // response.cookie('stripeClientSecret', paymentIntent.client_secret, {
    //   maxAge: 60 * 1000 * 60,  // would expire after 60 minutes
    //   // httpOnly: true,  // The cookie is inaccessible by the client
    //   signed: true,  // Indicates if the cookie should be signed
    //   secure: true,
    //   sameSite: "strict",  // additionally prevent CSRF (prevent cookie from transmitted in cross-site-request)
    // });
    
    return response.status(200).json({
      message: "Success",
      enrollId: enrollId!,
      stripeClientSecret: paymentIntent.client_secret
    });

  } catch(err) {
    functions.logger.error(err);
    return response.status(500).send(`"Fee" field does not exist on workshop with ID ${data.workshopId}`);
  }
});

export const initiateEnroll = functions.region('asia-east2').https.onRequest(app);