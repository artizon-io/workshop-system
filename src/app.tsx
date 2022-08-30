import React, { FC, useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Heading, Input, InputGroup, InputLeftAddon, Button, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { Firestore, getFirestore, collection, addDoc } from "firebase/firestore";
import { SigninCard } from './components/signinCard';
import { FirebaseContext } from './hooks/useFirebaseContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';


const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
  measurementId: process.env.firebaseMeasurementId
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAnalytics = getAnalytics(firebaseApp);

const auth = getAuth();
auth.useDeviceLanguage();

const firestore = getFirestore();


// Open issue on reCAPTCHA error during local dev
// https://github.com/firebase/firebase-js-sdk/issues/3356

const App : FC<{}> = ({}) => {
  const [user, setUser] = useState<User>(null);
  return (
    <FirebaseContext.Provider value={{
      firebaseApp,
      firebaseAnalytics,
      auth,
      user,
      setUser,
      firestore
    }}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </FirebaseContext.Provider>
  );
}

export default App;