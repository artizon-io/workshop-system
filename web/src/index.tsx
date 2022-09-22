import ReactDOM from "react-dom/client";
import App from "./app";
import React, { FC, StrictMode } from 'react';
import { FirebaseAppProvider } from "reactfire";
import { FirebaseServices } from "./firebaseServices";
import Logger from "js-logger";
import { Services } from "./services";

Logger.useDefaults({
  defaultLevel: import.meta.env.PROD ? Logger.OFF : Logger.DEBUG,
  formatter: (messages, context) => {
    messages.unshift(`[${context.level.name}]`)
  }
});

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Services>
        <FirebaseServices>
          <App/>
        </FirebaseServices>
      </Services>
    </FirebaseAppProvider>
  </StrictMode>
);