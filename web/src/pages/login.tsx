import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { PhoneOTPLogin } from '@artizon/design-system';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useAuth, useSigninCheck } from 'reactfire';

type StyledLoginVariants = Stitches.VariantProps<typeof StyledLogin>

const StyledLogin = styled('main', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

interface Props extends React.ComponentProps<typeof StyledLogin> {
  
};

const Login: React.FC<Props> = ({ ...props }) => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const [recaptchaVerifer, setRecaptchaVerifier] = useState<RecaptchaVerifier>();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>();
  const auth = useAuth();

  useEffect(() => {
    setRecaptchaVerifier(new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (res : any) => {},  // reCAPTCHA solved, allow signInWithPhoneNumber
        'expired-callback': () => {}   // Response expired. Ask user to solve reCAPTCHA again.
      },
      auth
    ));
  }, []);

  useEffect(() => {
    switch(showLogin) {
      case false:
        setTimeout(() => navigate('/admin'), 2000);
        break;
    }
  }, [showLogin]);

  const submitPhone = async (phone: string) : Promise<void> => {
    // return new Promise((resolve, reject) => setTimeout(() => resolve(), 500));
    // return Promise.resolve()

    if (!recaptchaVerifer)
      throw Error('Recaptcha verifier is still loading')

    const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifer);
    setConfirmationResult(result);
  }

  const submitOtp = async (otp: string) : Promise<void> => {
    // return new Promise((resolve, reject) => setTimeout(() => { resolve(); setShowLogin(false) }, 500));

    if (!confirmationResult)
      throw Error("OTP hasn't been sent yet");

    const userCredential = await confirmationResult.confirm(otp);
    setShowLogin(false);
  }

  return (
    <StyledLogin {...props}>
      <AnimatePresence>
        {showLogin
        && <PhoneOTPLogin
          submitPhone={submitPhone}
          submitOtp={submitOtp}
        />
        }
      </AnimatePresence>
    </StyledLogin>
  );
};

export default Login;