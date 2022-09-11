import React from "react";
import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth, RecaptchaVerifier, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";
import { AppCheck } from "firebase/app-check";
import { FirebasePerformance } from "firebase/performance";


export const FirebaseContext = React.createContext<{
  firebaseApp: FirebaseApp,
  firebaseAnalytics: Analytics,
  auth: Auth,
  user: User,
  firestore: Firestore,
  functions: Functions,
  appCheck: AppCheck,
  performance: FirebasePerformance
}>(null);