import React, { FC, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { Heading, Input, InputGroup, InputLeftAddon, Button, useDisclosure } from '@chakra-ui/react'
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
import { enableIndexedDbPersistence } from "firebase/firestore"; 
import { appCheckSiteKey, firebaseConfig } from './firebaseConfig';
import { Admin } from './pages/admin';
import { AdminLayout } from './layout/adminLayout';
import { AdminManagement } from './pages/adminManagement';
import Logger from 'js-logger';
import { Enroll } from './pages/enroll';

// To be make Logger.OFF at production
Logger.useDefaults({
  defaultLevel: Logger.TRACE,
  formatter: function (messages, context) {
    messages.unshift(`[${context.level.name}]`)
  }
});

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAnalytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();

const firestore = getFirestore(firebaseApp);

const functions = getFunctions(firebaseApp, 'asia-east2');

// Be to disabled for production build
globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(appCheckSiteKey),
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

const App : FC<{}> = ({}) => {
  const [user, setUser] = useState<User>(null);
  const [isCheckingUserLoggedIn, setIsCheckingUserLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useToast();

  const checkIsAdmin = async (user : User) : Promise<void> => {
    const idToken = await user.getIdTokenResult(true);  // force refresh
    if (idToken.claims.admin)
      setIsAdmin(true);
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
      if (isCheckingUserLoggedIn)
        setIsCheckingUserLoggedIn(false);
    });

    enableIndexedDbPersistence(firestore).catch(err => {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        toast({
          description: "We noticed you have multiple on-going sessions on other browser tabs. Please close all others or the website might behave unexpectedly.",
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: 'bottom',
        });
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        toast({
          description: "Your browser version is incompatible. Be aware that the website might behave unexpectedly.",
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: 'bottom',
        });
      }
      Logger.warn(err);
    });
  }, []);

  useEffect(() => {
    checkIsAdmin(user);
  }, [isCheckingUserLoggedIn]);

  const adminConditionalRender = (elem : ReactElement) : ReactNode => {
    if (isCheckingUserLoggedIn)
      return (<Heading fontWeight={'medium'}>Checking if logged in</Heading>);
    else if (!isAdmin)
      return (<Navigate to="/login"/>);
    else
      return elem;
  }

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
          <Routes>
            {/* Layout not being able to consome context */}
            <Route path="/" element={<Layout user={user} auth={auth}/>}>
              <Route index element={<Home/>}/>
              <Route path="workshop/:workshopId/enroll/:enrollId" element={<Enroll/>}/>
            </Route>

            <Route path="/admin" element={<AdminLayout user={user} auth={auth}/>}>
              <Route index element={adminConditionalRender(<Admin/>)}/>  
              <Route path="admin-management" element={adminConditionalRender(<AdminManagement/>)}/>
            </Route>

            <Route path="/login" element={<Login/>}/>

            <Route path="*" element={<Heading fontWeight={'medium'}>Not Found</Heading>}/>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </FirebaseContext.Provider>
  );
}

export default App;