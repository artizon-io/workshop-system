import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { validateWorkshop, Workshop, WorkshopSchema, WorkshopWithId } from "@mingsumsze/common"
import { idSchema } from "@mingsumsze/common"
import { object, ValidationError } from "yup";


const app = express();
app.use(genMiddleware({
  useAuth: "admin",
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  try {
    const {
      title, capacity, datetime, datetimeStr, description, duration, fee, language, venue
    } = WorkshopSchema;
    await object({
      id: idSchema.required(),
      title,  // by default notRequired()
      capacity,
      datetimeStr: datetimeStr.default('0'),
      description,
      duration,
      fee,
      language,
      venue
    }).validate(request.body);
    // validateWorkshop(request.body);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.status(400).send({message});
  }

  const data = request.body;

  const id = data.id;
  delete data.id;

  if (data.datetimeStr) {
    data.datetime = admin.firestore.Timestamp.fromMillis(Date.parse(data.datetimeStr));
    delete data.datetimeStr;
  }

  try {  
    await admin.firestore().doc(`/workshops/${id}`).update(data);
  } catch(err) {
    functions.logger.error(err);
    return response.sendStatus(500);
  }

  const message = `Successfully update workshop ${id}`;
  functions.logger.log(message);
  return response.status(200).send({message});
});

export const updateWorkshop = functions.region('asia-east2').https.onRequest(app);