import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { checkArgs } from "../../utils/checkArgs";
import { checkDoc } from "../../utils/checkDoc";

const app = express();
app.use(genMiddleware({
  corsDomain: "all",
  useSession: true
}));

app.post("/", async (request, response) => {
  checkArgs(request, response, ["firstName", "lastName", "phone", "email", "enrollId", "workshopId"]);
  if (response.headersSent) return response;

  const data = request.body as {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    enrollId: string;
    workshopId: string;
  };

  if (request.session.enrollId !== data.enrollId) {
    const message = `User is not currently enrolled to ${data.enrollId}`;
    functions.logger.info(message);
    return response.status(400).send({message});
  }
  
  const docRef = admin.firestore().doc(`/workshop-confidential/${data.workshopId}`);
  let doc = checkDoc(request, response, await docRef.get(), {
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
  if (response.headersSent) return response;

  const enrolls = (doc as admin.firestore.DocumentData).enrolls;
  const enroll = enrolls[data.enrollId];
  if (!enroll) {
    functions.logger.error(`Cannot fetch enroll with id ${data.enrollId}`);
    return response.sendStatus(500);
  }

  enroll.firstName = data.firstName;
  enroll.lastName = data.lastName;
  enroll.phone = data.phone;
  enroll.email = data.email;

  enrolls[data.enrollId] = enroll;

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