// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import { genMiddleware } from "../middleware/genMiddleware";
// import * as express from "express";
// import { object } from "zod";
// import { UserSchemaLibrary } from "@mingsumsze/common"
// import { validate } from "../../utils/validate";

// const app = express();
// app.use(genMiddleware({
//   useAuth: "admin",
//   corsDomain: "all"
// }));

// app.post("/", async (request, response) => {
//   const {data, issues} = validate(
//     object({
//       phone: UserSchemaLibrary.phone
//     }),
//     request.body
//   );

//   if (issues) {
//     functions.logger.info(issues);
//     return response.status(400).send({issues});
//   }
  
//   try {
//     const user = await admin.auth().getUserByPhoneNumber(data.phone);
//     admin.auth().deleteUser(user.uid);

//   } catch(err) {
//     const message = `User isn't an admin`;
//     functions.logger.error(err);
//     return response.status(400).send({message});
//   }

//   return response.status(200).send({
//     message: `Successfully delete admin ${data.phone}`
//   });
// });

// export const deleteAdmin = functions.region('asia-east2').https.onRequest(app);