import React, { FC, useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react'
import styled from '@emotion/styled';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FirebaseContext = React.createContext<{
  firebaseApp: FirebaseApp,
  firebaseAnalytics: Analytics,
  recaptchaVerifier: RecaptchaVerifier
} | null>(null);


const App : FC<{}> = ({}) => {
  const [phone, setPhone] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  let recaptchaVerifier : RecaptchaVerifier | null = null;

  useEffect(() => {  // componentDidMount
    // Note no RecaptchaVerifier initialisation:
    // the corresponding element must also must be in the DOM at the time of initialization
    recaptchaVerifier = new RecaptchaVerifier(button.current, {
      'size': 'invisible',
      'callback': res => {
        // reCAPTCHA solved, allow signInWithPhoneNumber
        // logic goes here: e.g.
        // onSignInSubmit();
      }
    }, auth);
  }, [])

  const handleClick : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    signInWithPhoneNumber(auth, phone, recaptchaVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // window.confirmationResult = confirmationResult;
        // ...
      }).catch(err => {
        // Error; SMS not sent
        // ...
      });
    }

  return (
    <FirebaseContext.Provider value={{
      firebaseApp,
      firebaseAnalytics,
      recaptchaVerifier
    }}>
      <ChakraProvider>
        <StyledContainer>
          <Heading>Workshop System</Heading>
          <input type="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
          <button onClick={handleClick} ref={button} type="submit">Submit</button>
        </StyledContainer>
      </ChakraProvider>
    </FirebaseContext.Provider>
  )
}

export default App;