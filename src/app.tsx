import React, { FC, useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Heading, Input, InputGroup, InputLeftAddon, Button, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { Card } from './components/card';
import { PhoneForm } from './components/phoneForm';
import { OTPForm } from './components/otpform';


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
  margin: 50px 100px;
`;

const FirebaseContext = React.createContext<{
  firebaseApp: FirebaseApp,
  firebaseAnalytics: Analytics,
  auth: Auth,
  recaptchaVerifier: RecaptchaVerifier,
  user: User
} | null>(null);

const App : FC<{}> = ({}) => {
  // Controlled
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const initialRender = useRef(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const [isSigninFailed, setIsSigninFailed] = useState(false);
  const [isVerificationModalOpened, setIsVerificationModalOpened] = useState(false);
  const [OTPCountdown, setOTPCountdown] = useState(0);
  const [isOTPInvalid, setIsOTPInvalid] = useState(false);

  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier>(null);
  const [recaptchaVerifierToken, setRecaptchaVerifierToken] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>(null);
  const [user, setUser] = useState<User>(null);

  auth.onAuthStateChanged(user => {
    setUser(user);
  })

  useEffect(() => {
    if (!initialRender.current)
      return;

    // https://stackoverflow.com/questions/62619916/firebase-invisible-recaptcha-does-not-work-in-react-js
    const verifier = new RecaptchaVerifier(buttonRef.current, {
      'size': 'invisible',
      'callback': res => {
        // reCAPTCHA solved, allow signInWithPhoneNumber
        console.log("Recaptcha passed");
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.log("Recaptcha expired");
        // Logic to re-init recaptcha
      }
    }, auth);
    setRecaptchaVerifier(verifier);

    initialRender.current = !initialRender.current;
  }, []);

  const initPhoneCountDown = (time: number) => {
    initCountdown(setPhoneCountdown, time);
  }

  const initOTPCountDown = (time: number) => {
    initCountdown(setOTPCountdown, time);
  }

  const initCountdown = (setCountdown: (number) => void, time: number) => {
    setCountdown(time);
    const id = setInterval(() => {
      setCountdown(countdown => {
        if (countdown) {
          return countdown-1;
        } else {
          clearInterval(id);
          return 0;
        }
      });
    }, 1000);
  }

  const handleClick : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    initPhoneCountDown(10);
    setIsSigninFailed(false);
    recaptchaVerifier.verify()
      .then(token => {
        setRecaptchaVerifierToken(token);
        signInWithPhone();
      })
      .catch(err => console.log(err));
  }
  
  const signInWithPhone = () => {
    const phoneWithDistrict = '+852' + phone;
    signInWithPhoneNumber(auth, phoneWithDistrict, recaptchaVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setConfirmationResult(confirmationResult);
        setIsVerificationModalOpened(true);

      }).catch(err => {
        // Error; SMS not sent
        // ...
        console.log(err);
        setIsSigninFailed(true);
      });
    setPhone('');
  }

  const handleClickVerificationCode : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    initOTPCountDown(5);
    setIsOTPInvalid(false);
    confirmationResult.confirm(verificationCode)
      .then(userCredential => {
        // setUserCredential(userCredential);
        setIsVerificationModalOpened(false);
      })
      .catch(err => {
        console.log(err);
        setIsOTPInvalid(true);
      });
    setVerificationCode('');
  }

  return (
    <FirebaseContext.Provider value={{
      firebaseApp,
      firebaseAnalytics,
      auth,
      recaptchaVerifier,
      user
    }}>
      <ChakraProvider>
        <StyledContainer>
          <Heading>Workshop System</Heading>
          {!user &&
            <Card>
              <h3>Sign in with Phone Number</h3>
              <PhoneForm
                handleClick={handleClick}
                phone={phone}
                setPhone={setPhone}
                ref={buttonRef}
                countDown={phoneCountdown}
                isSigninFailed={isSigninFailed}
              />
              <OTPForm
                isOpen={isVerificationModalOpened}
                onClose={() => setIsVerificationModalOpened(false)}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                handleClick={handleClickVerificationCode}
                isOTPInvalid={isOTPInvalid}
                countDown={OTPCountdown}
              />
            </Card>
          }
          {user &&
            <>
              <Heading size="sm">Welcome {user.phoneNumber}!</Heading>
              <Button colorScheme="blue" onClick={() => {
                auth.signOut().then(() => {
                  // setUserCredential(null);
                  console.log("Signed out");
                });
              }}>Sign Out</Button>
            </>
          }
        </StyledContainer>
      </ChakraProvider>
    </FirebaseContext.Provider>
  )
}

export default App;