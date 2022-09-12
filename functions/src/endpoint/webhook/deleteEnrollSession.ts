import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { checkArgs } from "../../utils/checkArgs";
import { checkDoc } from "../../utils/checkDoc";


export const deleteEnrollSession = functions.region('asia-east2').https.onRequest(async (request, response) => {
  const ref = admin.firestore().doc(`/workshop-confidential/${request.body.workshopId}`);

  if (checkArgs(request, response, ["workshopId", "enrollId"]))
    return;

  const data = request.body as {
    enrollId : string;
    workshopId : string;
  };

  const res = await admin.firestore().runTransaction(async t => {
    const [doc, res] = checkDoc(request, response, await t.get(ref), {
      enrolls : "object"
    })

    if (res)
      return res;

    const enrolls = doc!.enrolls;
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
    return null;
  });

  if (res)
    return;

  functions.logger.info(`Successfully delete enroll session with ID ${data.enrollId} on workshop ${data.workshopId}`);
  response.sendStatus(200);
  return;
});