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


// const firebaseConfig = {
//   apiKey: process.env.firebaseApiKey,
//   authDomain: process.env.firebaseAuthDomain,
//   projectId: process.env.firebaseProjectId,
//   storageBucket: process.env.firebaseStorageBucket,
//   messagingSenderId: process.env.firebaseMessagingSenderId,
//   appId: process.env.firebaseAppId,
//   measurementId: process.env.firebaseMeasurementId
// };

import { firebaseConfig } from './firebaseConfig';
import { Admin } from './pages/admin';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAnalytics = getAnalytics(firebaseApp);

const auth = getAuth();
auth.useDeviceLanguage();

const firestore = getFirestore();

const functions = getFunctions();


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
      functions
    }}>
      <ChakraProvider>
        <BrowserRouter>
          {!isCheckingUserLoggedIn ?
            <Routes>
              {/* Layout not being able to consome context */}
              <Route path="/" element={<Layout user={user} auth={auth}/>}>
                <Route index element={user ? <Home/> : <Navigate to="/login"/>}/>
              </Route>
              <Route path="/admin" element={user ? <Admin/> : <Navigate to="/login"/>}/>
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