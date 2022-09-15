import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { Workshop, validateWorkshop, WorkshopWithId } from "common/schema/workshop";
import { constructSchema, idSchema } from "common/schema/utils";
import { string } from "yup";


const app = express();
app.use(genMiddleware({
  useAuth: "admin",
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  try {
    constructSchema({
      id: idSchema
    }).validate(request.body);
    validateWorkshop(request.body);
  } catch(err) {
    functions.logger.error(err);
    return response.status(400).send({message: `Invalid request body`});
  }

  const data = request.body;

  try {  
    await admin.firestore().doc(`/workshops/${data.id}`).delete();
  } catch(err) {
    functions.logger.error(err);
    return response.sendStatus(500);
  }

  const message = `Successfully create workshop ${data.id}`;
  functions.logger.log(message);
  return response.status(200).send({message});
});

export const deleteWorkshop = functions.region('asia-east2').https.onRequest(app);