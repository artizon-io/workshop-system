import React, { FC, useEffect, useRef, useState } from 'react';
import { Heading, Input, InputGroup, InputLeftAddon, Button, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled';
import { Auth, ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber, User, UserCredential } from "firebase/auth";
import { SigninCard } from '../components/signinCard';
import { useFirebaseContext } from '../hooks/useFirebaseContext';


const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin: 200px 500px;
`;


const Login : FC<{}> = ({}) => {
  const [phone, setPhone] = useState('');
  const [OTP, setOTP] = useState('');

  const initialRender = useRef(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [isOTPModalOpened, setIsOTPModalOpened] = useState(false);
  const [OTPCountdown, setOTPCountdown] = useState(0);
  const [isOTPInvalid, setIsOTPInvalid] = useState(false);

  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier>(null);
  const [recaptchaVerifierToken, setRecaptchaVerifierToken] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>(null);

  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    setUser,
    firestore,
  } = useFirebaseContext();
  

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

  const handleClickPhone : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    initPhoneCountDown(10);
    setIsPhoneInvalid(false);
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
        setIsOTPModalOpened(true);

      }).catch(err => {
        // Error; SMS not sent
        // ...
        console.log(err);
        setIsPhoneInvalid(true);
      });
    setPhone('');
  }

  const handleClickOTP : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    initOTPCountDown(5);
    setIsOTPInvalid(false);
    confirmationResult.confirm(OTP)
      .then(userCredential => {
        setUser(userCredential.user);
        setIsOTPModalOpened(false);
      })
      .catch(err => {
        console.log(err);
        setIsOTPInvalid(true);
      });
    setOTP('');
  }

  return (
    <StyledContainer>
      <Heading className='title' fontWeight="medium" size='xl'>Workshop System</Heading>
      <SigninCard
        className='sigin-card'
        handleClickPhone={handleClickPhone}
        phone={phone}
        setPhone={setPhone}
        ref={buttonRef}
        cooldownPhone={phoneCountdown}
        isPhoneInvalid={isPhoneInvalid}

        isOTPModalOpened={isOTPModalOpened}
        setIsOTPModalOpened={setIsOTPModalOpened}
        OTP={OTP}
        setOTP={setOTP}
        handleClickOTP={handleClickOTP}
        isOTPInvalid={isOTPInvalid}
        cooldownOTP={OTPCountdown}
      />
    </StyledContainer>
  )
}

export default Login;