import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { checkArgs } from "../../utils/checkArgs";
import { checkDoc } from "../../utils/checkDoc";

const app = express();
app.use(genMiddleware({
  corsDomain: "all"
}));

app.post("/", async (request, response) => {
  const error = checkArgs(request, response, ["firstName", "lastName", "phone", "email", "enrollId", "workshopId"]);
  if (error)
    return;

  const data = request.body as {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    enrollId: string;
    workshopId: string;
  };

  // if (!request.session.enrollId || request.session.enrollId !== data.enrollId)
  //   return response.status(400).send(`User is not currently enrolled to this enroll with id ${data.enrollId}`);
  
  const docRef = admin.firestore().doc(`/workshop-confidential/${data.workshopId}`);
  let [doc, res] = checkDoc(request, response, await docRef.get(), {
    current : "number",
    enrolls : "object"
    // enrolls : {
      // firstName: "string",
      // lastName: "string",
      // phone: "string",
      // email: "string",
    //   paymentStatus: "string"
    // }
  });

  if (res)
    return;

  const enrolls = doc!.enrolls;
  const enroll = enrolls[data.workshopId];
  if (!enroll) {
    functions.logger.info(`Cannot fetch enroll with id ${data.enrollId}`);
    return response.sendStatus(500);
  }

  enroll.firstName = data.firstName;
  enroll.lastName = data.lastName;
  enroll.phone = data.phone;
  enroll.email = data.email;

  enrolls[data.workshopId] = enroll;

  try {
    await docRef.update({
      enrolls
    });
    return response.status(200).send({
      message: `Successfully enrolled`
    });
  } catch(err) {
    functions.logger.error(err);
    return response.sendStatus(500);
  }
});

export const enroll = functions.region('asia-east2').https.onRequest(app);