import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { Workshop, validateWorkshop, WorkshopWithId } from "@mingsumsze/common"
import { idSchema } from "@mingsumsze/common"
import { object, string, ValidationError } from "yup";


const app = express();
app.use(genMiddleware({
  useAuth: "admin",
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  try {
    await object({
      id: idSchema.required()
    }).validate(request.body);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.status(400).send({message});
  }

  const data = request.body;

  try {  
    await admin.firestore().doc(`/workshops/${data.id}`).delete();
  } catch(err) {
    functions.logger.error(err);
    return response.sendStatus(500);
  }

  const message = `Successfully delete workshop ${data.id}`;
  functions.logger.log(message);
  return response.status(200).send({message});
});

export const deleteWorkshop = functions.region('asia-east2').https.onRequest(app);