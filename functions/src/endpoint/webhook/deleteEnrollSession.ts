import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";
import { constructSchema, idSchema } from "@mingsumsze/common"
import { validateWorkshopConfidential } from "@mingsumsze/common"

const app = express();
app.use(genMiddleware({
  corsDomain: "all"
}));

app.post('/', async (request, response) => {
  try {
    constructSchema({
      workshopId: idSchema,
      enrollId: idSchema
    }).validate(request.body);
  } catch(err) {
    functions.logger.error(err);
    return response.status(400).send({message: `Invalid request body`});
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
      validateWorkshopConfidential(doc);
    } catch(err) {
      functions.logger.error(err);
      return response.sendStatus(500);
    }

    const enrolls = doc.enrolls;
    delete enrolls[data.enrollId];

    try {
      t.update(admin.firestore().doc(`/workshop-confidential/${data.workshopId}`), {
        current: admin.firestore.FieldValue.increment(-1),
        enrolls
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