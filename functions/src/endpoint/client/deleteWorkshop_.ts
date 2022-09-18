// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import { genMiddleware } from "../middleware/genMiddleware";
// import * as express from "express";
// import { WorkshopSchema, WorkshopSchemaLibrary } from "@mingsumsze/common"
// import { idSchema } from "@mingsumsze/common"
// import { object, string } from "zod";
// import { validate } from "../../utils/validate";


// const app = express();
// app.use(genMiddleware({
//   useAuth: "admin",
//   corsDomain: "all"
// }));

// app.post("/", async (request, response) => {
//   const {data, issues} = validate(
//     object({
//       id: idSchema
//     }),
//     request.body
//   );

//   if (issues) {
//     functions.logger.info(issues);
//     return response.status(400).send({issues});
//   }

//   try {  
//     await admin.firestore().doc(`/workshops/${data.id}`).delete();
//   } catch(err) {
//     functions.logger.error(err);
//     return response.sendStatus(500);
//   }

//   const message = `Successfully delete workshop ${data.id}`;
//   functions.logger.log(message);
//   return response.status(200).send({message});
// });

// export const deleteWorkshop = functions.region('asia-east2').https.onRequest(app);