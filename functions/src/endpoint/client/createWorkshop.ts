import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { validateWorkshop, Workshop, WorkshopSchema } from "@mingsumsze/common"
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
      title: title.required(),
      capacity: capacity.required(),
      datetimeStr: datetimeStr.required(),
      description: description.required(),
      duration: duration.required(),
      fee: fee.required(),
      language: language.required(),
      venue: venue.required()
    }).validate(request.body);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.status(400).send({message});
  }

  const data = request.body;

  data.datetime = admin.firestore.Timestamp.fromMillis(Date.parse(data.datetimeStr));
  delete data.datetimeStr;

  let id : string;
  try {  
    const docRef = await admin.firestore().collection(`/workshops`).add(data);
    id = docRef.id;
  } catch(err) {
    functions.logger.error(err);
    return response.sendStatus(500);
  }

  const message = `Successfully create workshop ${id}`;
  functions.logger.log(message);
  return response.status(200).send({
    message,
    workshopId: id
  });
});

export const createWorkshop = functions.region('asia-east2').https.onRequest(app);