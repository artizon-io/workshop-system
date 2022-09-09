import * as functions from "firebase-functions";

import * as admin from "firebase-admin";


export const deleteWorkshopConfidential = functions.region('asia-east2').firestore.document('/workshops/{id}')
.onDelete(async (snapshot, context) => {
  admin.initializeApp();
  
  try {
    await admin.firestore().doc(`workshop-confidential/${context.params.id}`).delete();
    functions.logger.info(`Successfully delete workshop-confidential doc for workshop id ${context.params.id}`);

  } catch(err) {
    functions.logger.error(err);
  }
});