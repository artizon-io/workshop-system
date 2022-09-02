import React, { FC, useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Heading, Input, InputGroup, InputLeftAddon, Button, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { Firestore, getFirestore, collection, addDoc } from "firebase/firestore";
import { FirebaseContext } from './hooks/useFirebaseContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import { Home } from './pages/home';
import { Layout } from './layout/layout';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


// const firebaseConfig = {
//   apiKey: process.env.firebaseApiKey,
//   authDomain: process.env.firebaseAuthDomain,
//   projectId: process.env.firebaseProjectId,
//   storageBucket: process.env.firebaseStorageBucket,
//   messagingSenderId: process.env.firebaseMessagingSenderId,
//   appId: process.env.firebaseAppId,
//   measurementId: process.env.firebaseMeasurementId
// };

import { appCheckSiteKey, firebaseConfig } from './firebaseConfig';
import { Admin } from './pages/admin';
import { AdminLayout } from './layout/adminLayout';
import { AdminManagement } from './pages/adminManagement';
import Logger from 'js-logger';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAnalytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();

const firestore = getFirestore(firebaseApp);

const functions = getFunctions(firebaseApp, 'asia-east2');

// To be make Logger.OFF at production
Logger.useDefaults({
  defaultLevel: Logger.TRACE,
  formatter: function (messages, context) {
    // messages.unshift(new Date().toUTCString());
    messages.unshift(`[${context.level.name}]`)
  }
});

// Be to disabled for production build
// @ts-ignore
globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(appCheckSiteKey),
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});


// Open issue on reCAPTCHA error during local dev
// https://github.com/firebase/firebase-js-sdk/issues/3356

const App : FC<{}> = ({}) => {
  const [user, setUser] = useState<User>(null);
  const [isCheckingUserLoggedIn, setIsCheckingUserLoggedIn] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
      if (isCheckingUserLoggedIn)
        setIsCheckingUserLoggedIn(false);
    });
  }, []);

  return (
    <FirebaseContext.Provider value={{
      firebaseApp,
      firebaseAnalytics,
      auth,
      user,
      firestore,
      functions,
      appCheck
    }}>
      <ChakraProvider>
        <BrowserRouter>
          {!isCheckingUserLoggedIn ?
            <Routes>
              {/* Layout not being able to consome context */}
              <Route path="/" element={<Layout user={user} auth={auth}/>}>
                <Route index element={user ? <Home/> : <Navigate to="/login"/>}/>
              </Route>
              <Route path="/admin" element={<AdminLayout user={user} auth={auth}/>}>
                <Route index element={user ? <Admin/> : <Navigate to="/login"/>}/>  
                <Route path="admin-management" element={user ? <AdminManagement/> : <Navigate to="/login"/>}/>
              </Route>
              <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>

              <Route path="*" element={<Heading>Not Found</Heading>}/>
            </Routes>
            : <Heading>Checking if logged in...</Heading>
          }
        </BrowserRouter>
      </ChakraProvider>
    </FirebaseContext.Provider>
  );
}

export default App;