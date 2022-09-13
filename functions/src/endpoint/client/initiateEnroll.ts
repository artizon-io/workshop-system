import * as functions from "firebase-functions";
import { v4 as uuidv4 } from 'uuid';
import { CloudTasksClient } from '@google-cloud/tasks';
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { checkArgs } from "../../utils/checkArgs";
import { checkDoc } from "../../utils/checkDoc";
import Stripe from "stripe";

const app = express();
app.use(genMiddleware({
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  if (checkArgs(request, response, ["workshopId"]))
    return;
  
  const data = request.body as {
    workshopId: string
  };

  functions.logger.info("Ready to run transaction");

  const [enrollId, fee, res] = await admin.firestore().runTransaction(async t => {
    functions.logger.info("Ready to get workshop document");

    let [workshopDoc, res_1] = checkDoc(request, response, await t.get(admin.firestore().doc(`/workshops/${data.workshopId}`)), {
      capacity : "number",
      fee : "number",
    });
    if (res_1)
      return [null, null, res_1];

    functions.logger.info("Ready to get workshop-confidential document");

    const workshopConfidentialDocRef = admin.firestore().doc(`/workshop-confidential/${data.workshopId}`);
    let [workshopConfidentialDoc, res_2] = checkDoc(request, response, await t.get(workshopConfidentialDocRef), {
      current : "number",
      enrolls : "object"
    });
    if (res_2)
      return [null, null, res_2];

    if (workshopConfidentialDoc!.current+1 >= workshopDoc!.capacity) {
      let message = `Workshop is full`
      functions.logger.info(message);
      return [null, null, response.status(400).send({message})];
    }

    const enrollId = uuidv4();

    functions.logger.info("Ready to reserve a place for user");

    const enrolls = workshopConfidentialDoc!.enrolls;

    // Just in case
    if (enrolls[enrollId]) {
      functions.logger.error(`Newly generated enrollID ${enrollId} alreadly existed`);
      return [null, null, response.sendStatus(500)];
    }

    enrolls[enrollId] = {
      paymentStatus: 'unpaid'
    };

    t.update(workshopConfidentialDocRef, {
      current: admin.firestore.FieldValue.increment(1),
      // enrolls: admin.firestore.FieldValue.arrayUnion({
      //   id: enrollId,
      //   paymentStatus: 'unpaid'
      // })
      enrolls
    });

    return [enrollId, workshopDoc!.fee as number, null];
  }) as [string | null, number | null, Response | null];

  if (res)
    return;

  functions.logger.info("Updating session info");

  // if (request.session.enrollId)
    // free up previous session
  // request.session.enrollId = enrollId!;

  functions.logger.info("Appending cloud task to queue");

  const projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
  const tasksClient = new CloudTasksClient();
  const queuePath = tasksClient.queuePath(
    projectId,
    'asia-east2',  // location
    'ttl'  // queue
  );

  await tasksClient.createTask({
    parent: queuePath,
    task: {
      httpRequest: {
        httpMethod: 'POST',
        url: `https://asia-east2-${projectId}.cloudfunctions.net/deleteEnrollSession`,
        headers: {
          'Context-Type': 'application/json'
        },
        body: Buffer.from(JSON.stringify({
          workshopId: data.workshopId,
          enrollId: enrollId
        })).toString('base64'),
      },
      scheduleTime: {
        seconds: 15 * 60 + Date.now() / 1000  // TTL tasks execute in 15 minutes
      }
    },
  });

  functions.logger.info("Creating stripe payment intents");

  const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: '2022-08-01'
  });

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
    enrollId: enrollId,
    stripeClientSecret: paymentIntent.client_secret
  });
});

export const initiateEnroll = functions.region('asia-east2').https.onRequest(app);