import React, { FC } from 'react';
import { AnalyticsProvider, AppCheckProvider, AuthProvider, FirebaseAppProvider, FirestoreProvider, FunctionsProvider, useFirebaseApp, useInitAnalytics, useInitAppCheck, useInitAuth, useInitFirestore, useInitFunctions } from "reactfire";
import { enableMultiTabIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


export const FirebaseServices : FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
  const firebaseApp = useFirebaseApp();

  // const firestore = useInitFirestore(async firebaseApp => {
  //   const firestore = getFirestore(firebaseApp);
  //   try {
  //     await enableMultiTabIndexedDbPersistence(firestore);
  //   } catch(err) {
  //     switch (err.code) {
  //       // case 'failed-precondition':
  //       //   // Multiple tabs open, persistence can only be enabled
  //       //   // in one tab at a a time.
  //       //   break;
  //       case 'unimplemented':
  //         // The current browser does not support all of the
  //         // features required to enable persistence
  //         break;
  //     }
  //   }
  //   return firestore;
  // });
  const firestore = getFirestore(firebaseApp);

  window.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.DEV;
  const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(`${import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY}`),

    isTokenAutoRefreshEnabled: true,  // automatically refreshes App Check tokens as needed
  });

  // const functions = useInitFunctions(async firebaseApp => getFunctions(firebaseApp, 'asia-east2'));
  const functions = getFunctions(firebaseApp, 'asia-east2');

  // const analytics = useInitAnalytics(async firebaseApp => getAnalytics(firebaseApp));
  const analytics = getAnalytics(firebaseApp);

  // const auth = useInitAuth(async firebaseApp => {
  //   const auth = getAuth(firebaseApp);
  //   auth.useDeviceLanguage();
  //   return auth;
  // });
  const auth = getAuth(firebaseApp);

  // const performance = useInitPerformance(async firebaseApp => getPerformance(firebaseApp));

  // const storage = useInitStorage(async firebaseApp => getStorage(firebaseApp));

  return (
    <FirestoreProvider sdk={firestore}>
      <AnalyticsProvider sdk={analytics}>
        <FunctionsProvider sdk={functions}>
          <AuthProvider sdk={auth}>
            <AppCheckProvider sdk={appCheck}>
              {children}
            </AppCheckProvider>
          </AuthProvider>
        </FunctionsProvider>
      </AnalyticsProvider>
    </FirestoreProvider>
  );
}