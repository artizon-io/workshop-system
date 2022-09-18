// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import * as express from "express";
// import { genMiddleware } from "../middleware/genMiddleware";
// import { idSchema } from "@mingsumsze/common"
// import { WorkshopConfidentialSchemaLibrary, WorkshopConfidentialSchema } from "@mingsumsze/common"
// import { object, infer as zInfer } from "zod";
// import { validate } from "../../utils/validate";

// const app = express();
// app.use(genMiddleware({
//   corsDomain: "all",
//   useSession: true
// }));

// app.post("/", async (request, response) => {
//   const {data, issues} = validate(
//     object({
//       workshopId: idSchema,
//       enrollId: WorkshopConfidentialSchemaLibrary.enrolls.id,
//       firstName: WorkshopConfidentialSchemaLibrary.enrolls.firstName,
//       lastName: WorkshopConfidentialSchemaLibrary.enrolls.lastName,
//       phone: WorkshopConfidentialSchemaLibrary.enrolls.phone,
//       email: WorkshopConfidentialSchemaLibrary.enrolls.email,
//     }),
//     request.body
//   );

//   if (issues) {
//     functions.logger.info(issues);
//     return response.status(400).send({issues});
//   }

//   if (request.session.enrollId !== data.enrollId) {
//     const message = `User is not currently enrolled to ${data.enrollId}`;
//     functions.logger.info(message);
//     return response.status(400).send({message});
//   }
  
//   const doc = (await admin.firestore().doc(`/workshop-confidential/${data.workshopId}`).get()).data();
//   if (!doc) {
//     const message = `Workshop ${data.workshopId} doesn't exist`;
//     functions.logger.info(message);
//     return response.status(400).send({message});
//   }

//   const {data: docData, issues: docIssues} = validate(
//     WorkshopConfidentialSchema,
//     doc
//   );

//   if (docIssues) {
//     functions.logger.error(docIssues);
//     return response.sendStatus(500);
//   }
  
//   const enrolls = docData.enrolls;
//   const enroll = enrolls.find(enroll => enroll.id === data.enrollId);
//   if (!enroll) {
//     functions.logger.error(`Enroll ${data.enrollId} doesn't exist on workshop ${data.workshopId}`);
//     return response.sendStatus(500);
//   }

//   enroll.firstName = data.firstName;
//   enroll.lastName = data.lastName;
//   enroll.phone = data.phone;
//   enroll.email = data.email;

//   try {
//     await admin.firestore().doc(`/workshop-confidential/${data.workshopId}`).update({
//       enrolls
//     });
//     return response.status(200).send({
//       message: `Successfully enrolled`
//     });
//   } catch(err) {
//     functions.logger.error(err);
//     return response.sendStatus(500);
//   }
// });

// export const enroll = functions.region('asia-east2').https.onRequest(app);