import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HttpsError } from "firebase-functions/v1/auth";
import { v4 as uuidv4 } from 'uuid';
const { CloudTasksClient } = require('@google-cloud/tasks');

admin.initializeApp();

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
      'The function must be called from an App Check verified app.'
    )
  }

  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Not enough privilege'
    )
  }

  return admin.auth().getUserByPhoneNumber(data.phoneNumber)
    .then(user => admin.auth().setCustomUserClaims(user.uid, { admin: true }))
    .then(() => ({
      message: `Successfully make ${data.phoneNumber} an admin`
    }))
    .catch(err => err);
});

export const createWorkshopConfidential = functions.region('asia-east2').firestore.document('/workshops/{id}')
  .onCreate((snapshot, context) => {

    return admin.firestore().doc(`workshop-confidential/${context.params.id}`).create({
      current: 0,
      enrolls: []
    })
      .then(result => {
        functions.logger.info(`Successfully create workshop-confidential doc for workshop id ${context.params.id}. Write result is ${result}`);
      })
      .catch(err => err);
});

export const deleteWorkshopConfidential = functions.region('asia-east2').firestore.document('/workshops/{id}')
  .onDelete((snapshot, context) => {

    return admin.firestore().doc(`workshop-confidential/${context.params.id}`).delete()
      .then(result => {
        functions.logger.info(`Successfully delete workshop-confidential doc for workshop id ${context.params.id}. Write result is ${result}`);
      })
      .catch(err => err);
});

export const initiateEnroll = functions.region('asia-east2').https.onCall((data, context) => {
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    )
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Not enough privilege'
    )
  }

  let enrollId : string;

  return admin.firestore().runTransaction(async t => {
    try {
      const workshopDocRef = admin.firestore().doc(`/workshops/${data.workshopId}`);
      const workshopDoc = await t.get(workshopDocRef);
      const capacity = workshopDoc.data()?.capacity;
      if (capacity === undefined || capacity === null)
        throw new Error(`"Capacity" field does not exist on workshop with ID ${data.workshopId}`);
      
      const workshopConfidentialDocRef = admin.firestore().doc(`/workshop-confidential/${data.workshopId}`);
      const workshopConfidentialDoc = await t.get(workshopConfidentialDocRef);
      const current = workshopConfidentialDoc.data()?.current;
      if (current === undefined || current === null)
        throw new Error(`"Current" field does not exist on workshop-confidential with ID ${data.workshopId}`);

      if (current+1 >= capacity)
        throw new Error(`Workshop is full`);

      enrollId = uuidv4();

      // @ts-ignore
      return t.update(workshopConfidentialDocRef, {
        current: current+1,
        enrolls: admin.firestore.FieldValue.arrayUnion({
          id: enrollId,
          paymentStatus: 'unpaid'
        })
      });

      // const workshopEnrollDocRef = admin.firestore().doc(`/workshop-enroll`);
      // return t.create(workshopEnrollDocRef, {
      //   workshopId: data.workshopId,
      //   paymentStatus: false
      // })
    } catch(err) {
      functions.logger.error(err);
      throw new HttpsError(
        'aborted',
        'Some error has occurred'
      );
    }
  })
    .then(async () => {
      // Append to cloud tasks firestore-ttl queue
      functions.logger.info("To append to cloud tasks firestore-ttl queue");

      const project = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;
      const location = 'asia-east2';
      const queue = 'ttl';

      const tasksClient = new CloudTasksClient();
      const queuePath = tasksClient.queuePath(project, location, queue)

      const url = `https://${location}-${project}.cloudfunctions.net/deleteEnrollSession`
      const task = {
        httpRequest: {
          httpMethod: 'POST',
          url,
          body: Buffer.from(JSON.stringify({
            workshopId: data.workshopId,
            enrollId: enrollId
          })).toString('base64'),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        scheduleTime: {
          // seconds: 15 * 60 + Date.now() / 1000
          seconds: 1 * 60 + Date.now() / 1000
        }
      };

      functions.logger.info("Ready to append task to queue");

      const [response] = await tasksClient.createTask({ parent: queuePath, task });

      functions.logger.info("Successfully create deleteEnrollSession-trigger task", response.name);
      return {
        message: "Success",
        enrollId
      };
    })
    .catch(err => {
      functions.logger.error(err);
    });
});

export const deleteEnrollSession = functions.region('asia-east2').https.onRequest((request, response) => {
  const ref = admin.firestore().doc(`/workshop-confidential/${request.body.workshopId}`);
  ref.update({
    current: admin.firestore.FieldValue.increment(-1),
    enrolls: admin.firestore.FieldValue.arrayRemove({
      id: request.body.enrollId,
      paymentStatus: 'unpaid'
    })
  })
    .then(result => {
      functions.logger.info(`Successfully delete enroll session with ID ${request.body.enrollId} on workshop ${request.body.workshopId}`);
      response.send(200);
    })
    .catch(err => {
      functions.logger.error(err, `Fail delete enroll session with ID ${request.body.enrollId} on workshop ${request.body.workshopId}`);
      response.status(500).send(err);
    });
});

// TODO: add endpoint for checking if enrollId is valid