import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { idSchema } from "@mingsumsze/common"
import { validateWorkshopConfidential, WorkshopConfidential, WorkshopConfidentialSchema } from "@mingsumsze/common"
import { object, ValidationError } from "yup";

const app = express();
app.use(genMiddleware({
  corsDomain: "all",
  useSession: true
}));

app.post("/", async (request, response) => {
  try {
    await object({
      workshopId: idSchema.required(),
      enrollId: WorkshopConfidentialSchema.enrolls.id.required(),
      firstName: WorkshopConfidentialSchema.enrolls.firstName.required(),
      lastName: WorkshopConfidentialSchema.enrolls.lastName.required(),
      phone: WorkshopConfidentialSchema.enrolls.phone.required(),
      email: WorkshopConfidentialSchema.enrolls.email.required(),
    }).validate(request.body);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.status(400).send({message});
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
    await validateWorkshopConfidential(doc);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.sendStatus(500);
  }

  const enrolls = doc.enrolls as WorkshopConfidential['enrolls'];
  const enroll = enrolls.find(enroll => enroll.id === data.enrollId);
  if (!enroll) {
    functions.logger.error(`Enroll ${data.enrollId} doesn't exist on workshop ${data.workshopId}`);
    return response.sendStatus(500);
  }

  enroll.firstName = data.firstName;
  enroll.lastName = data.lastName;
  enroll.phone = data.phone;
  enroll.email = data.email;

  // enrolls[data.enrollId] = enroll;

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