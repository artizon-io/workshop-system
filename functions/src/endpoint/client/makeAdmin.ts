import * as functions from "firebase-functions";
import { verifyAdmin, verifyAppCheck } from "../../utils/verify";
import { getError } from "../../utils/error";

import * as admin from "firebase-admin";


export const makeAdmin = functions.region('asia-east2').https.onCall(async (data, context) => {
  admin.initializeApp();
  
  verifyAppCheck(context);

  verifyAdmin(context);

  if (!data.phoneNumber)
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Phone number missing'
    );

  try {
    const user = await admin.auth().getUserByPhoneNumber(data.phoneNumber);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    return {
      message: `Successfully made ${data.phoneNumber} an admin`
    };

  } catch(err) {
    functions.logger.error(err);
    throw getError(err);
  }
});