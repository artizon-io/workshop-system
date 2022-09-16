import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { genMiddleware } from "../middleware/genMiddleware";
import * as express from "express";
import { constructSchema } from "@mingsumsze/common"
import { UserSchema } from "@mingsumsze/common"

const app = express();
app.use(genMiddleware({
  useAuth: "admin",
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  try {
    constructSchema({
      phone: UserSchema.phone
    }).validate(request.body);
  } catch(err) {
    functions.logger.error(err);
    return response.status(400).send({message: `Invalid request body`});
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