import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { checkArgs } from "../../utils/checkArgs";
import { checkDoc } from "../../utils/checkDoc";
import * as express from "express";
import { genMiddleware } from "../middleware/genMiddleware";

const app = express();
app.use(genMiddleware({
  corsDomain: "all"
}));

app.post('/', async (request, response) => {
  const ref = admin.firestore().doc(`/workshop-confidential/${request.body.workshopId}`);

  checkArgs(request, response, ["workshopId", "enrollId"])
  if (response.headersSent) return response;

  const data = request.body as {
    enrollId : string;
    workshopId : string;
  };

  await admin.firestore().runTransaction(async t => {
    const doc = checkDoc(request, response, await t.get(ref), {
      enrolls : "object"
    })

    if (response.headersSent) return response;

    const enrolls = (doc as admin.firestore.DocumentData).enrolls;
    delete enrolls[data.enrollId];

    try {
      t.update(ref, {
        current: admin.firestore.FieldValue.increment(-1),
        enrolls
      });
    } catch(err) {
      functions.logger.error(err);
      return response.sendStatus(500);
    }
    return;
  });

  if (response.headersSent) return response;

  functions.logger.info(`Successfully delete enroll session with ID ${data.enrollId} on workshop ${data.workshopId}`);
  return response.sendStatus(200);
});

export const deleteEnrollSession = functions.region('asia-east2').https.onRequest(app);