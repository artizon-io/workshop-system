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
  return admin.auth().getUserByPhoneNumber(data.phoneNumber)
    .then(user => admin.auth().setCustomUserClaims(user.uid, { admin: true }))
    .then(() => ({
      message: `Successfully make ${data.phoneNumber} an admin`
    }))
    .catch(err => console.log(err));
});