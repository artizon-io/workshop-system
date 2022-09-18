// import * as functions from "firebase-functions";
// import * as express from "express";
// import { genMiddleware } from "../middleware/genMiddleware";
// import { object } from "zod";
// import { sessionIdSchema } from "../../types/sessionIdSchema";
// import { sessionStore } from "../middleware/session";
// import { validate } from "../../utils/validate";

// const app = express();
// app.use(genMiddleware({
//   corsDomain: "all"
// }));

// app.post('/', async (request, response) => {
//   const {data, issues} = validate(
//     object({
//       sessionId: sessionIdSchema,
//     }),
//     request.body
//   );

//   if (issues) {
//     functions.logger.info(issues);
//     return response.status(400).send({issues});
//   }
  
//   sessionStore.destroy(data.sessionId, (err => {
//     if (err) {
//       functions.logger.error(err.message);
//       return response.sendStatus(500);
//     }
//   }));

//   functions.logger.info(`Successfully delete session ${data.sessionId}`);
//   return response.sendStatus(200);
// });

// export const deleteSession = functions.region('asia-east2').https.onRequest(app);