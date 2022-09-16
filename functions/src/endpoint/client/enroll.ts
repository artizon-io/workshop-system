import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { constructSchema, idSchema } from "@mingsumsze/common"
import { validateWorkshopConfidential, WorkshopConfidential, WorkshopConfidentialSchema } from "@mingsumsze/common"

const app = express();
app.use(genMiddleware({
  corsDomain: "all",
  useSession: true
}));

app.post("/", async (request, response) => {
  try {
    constructSchema({
      workshopId: idSchema,
      enrollId: idSchema,
      firstName: WorkshopConfidentialSchema.enrolls.firstName,
      lastName: WorkshopConfidentialSchema.enrolls.lastName,
      phone: WorkshopConfidentialSchema.enrolls.phone,
      email: WorkshopConfidentialSchema.enrolls.email,
    }).validate(request.body);
  } catch(err) {
    functions.logger.error(err);
    return response.status(400).send({message: `Invalid request body`});
  }

  const data = request.body;

  if (request.session.enrollId !== data.enrollId) {
    const message = `User is not currently enrolled to ${data.enrollId}`;
    functions.logger.info(message);
    return response.status(400).send({message});
  }
  
  const doc = (await admin.firestore().doc(`/workshop-confidential/${data.workshopId}`).get()).data();
  if (!doc) {
    const message = `Workshop ${data.workshopId} doesn't exist`;
    functions.logger.info(message);
    return response.status(400).send({message});
  }
  try {
    validateWorkshopConfidential(doc);
  } catch(err) {
    functions.logger.error(err);
    return response.sendStatus(500);
  }

  const enrolls = doc.enrolls;
  const enroll = enrolls[data.enrollId];
  if (!enroll) {
    functions.logger.error(`Enroll ${data.enrollId} doesn't exist on workshop ${data.workshopId}`);
    return response.sendStatus(500);
  }

  enroll.firstName = data.firstName;
  enroll.lastName = data.lastName;
  enroll.phone = data.phone;
  enroll.email = data.email;

  enrolls[data.enrollId] = enroll;

  try {
    await admin.firestore().doc(`/workshop-confidential/${data.workshopId}`).update({
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