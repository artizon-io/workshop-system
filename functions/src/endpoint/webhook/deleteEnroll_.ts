// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import * as express from "express";
// import { genMiddleware } from "../middleware/genMiddleware";
// import { idSchema, WorkshopConfidential, WorkshopConfidentialSchema, WorkshopConfidentialSchemaLibrary } from "@mingsumsze/common"
// import { object } from "zod";
// import { validate } from "../../utils/validate";

// const app = express();
// app.use(genMiddleware({
//   corsDomain: "all"
// }));

// app.post('/', async (request, response) => {
//   const {data, issues} = validate(
//     object({
//       workshopId: idSchema,
//       enrollId: WorkshopConfidentialSchemaLibrary.enrolls.id
//     }),
//     request.body
//   );

//   if (issues) {
//     functions.logger.info(issues);
//     return response.status(400).send({issues});
//   }

//   await admin.firestore().runTransaction(async t => {
//     const doc = (await t.get(admin.firestore().doc(`/workshop-confidential/${data.workshopId}`))).data();
//     if (!doc) {
//       const message = `Workshop ${data.workshopId} doesn't exist`;
//       functions.logger.info(message);
//       return response.status(400).send({message});
//     }

//     const {data: docData, issues: docIssues} = validate(
//       WorkshopConfidentialSchema,
//       doc
//     );
  
//     if (docIssues) {
//       functions.logger.error(docIssues);
//       return response.sendStatus(500);
//     }

//     const enrolls = docData.enrolls;
//     const enroll = enrolls.find(enroll => enroll.id === data.enrollId);

//     try {
//       t.update(admin.firestore().doc(`/workshop-confidential/${data.workshopId}`), {
//         current: admin.firestore.FieldValue.increment(-1),
//         enrolls: admin.firestore.FieldValue.arrayRemove(enroll)
//       });
//     } catch(err) {
//       functions.logger.error(err);
//       return response.sendStatus(500);
//     }
//   });

//   if (response.headersSent) return response;

//   functions.logger.info(`Successfully delete enroll ${data.enrollId} on workshop ${data.workshopId}`);
//   return response.sendStatus(200);
// });

// export const deleteEnroll = functions.region('asia-east2').https.onRequest(app);