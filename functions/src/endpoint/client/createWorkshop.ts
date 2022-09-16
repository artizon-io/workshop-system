import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { validateWorkshop, Workshop, WorkshopSchema } from "@mingsumsze/common"
import { object } from "yup";


const app = express();
app.use(genMiddleware({
  useAuth: "admin",
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  try {
    validateWorkshop(request.body);
  } catch(err) {
    functions.logger.error(err);
    return response.status(400).send({message: `Invalid request body`});
  }

  const data = request.body as Workshop;

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
  return response.status(200).send({message});
});

export const createWorkshop = functions.region('asia-east2').https.onRequest(app);