import { useContext } from "react";
import React from "react";
import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth, RecaptchaVerifier, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";


export const FirebaseContext = React.createContext<{
  firebaseApp: FirebaseApp,
  firebaseAnalytics: Analytics,
  auth: Auth,
  user: User,
  firestore: Firestore,
  functions: Functions
} | null>(null);

export const useFirebaseContext = () => useContext(FirebaseContext);