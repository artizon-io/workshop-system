import ReactDOM from "react-dom/client";
import App from "./app";
import React, { FC, StrictMode } from 'react';
import { appCheckSiteKey, firebaseConfig } from "config/firebaseConfig";
import { AnalyticsProvider, AppCheckProvider, AuthProvider, FirebaseAppProvider, FirestoreProvider, FunctionsProvider, useInitAnalytics, useInitAppCheck, useInitAuth, useInitFirestore, useInitFunctions } from "reactfire";
import { FirebaseServices } from "./firebaseServices";
import Logger from "js-logger";
import { Services } from "./services";

// To be make Logger.OFF at production
Logger.useDefaults({
  defaultLevel: Logger.TRACE,
  formatter: function (messages, context) {
    messages.unshift(`[${context.level.name}]`)
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
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