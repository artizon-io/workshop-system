import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


export const createWorkshopConfidential = functions.region(process.env.APP_LOCATION).firestore.document('/workshops/{id}')
.onCreate(async (snapshot, context) => {
  try {
    await admin.firestore().doc(`workshop-confidential/${context.params.id}`).create({
      current: 0,
      enrolls: []
    });
    functions.logger.info(`Successfully create workshop-confidential doc for workshop id ${context.params.id}`);

  } catch(err) {
    functions.logger.error(err);
  }
});