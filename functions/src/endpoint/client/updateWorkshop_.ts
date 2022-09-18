// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import { genMiddleware } from "../middleware/genMiddleware";
// import * as express from "express";
// import { WorkshopSchema, WorkshopSchemaLibrary, Workshop } from "@mingsumsze/common"
// import { idSchema } from "@mingsumsze/common"
// import { object } from "zod";
// import { validate } from "../../utils/validate";


// const app = express();
// app.use(genMiddleware({
//   useAuth: "admin",
//   corsDomain: "all"
// }));

// app.post("/", async (request, response) => {
//   const {
//     title, capacity, datetime, datetimeStr, description, duration, fee, language, venue
//   } = WorkshopSchemaLibrary;
//   const {data: rawData, issues} = validate(
//     object({
//       id: idSchema,
//       title: title.optional(),
//       capacity: capacity.optional(),
//       datetimeStr: datetimeStr.optional(),
//       description: description.optional(),
//       duration: duration.optional(),
//       fee: fee.optional(),
//       language: language.optional(),
//       venue: venue.optional()
//     }),
//     request.body
//   );

//   if (issues) {
//     functions.logger.info(issues);
//     return response.status(400).send({issues});
//   }

//   const id = rawData.id;
//   const data = {
//     datetime: rawData.datetimeStr
//       ? admin.firestore.Timestamp.fromMillis(Date.parse(rawData.datetimeStr))
//       : undefined,
//     ...rawData,
//     id: undefined
//   };

//   try {  
//     await admin.firestore().doc(`/workshops/${id}`).update(data);
//   } catch(err) {
//     functions.logger.error(err);
//     return response.sendStatus(500);
//   }

//   const message = `Successfully update workshop ${id}`;
//   functions.logger.log(message);
//   return response.status(200).send({message});
// });

// export const updateWorkshop = functions.region('asia-east2').https.onRequest(app);