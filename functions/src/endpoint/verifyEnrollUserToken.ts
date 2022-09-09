// import * as functions from "firebase-functions";
// import { verifyAdmin, verifyAppCheck, verifyLogin } from "../utils/verify";
// import { getError } from "../utils/error";

// import * as admin from "firebase-admin";
// admin.initializeApp();


// export const verifyUserEnrollSecret = functions.region('asia-east2').https.onCall(async (data, context) => {
//   verifyAppCheck(context);

//   verifyLogin(context);

//   if (!context.rawRequest.cookies.enrollSecret)
//     throw new functions.https.HttpsError(
//       'invalid-argument',
//       'Missing enroll secret token'
//     );

//   try {


//     return {
//       message: `User token verified`
//     };

//   } catch(err) {
//     functions.logger.error(err);
//     throw getError(err);
//   }
// });