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
import { appCheck } from "../middleware/appCheck";
import { session } from "../middleware/session";

const app = express();

app.use(cors({
  origin: process.env.APP_DOMAIN
}));

// app.use(auth);

app.use(cookieParser());

app.use(bodyParser.json({}));

// app.use(csrf());

app.use(appCheck);

app.use(session);

app.post("/", async (request, response) => {
  let enrollId : string;
  let fee : number;

  if (!request.body.workshopId)
    return response.status(400).send("Missing argument workshopId");

  const data = request.body as {
    workshopId: string
  };

  try {
    let hasError = false;

    functions.logger.info("Ready to run transaction");

    await admin.firestore().runTransaction(async t => {
      functions.logger.info("Ready to get workshop document");

      const workshopDoc = await t.get(admin.firestore().doc(`/workshops/${data.workshopId}`));

      if (!workshopDoc.data()) {
        hasError = true;
        return response.status(400).send(`Workshop does not exist with id ${data.workshopId}`);
      }

      functions.logger.info("Ready to retrieve capacity field");

      const capacity = workshopDoc.data()!.capacity;
      if (capacity == null) {  // === null || typeof === undefined
        hasError = true;
        functions.logger.error(`"Capacity" field does not exist on workshop with ID ${data.workshopId}`)
        return response.status(500).send('Server error');
      }

      functions.logger.info("Ready to get workshop-confidential document");

      const workshopConfidentialDocRef = admin.firestore().doc(`/workshop-confidential/${data.workshopId}`);
      const workshopConfidentialDoc = await t.get(workshopConfidentialDocRef);

      if (!workshopConfidentialDoc.data()) {
        hasError = true;
        functions.logger.error(`Workshop-confidential does not exist with id ${data.workshopId}`);
        return response.status(500).send('Server error');
      }

      functions.logger.info("Ready to get current field");

      const current = workshopConfidentialDoc.data()!.current;
      if (current == null) {
        hasError = true;
        functions.logger.error(`"Current" field does not exist on workshop-confidential with ID ${data.workshopId}`)
        return response.status(500).send('Server error');
      }

      if (current+1 >= capacity) {
        hasError = true;
        return response.status(400).send(`Workshop is full`);
      }

      enrollId = uuidv4();
      fee = workshopDoc.data()!.fee;
      if (fee == null) {
        hasError = true;
        functions.logger.error(`"Current" field does not exist on workshop-confidential with ID ${data.workshopId}`);
        return response.status(500).send('Server error');
      }

      functions.logger.info("Ready to reserve a place for user");

      if (!workshopDoc.data()!.enrolls[enrollId]) {
        hasError = true;
        functions.logger.error(`Newly generated enrollID ${enrollId} alreadly existed`);
        return response.status(500).send('Server error');
      }

      const enrolls = workshopDoc.data()!.enrolls;
      enrolls[enrollId] = {
        paymentStatus: 'unpaid'
      };

      t.update(workshopConfidentialDocRef, {
        current: current+1,
        // enrolls: admin.firestore.FieldValue.arrayUnion({
        //   id: enrollId,
        //   paymentStatus: 'unpaid'
        // })
        enrolls
      });

      return null;
    });

    if (hasError)
      return;

    functions.logger.info("Updating session info");

    // if (request.session.enrollId)
      // free up previous session
    request.session.enrollId = enrollId!;

    functions.logger.info("Appending cloud task to queue");

    const projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId;

    const tasksClient = new CloudTasksClient();
    const queuePath = tasksClient.queuePath(
      projectId,
      process.env.APP_LOCATION,  // location
      'ttl'  // queue
    );

    await tasksClient.createTask({
      parent: queuePath,
      task: {
        httpRequest: {
          httpMethod: 'POST',
          url: `https://${process.env.APP_LOCATION}-${projectId}.cloudfunctions.net/deleteEnrollSession`,
          headers: {
            'Context-Type': 'application/json'
          },
          body: Buffer.from(JSON.stringify({
            workshopId: data.workshopId,
            enrollId: enrollId!
          })).toString('base64'),
        },
        scheduleTime: {
          seconds: 15 * 60 + Date.now() / 1000  // TTL tasks execute in 15 minutes
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
    return response.status(500).send('Server error');
  }
});

export const initiateEnroll = functions.region(process.env.APP_LOCATION).https.onRequest(app);