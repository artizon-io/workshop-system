import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const makeAdmin = functions.region('asia-east2').https.onCall((data, context) => {
  // context.app will be undefined if the request doesn't include an
  // App Check token. (If the request includes an invalid App Check
  // token, the request will be rejected with HTTP error 401.)
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.')
  }

  if (!context.auth?.token.admin) {
    return {
      error: 'Privilege failure'
    }
  }

  return admin.auth().getUserByPhoneNumber(data.phoneNumber)
    .then(user => admin.auth().setCustomUserClaims(user.uid, { admin: true }))
    .then(() => ({
      message: `Successfully make ${data.phoneNumber} an admin`
    }))
    .catch(err => ({
      error: err
    }));
});