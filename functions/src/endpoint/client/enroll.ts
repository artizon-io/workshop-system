import * as functions from "firebase-functions";
import { v4 as uuidv4 } from 'uuid';
import { CloudTasksClient } from '@google-cloud/tasks';
import * as admin from "firebase-admin";
import { initStripe } from "../../utils/stripe";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as csrf from "csurf";
import * as bodyParser from "body-parser";
import { auth } from "../middleware/auth";

const app = express();

app.use(cors({
  origin: process.env.APP_DOMAIN
}));

// app.use(auth);

app.use(cookieParser());

app.use(bodyParser.json({}));

// app.use(csrf());

// export const initiateEnroll = functions.region('asia-east2').https.onCall(async (data, context) => {
app.post("/", async (request, response) => {
  // verifyAppCheck(context);

  if (!request.body.firstName)
    return response.status(400).send("Missing argument firstName");
  
  if (!request.body.lastName)
    return response.status(400).send("Missing argument lastName");

  if (!request.body.phone)
    return response.status(400).send("Missing argument phone");

  if (!request.body.email)
    return response.status(400).send("Missing argument email");

  if (!request.body.enrollId)
    return response.status(400).send("Missing argument enrollId");

  if (!request.body.enrollId)
    return response.status(400).send("Missing argument workshopId");

  const data = request.body as {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    enrollId: string;
    workshopId: string;
  };
  
  const docRef = await admin.firestore().doc(`/workshop-confidential/${data.workshopId}`);
  const doc = (await docRef.get()).data();
  if (!doc)
    return response.status(400).send(`Cannot fetch workshop document with id ${data.workshopId}`);
  
  const enrolls = doc.enrolls;
  const enroll = enrolls[data.workshopId];
  if (!enroll)
    return response.status(400).send(`Cannot fetch enroll with id ${data.enrollId}`);

  enroll.firstName = data.firstName;
  enroll.lastName = data.lastName;
  enroll.phone = data.phone;
  enroll.email = data.email;

  enrolls[data.workshopId] = enroll;

  try {
    await docRef.update({
      enrolls
    });
    return response.status(200).send(`Successfully enroll`);
  } catch(err) {
    functions.logger.error(err);
    return response.status(500).send(`Server error`);
  }
});

export const enroll = functions.region(process.env.APP_LOCATION).https.onRequest(app);