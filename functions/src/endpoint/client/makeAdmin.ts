import * as functions from "firebase-functions";
import { verifyAdmin, verifyAppCheck } from "../../utils/verify";
import * as admin from "firebase-admin";


export const makeAdmin = functions.region(process.env.APP_LOCATION).https.onCall(async (data, context) => {
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
    throw new functions.https.HttpsError(
      'unknown',
      'Unknown error has occurred'
    )
  }
});