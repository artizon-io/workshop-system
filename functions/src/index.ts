import * as admin from "firebase-admin";
admin.initializeApp();

export { initiateEnroll } from "./endpoint/client/initiateEnroll";
export { createAdmin } from "./endpoint/client/createAdmin";
export { deleteAdmin } from "./endpoint/client/deleteAdmin";
export { enroll } from "./endpoint/client/enroll";
export { createWorkshopConfidential } from "./reactive/firestore/createWorkshopConfidential";
export { deleteEnrollSession } from "./endpoint/webhook/deleteEnrollSession";
export { deleteWorkshopConfidential } from "./reactive/firestore/deleteWorkshopConfidential";
export { stripe } from "./endpoint/webhook/stripe";