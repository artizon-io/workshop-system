import * as functions from "firebase-functions";
import { v4 as uuidv4 } from 'uuid';
import { CloudTasksClient } from '@google-cloud/tasks';
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { getStripe } from "../../utils/getStripe";
import { constructSchema, idSchema } from "@mingsumsze/common"
import { validateWorkshop } from "@mingsumsze/common"

const app = express();
app.use(genMiddleware({
  corsDomain: "all",
  useSession: true
}));

app.post("/", async (request, response) => {
  try {
    constructSchema({
      workshopId: idSchema,
    }).validate(request.body);
  } catch(err) {
    functions.logger.error(err);
    return response.status(400).send({message: `Invalid request body`});
  }

  const data = request.body;

  let enrollIdFee = await admin.firestore().runTransaction(async t => {
    const workshopDoc = (await t.get(admin.firestore().doc(`/workshops/${data.workshopId}`))).data();
    if (!workshopDoc) {
      const message = `Workshop ${data.workshopId} doesn't exist`;
      functions.logger.info(message);
      return response.status(400).send({message});
    }

    try {
      validateWorkshop(workshopDoc);
    } catch(err) {
      functions.logger.error(err);
      return response.sendStatus(500);
    }

    const workshopConfidentialDoc = (await t.get(admin.firestore().doc(`/workshop-confidential/${data.workshopId}`))).data();
    if (!workshopConfidentialDoc) {
      const message = `Workshop ${data.workshopId} doesn't exist`;
      functions.logger.info(message);
      return response.status(400).send({message});
    }

    if (workshopConfidentialDoc.current+1 > workshopDoc.capacity) {
      const message = `Workshop ${data.workshopId} is full`
      functions.logger.info(message);
      return response.status(400).send({message});
    }

    const enrollId = uuidv4();

    const enrolls = workshopConfidentialDoc.enrolls;

    // Just in case
    if (enrolls[enrollId]) {
      functions.logger.error(`Newly generated enrollID ${enrollId} already exists on workshop ${data.workshopId}`);
      return response.sendStatus(500);
    }

    enrolls[enrollId] = {
      paymentStatus: 'unpaid'
    };

    t.update(admin.firestore().doc(`/workshop-confidential/${data.workshopId}`), {
      current: admin.firestore.FieldValue.increment(1),
      enrolls
    });

    return [enrollId, workshopDoc.fee as number];
  }) as [string, number];

  if (response.headersSent) return response;
  const [enrollId, fee] = enrollIdFee;

  if (request.session.enrollId) {
    try {  
      await admin.firestore().doc(`/workshops/${data.workshopId}`).delete();
    } catch(err) {
      functions.logger.error(err);
      return response.sendStatus(500);
    }
  }
  request.session.enrollId = enrollId;

  const projectId = JSON.parse(`${process.env.FIREBASE_CONFIG}`).projectId;
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

  const stripe = getStripe();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: fee! * 100,
    currency: "hkd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      workshopId: data.workshopId,
      enrollId
    },
    // application_fee_amount: (fee! * 0.034 + 2.35) * 100,  // stripe charge 3.4% + HKD2.35 per successful card charge
  });

  return response.status(200).json({
    message: "Success",
    enrollId: enrollId,
    stripeClientSecret: paymentIntent.client_secret
  });
});

export const initiateEnroll = functions.region('asia-east2').https.onRequest(app);