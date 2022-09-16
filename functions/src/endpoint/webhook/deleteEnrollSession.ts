import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { idSchema, WorkshopConfidential, WorkshopConfidentialSchema } from "@mingsumsze/common"
import { validateWorkshopConfidential } from "@mingsumsze/common"
import { object, ValidationError } from "yup";

const app = express();
app.use(genMiddleware({
  corsDomain: "all"
}));

app.post('/', async (request, response) => {
  try {
    await object({
      workshopId: idSchema.required(),
      enrollId: WorkshopConfidentialSchema.enrolls.id.required()
    }).validate(request.body);
  } catch(err) {
    const message = (err as ValidationError).message;
    functions.logger.error(message);
    return response.status(400).send({message});
  }

  const data = request.body;

  await admin.firestore().runTransaction(async t => {
    const doc = (await t.get(admin.firestore().doc(`/workshop-confidential/${data.workshopId}`))).data();
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
    // delete enrolls[data.enrollId];
    const enroll = enrolls.find(enroll => enroll.id === data.enrollId);

    try {
      t.update(admin.firestore().doc(`/workshop-confidential/${data.workshopId}`), {
        current: admin.firestore.FieldValue.increment(-1),
        enrolls: admin.firestore.FieldValue.arrayRemove(enroll)
      });
    } catch(err) {
      functions.logger.error(err);
      return response.sendStatus(500);
    }
  });

  if (response.headersSent) return response;

  functions.logger.info(`Successfully delete enroll ${data.enrollId} on workshop ${data.workshopId}`);
  return response.sendStatus(200);
});

export const deleteEnrollSession = functions.region('asia-east2').https.onRequest(app);