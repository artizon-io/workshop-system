import * as functions from "firebase-functions";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { object, ValidationError } from "yup";
import { sessionIdSchema } from "../../types/sessionIdSchema";
import { sessionStore } from "../middleware/session";

const app = express();
app.use(genMiddleware({
  corsDomain: "all"
}));

app.post('/', async (request, response) => {
  try {
    await object({
      sessionId: sessionIdSchema.required(),
    }).validate(request.body);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.status(400).send({message});
  }

  const data = request.body;

  sessionStore.destroy(data.sessionId, (err => {
    if (err) {
      functions.logger.error(err.message);
      return response.sendStatus(500);
    }
  }));

  functions.logger.info(`Successfully delete enroll ${data.enrollId} on workshop ${data.workshopId}`);
  return response.sendStatus(200);
});

export const deleteSession = functions.region('asia-east2').https.onRequest(app);