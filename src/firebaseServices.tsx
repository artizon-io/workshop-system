import React, { FC, StrictMode } from 'react';
import { appCheckSiteKey, firebaseConfig } from "config/firebaseConfig";
import { AnalyticsProvider, AppCheckProvider, AuthProvider, FirebaseAppProvider, FirestoreProvider, FunctionsProvider, useInitAnalytics, useInitAppCheck, useInitAuth, useInitFirestore, useInitFunctions } from "reactfire";
import { enableMultiTabIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { useConfigedToast } from "hooks/useConfigedToast";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


export const FirebaseServices : FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
  const toast = useConfigedToast();

  const firestore = useInitFirestore(async firebaseApp => {
    const firestore = getFirestore(firebaseApp);
    try {
      await enableMultiTabIndexedDbPersistence(firestore);
    } catch(err) {
      switch (err.code) {
        // case 'failed-precondition':
        //   // Multiple tabs open, persistence can only be enabled
        //   // in one tab at a a time.
        //   break;
        case 'unimplemented':
          // The current browser does not support all of the
          // features required to enable persistence
          toast({
            description: "Your browser version is incompatible. Be aware that the website might behave unexpectedly."
          })
          break;
      }
    }
    return firestore;
  });

  const appCheck = useInitAppCheck(async firebaseApp => {
    globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = window.location.hostname === "localhost";
    const appCheck = initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),

      isTokenAutoRefreshEnabled: true,  // automatically refreshes App Check tokens as needed
    }); 
    return appCheck;
  });

  const functions = useInitFunctions(async firebaseApp => getFunctions(firebaseApp, 'asia-east2'));

  const analytics = useInitAnalytics(async firebaseApp => getAnalytics(firebaseApp));

  const auth = useInitAuth(async firebaseApp => {
    const auth = getAuth(firebaseApp);
    auth.useDeviceLanguage();
    return auth;
  });

  // const performance = useInitPerformance(async firebaseApp => getPerformance(firebaseApp));

  // const storage = useInitStorage(async firebaseApp => getStorage(firebaseApp));

  return (
    <FirestoreProvider sdk={firestore.data}>
      <AnalyticsProvider sdk={analytics.data}>
        <FunctionsProvider sdk={functions.data}>
          <AuthProvider sdk={auth.data}>
            <AppCheckProvider sdk={appCheck.data}>
              {children}
            </AppCheckProvider>
          </AuthProvider>
        </FunctionsProvider>
      </AnalyticsProvider>
    </FirestoreProvider>
  );
}