import * as functions from "firebase-functions";


// Deprecated
export const verifyAppCheck = (context : functions.https.CallableContext) => {
  // context.app will be undefined if the request doesn't include an
  // App Check token. (If the request includes an invalid App Check
  // token, the request will be rejected with HTTP error 401.)

  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    )
  }
}

// Deprecated
export const verifyLogin = (context : functions.https.CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Not logged in'
    )
  }
}

export const verifyAdmin = (context : functions.https.CallableContext) => {
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Not enough privilege'
    )
  }
}