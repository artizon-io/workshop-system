import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { WorkshopConfidential, WorkshopConfidentialSchema } from "@mingsumsze/common"
import { validate } from "../../utils/validate";


export const createWorkshopConfidential = functions.region('asia-east2').firestore.document('/workshops/{id}')
.onCreate(async (snapshot, context) => {
  try {
    const doc = {
      current: 0,
      enrolls: []
    };
    const {data, issues} = validate(
      WorkshopConfidentialSchema,
      doc
    );
  
    if (issues)
      return functions.logger.error(issues);
    
    await admin.firestore().doc(`workshop-confidential/${context.params.id}`).create(doc);
    functions.logger.info(`Successfully create workshop-confidential ${context.params.id}`);

  } catch(err) {
    functions.logger.error(err);
  }
});