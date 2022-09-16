import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { object, ValidationError } from "yup";
import { UserSchema } from "@mingsumsze/common"

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
    const user = await admin.auth().getUserByPhoneNumber(data.phone);
    admin.auth().deleteUser(user.uid);

  } catch(err) {
    const message = `User isn't an admin`;
    functions.logger.error(err);
    return response.status(400).send({message});
  }

  return response.status(200).send({
    message: `Successfully delete admin ${data.phone}`
  });
});

export const deleteAdmin = functions.region('asia-east2').https.onRequest(app);