import * as functions from "firebase-functions";
import { v4 as uuid } from 'uuid';
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { getStripe } from "../../utils/getStripe";
import { idSchema, WorkshopConfidential } from "@mingsumsze/common"
import { validateWorkshop } from "@mingsumsze/common"
import { object, ValidationError } from "yup";
import { createTask } from "../../utils/createTask";


const app = express();
app.use(genMiddleware({
  corsDomain: "all",
  useSession: true
}));

app.post("/", async (request, response) => {
  try {
    await object({
      workshopId: idSchema.required(),
    }).validate(request.body);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.status(400).send({message});
  }

  const data = request.body;

  let enrollId_fee_stripeClientSecret = await admin.firestore().runTransaction(async t => {
    const workshopDoc = (await t.get(admin.firestore().doc(`/workshops/${data.workshopId}`))).data();
    if (!workshopDoc) {
      const message = `Workshop ${data.workshopId} doesn't exist`;
      functions.logger.info(message);
      return response.status(400).send({message});
    }

    try {
      await validateWorkshop(workshopDoc);
    } catch(err) {
      const message = (err as ValidationError).message;
      functions.logger.error(message);
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

    const enrollId = uuid();

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

    // const enrolls = workshopConfidentialDoc.enrolls as WorkshopConfidential['enrolls'];
    // enrolls.push({
    //   id: enrollId,
    //   paymentStatus: 'unpaid'
    // });

    // See https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
    type WorkshopConfidentialEnroll = WorkshopConfidential['enrolls'][number];

    t.update(admin.firestore().doc(`/workshop-confidential/${data.workshopId}`), {
      current: admin.firestore.FieldValue.increment(1),
      enrolls: admin.firestore.FieldValue.arrayUnion({
        id: enrollId,
        paymentStatus: 'unpaid',
        stripePaymentId: paymentIntent.id
      } as WorkshopConfidentialEnroll)
    });

    return [enrollId, workshopDoc.fee as number, paymentIntent.client_secret];
  }) as [string, number, string];

  if (response.headersSent) return response;
  const [enrollId, fee, stripeClientSecret] = enrollId_fee_stripeClientSecret;

  if (request.session.enrollId)
    await createTask(
      'deleteSession',  // endpoint
      {  // payload
        sessionId: request.session.id,
      },
      15,  // delay in minutes
      'ttl'  // task queue
    );
  request.session.enrollId = enrollId;

  await createTask(
    'deleteEnroll',  // endpoint
    {  // payload
      workshopId: data.workshopId,
      enrollId: enrollId
    },
    15,  // delay in minutes
    'ttl'  // task queue
  );

  return response.status(200).json({
    message: "Success",
    enrollId: enrollId,
    stripeClientSecret
  });
});

export const initiateEnroll = functions.region('asia-east2').https.onRequest(app);