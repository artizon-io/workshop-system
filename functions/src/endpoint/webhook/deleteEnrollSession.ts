import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


export const deleteEnrollSession = functions.region('asia-east2').https.onRequest(async (request, response) => {
  const ref = admin.firestore().doc(`/workshop-confidential/${request.body.workshopId}`);
  try {
    await ref.update({
      current: admin.firestore.FieldValue.increment(-1),
      enrolls: admin.firestore.FieldValue.arrayRemove({
        id: request.body.enrollId,
        paymentStatus: 'unpaid'
      })
    });
    functions.logger.info(`Successfully delete enroll session with ID ${request.body.enrollId} on workshop ${request.body.workshopId}`);
    response.sendStatus(200);

  } catch(err) {
    functions.logger.error(err, `Fail to delete enroll session with ID ${request.body.enrollId} on workshop ${request.body.workshopId}`);
    response.status(500).send(err);
  }
});