import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { Heading, Input, InputGroup, InputLeftAddon, Button, useDisclosure, Text } from '@chakra-ui/react'
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { Firestore, getFirestore, collection, addDoc } from "firebase/firestore";
import { FirebaseContext } from './hooks/useFirebaseContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from 'pages/login';
import { Home } from 'pages/home';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { enableIndexedDbPersistence } from "firebase/firestore"; 
import { appCheckSiteKey, firebaseConfig } from 'config/firebaseConfig';
import { Admin } from 'pages/admin';
import { AdminManagement } from 'pages/adminManagement';
import Logger from 'js-logger';
import { Enroll } from 'pages/enroll';

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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useToast();

  const checkIsAdmin = async (user : User) : Promise<void> => {
    const idToken = await user.getIdTokenResult(true);  // force refresh
    if (idToken.claims.admin)
      setIsAdmin(true);
  }

  // Force enabling firestore cache before any of the useEffect of child elements
  useLayoutEffect(() => {
    enableIndexedDbPersistence(firestore)
      .catch(err => {
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

    auth.onAuthStateChanged(async user => {
      Logger.debug("User:", user);
      setUser(user);
      await checkIsAdmin(user);
      setIsCheckingAuth(false);
    });
  }, []);

  useEffect(() => {
    Logger.debug(isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    Logger.debug("isCheckingAuth:", isCheckingAuth);
  }, [isCheckingAuth]);

  const adminConditionalRender = (elem : ReactElement) : ReactNode => {
    if (isCheckingAuth) {
      Logger.debug("Displaying loading page");
      return (<Text>Checking if logged in...</Text>);
    } else if (!isAdmin) {
      Logger.debug("Redirect to login");
      return (<Navigate to="/login"/>);
    } else {
      return elem;
    }
  }

  const loginConditionalRender = () : ReactNode => {
    if (isCheckingAuth) {
      Logger.debug("Displaying loading page");
      return (<Text>Checking if logged in...</Text>);
    } else if (isAdmin) {
      Logger.debug("Redirect to admin");
      return (<Navigate to="/admin"/>)
    } else {
      return <Login/>;
    }
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
            <Route path="/">
              <Route index element={<Home/>}/>
              <Route path="workshop/:workshopId/enroll/:enrollId" element={<Enroll/>}/>
            </Route>

            <Route path="/admin">
              <Route index element={adminConditionalRender(<Admin/>)}/>  
              <Route path="admin-management" element={adminConditionalRender(<AdminManagement/>)}/>
            </Route>

            <Route path="/login" element={loginConditionalRender()}/>

            <Route path="*" element={<Text>Not Found</Text>}/>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </FirebaseContext.Provider>
  );
}

export default App;