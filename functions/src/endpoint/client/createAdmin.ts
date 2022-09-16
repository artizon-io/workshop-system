import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { UserSchema } from "@mingsumsze/common"
import { object, ValidationError } from "yup";


const app = express();
app.use(genMiddleware({
  useAuth: "admin",
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  try {
    await object({
      phone: UserSchema.phone.required()
    }).validate(request.body);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.status(400).send({message});
  }

  const data = request.body;
  
  try {
    const user = await admin.auth().createUser({
      phoneNumber: data.phone
    })
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });  

  } catch(err) {
    const message = "User is already an admin";
    functions.logger.error(err);
    return response.status(400).send({message});
  }

  return response.status(200).send({
    message: `Successfully made ${data.phone} an admin`
  });
});

export const createAdmin = functions.region('asia-east2').https.onRequest(app);