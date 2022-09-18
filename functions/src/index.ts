import * as admin from "firebase-admin";
try {
  admin.initializeApp();
} catch(err) {
  admin.app();
}

export { default as api } from "./endpoint/client";

export { default as webhook } from "./endpoint/webhook";

export * from "./reactive/firestore";