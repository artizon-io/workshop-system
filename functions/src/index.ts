import * as admin from "firebase-admin";
admin.initializeApp();

export { createWorkshop } from "./endpoint/client/createWorkshop";
export { updateWorkshop } from "./endpoint/client/updateWorkshop";
export { deleteWorkshop } from "./endpoint/client/deleteWorkshop";

export { initiateEnroll } from "./endpoint/client/initiateEnroll";
export { enroll } from "./endpoint/client/enroll";

export { createAdmin } from "./endpoint/client/createAdmin";
export { deleteAdmin } from "./endpoint/client/deleteAdmin";

export { deleteEnroll } from "./endpoint/webhook/deleteEnroll";
export { deleteSession } from "./endpoint/webhook/deleteSession"
export { stripe } from "./endpoint/webhook/stripe";

export { createWorkshopConfidential } from "./reactive/firestore/createWorkshopConfidential";
export { deleteWorkshopConfidential } from "./reactive/firestore/deleteWorkshopConfidential";