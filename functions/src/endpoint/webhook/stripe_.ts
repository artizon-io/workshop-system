// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import * as express from "express";
// import { genMiddleware } from "../middleware/genMiddleware";
// import { paymentIntent } from "../../types/paymentIntent";
// import { WorkshopConfidential, WorkshopConfidentialSchema, WorkshopConfidentialSchemaLibrary } from "@mingsumsze/common"
// import { StripeMetadataSchema } from "../../types/stripeMetadata";
// import { validate } from "../../utils/validate";

// const app = express();
// app.use(genMiddleware({
//   corsDomain: "all",
//   useStripe: true
// }));

// app.post("/", async (request, response) => {
//   const stripeEvent = request.stripeEvent;

//   let paymentIntent;
//   let workshopId : string, enrollId : string;

//   switch (stripeEvent.type) {
//     case 'payment_intent.succeeded':
//       paymentIntent = stripeEvent.data.object as paymentIntent;
//       functions.logger.info(`PaymentIntent for ${paymentIntent.amount} was successful`);

//       const {data: metadataData, issues: metadataIssues} = validate(
//         StripeMetadataSchema,
//         paymentIntent.metadata
//       );
    
//       if (metadataIssues) {
//         functions.logger.error(metadataIssues);
//         return response.sendStatus(500);
//       }

//       [workshopId, enrollId] = [metadataData.workshopId, metadataData.enrollId];

//       await admin.firestore().runTransaction(async t => {
//         const doc = (await admin.firestore().doc(`/workshop-confidential/${workshopId}`).get()).data();
//         if (!doc) {
//           const message = `Workshop ${workshopId} doesn't exist`;
//           functions.logger.info(message);
//           return response.status(400).send({message});
//         }
    
//         const {data: docData, issues: docIssues} = validate(
//           WorkshopConfidentialSchema,
//           doc
//         );
      
//         if (docIssues) {
//           functions.logger.error(docIssues);
//           return response.sendStatus(500);
//         }
  
//         const enrolls = docData.enrolls;
//         const enroll = enrolls.find(enroll => enroll.id === enrollId);
//         if (!enroll) {
//           const message = `Enroll ${enrollId} doesn't exist on workshop ${workshopId}`;
//           return functions.logger.error(message);
  
//         } else {
//           enroll.paymentStatus = 'paid';
         
//           try {
//             t.update(admin.firestore().doc(`/workshop-confidential/${workshopId}`), {
//               enrolls
//             });
//             return functions.logger.info(`Successfully update enroll ${enrollId} payment status on workshop ${workshopId}`);

//           } catch(err) {
//             return functions.logger.error(err);
//           }
//         }
//       });

//       if (response.headersSent) return response;

//       break;

//     case 'payment_intent.canceled':
//       paymentIntent = stripeEvent.data.object as paymentIntent;
//       functions.logger.info(`PaymentIntent for workshop ${paymentIntent.metadata.workshopId} enroll ${paymentIntent.metadata.enrollId} cancelled`);
//       break;

//     case 'payment_intent.payment_failed':
//       paymentIntent = stripeEvent.data.object as paymentIntent;
//       functions.logger.info(`PaymentIntent for ${paymentIntent.metadata.workshopId} enroll ${paymentIntent.metadata.enrollId} failed`);
//       break;

//     default:
//       const message = `Unhandled event type ${stripeEvent.type}.`;
//       functions.logger.error(message);
//   }

//   return response.sendStatus(200);
// });

// export const stripe = functions.region('asia-east2').https.onRequest(app);