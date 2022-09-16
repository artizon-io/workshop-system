import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { validateWorkshop, Workshop, WorkshopSchema, WorkshopWithId } from "@mingsumsze/common"
import { constructSchema, idSchema } from "@mingsumsze/common"


const app = express();
app.use(genMiddleware({
  useAuth: "admin",
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  try {
    constructSchema({
      id: idSchema,
      ...WorkshopSchema
    }).validate(request.body);
  } catch(err) {
    functions.logger.error(err);
    return response.status(400).send({message: `Invalid request body`});
  }

  const data = request.body;
  const id = data.id;
  delete data.id;

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