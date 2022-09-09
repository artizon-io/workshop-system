import * as functions from "firebase-functions";


export const getError = (err : any) : functions.auth.HttpsError => {
  // Test err's code
  return new functions.https.HttpsError(
    'unknown',
    'Unknown error'
  );
}