import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { paymentIntent } from "../../types/paymentIntent";
import { checkDoc } from "../../utils/checkDoc";

const app = express();
app.use(genMiddleware({
  corsDomain: "all",
  useStripe: true
}));

app.post("/", async (request, response) => {
  const stripeEvent = request.stripeEvent;

  let paymentIntent;

  switch (stripeEvent.type) {
    case 'payment_intent.succeeded':
      paymentIntent = stripeEvent.data.object as paymentIntent;
      functions.logger.info(`PaymentIntent for ${paymentIntent.amount} was successful`);

      let [workshopId, enrollId] = [paymentIntent.metadata.workshopId, paymentIntent.metadata.enrollId];

      await admin.firestore().runTransaction(async t => {
        const docRef = admin.firestore().doc(`/workshop-confidential/${workshopId}`);

        const snapshot = await t.get(docRef);
        const doc = checkDoc(request, response, snapshot, {
          enrolls: "object"
        });
        if (response.headersSent) return;
  
        const enrolls = (doc as admin.firestore.DocumentData).enrolls;
        if (!enrolls[enrollId]) {
          const message = `Enroll with id ${enrollId} doesn't exist in workshop with id ${workshopId}`;
          return functions.logger.error(message);
  
        } else {
          enrolls[enrollId].paymentStatus = 'paid';
         
          try {
            t.update(docRef, {
              enrolls
            });
            return functions.logger.info(`Successfully update enroll id ${enrollId} payment status on workshop ${workshopId}`);

          } catch(err) {
            return functions.logger.error(err);
          }
        }
      });

      break;

    case 'payment_intent.canceled':
      paymentIntent = stripeEvent.data.object as paymentIntent;
      functions.logger.info(`PaymentIntent for ${paymentIntent.amount} was cancelled`);
      break;

    case 'payment_intent.payment_failed':
      paymentIntent = stripeEvent.data.object as paymentIntent;
      functions.logger.info(`PaymentIntent for ${paymentIntent.amount} was failed`);
      break;

    default:
      const message = `Unhandled event type ${stripeEvent.type}.`;
      functions.logger.error(message);
  }

  return response.sendStatus(200);
});

export const stripe = functions.region('asia-east2').https.onRequest(app);