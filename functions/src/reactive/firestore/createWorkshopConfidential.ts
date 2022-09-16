import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { validateWorkshopConfidential } from "@mingsumsze/common"
import { ValidationError } from "yup";


export const createWorkshopConfidential = functions.region('asia-east2').firestore.document('/workshops/{id}')
.onCreate(async (snapshot, context) => {
  try {
    const doc = {
      current: 0,
      enrolls: []
    };
    try {
      await validateWorkshopConfidential(doc);
    } catch(err) {
      const message = (err as ValidationError).message;
      functions.logger.error(message);
      return;
    }
    await admin.firestore().doc(`workshop-confidential/${context.params.id}`).create(doc);
    functions.logger.info(`Successfully create workshop-confidential ${context.params.id}`);

  } catch(err) {
    functions.logger.error(err);
  }
});