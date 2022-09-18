// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import { genMiddleware } from "../middleware/genMiddleware";
// import * as express from "express";
// import { WorkshopSchemaLibrary, Workshop, WorkshopSchema } from "@mingsumsze/common"
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

//   const {data: rawdata, issues} = validate(
//     object({
//       title,
//       capacity,
//       datetimeStr,
//       description,
//       duration,
//       fee,
//       language,
//       venue
//     }),
//     request.body
//   );

//   if (issues) {
//     functions.logger.info(issues);
//     return response.status(400).send({issues});
//   }

//   const data = {
//     datetime: admin.firestore.Timestamp.fromMillis(Date.parse(rawdata.datetimeStr)),
//     ...rawdata,
//     datetimeStr: undefined
//   };

//   let id : string;
//   try {  
//     const docRef = await admin.firestore().collection(`/workshops`).add(data);
//     id = docRef.id;
//   } catch(err) {
//     functions.logger.error(err);
//     return response.sendStatus(500);
//   }

//   const message = `Successfully create workshop ${id}`;
//   functions.logger.log(message);
//   return response.status(200).send({
//     message,
//     workshopId: id
//   });
// });

// export const createWorkshop = functions.region('asia-east2').https.onRequest(app);