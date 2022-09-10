import React, { FC, useEffect, useRef, useState } from 'react';
import { Heading, Input, InputGroup, InputLeftAddon, Button, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled';
import { ApplicationVerifier, ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useFirebaseContext } from 'hooks/useFirebaseContext';
import { PhoneForm } from './phoneForm';
import { OTPForm } from './otpForm';
import Logger from 'js-logger';
import { useNavigate } from 'react-router-dom';
// import HCaptcha from '@hcaptcha/react-hcaptcha';


const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin: 100px;
`;

// export type CaptchaRef = {
//   elem: HCaptcha;
//   token: string;
// };

// class HCaptchaVerifier implements ApplicationVerifier {
//   type = "hcaptcha";

//   captchaRef: React.MutableRefObject<CaptchaRef>;

//   constructor(captchaRef) {
//     this.captchaRef = captchaRef;
//   }

//   async verify(): Promise<string> {
//     this.captchaRef.current.elem.execute();
//     return this.captchaRef.current.token;
//   }
// }


const Login : FC<{}> = ({}) => {
  const [phone, setPhone] = useState('');
  const [OTP, setOTP] = useState('');

  // const captchaRef = useRef<CaptchaRef>(null);
  const captchaRef = useRef<HTMLButtonElement>(null);
  const [applicationVerifier, setApplicationVerifier] = useState<ApplicationVerifier>(null);

  const [cooldownPhone, setCooldownPhone] = useState(0);
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [isOTPModalOpened, setIsOTPModalOpened] = useState(false);
  const [cooldownOTP, setCooldownOTP] = useState(0);
  const [isOTPInvalid, setIsOTPInvalid] = useState(false);

  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>(null);

  const navigate = useNavigate();

  const {
    auth,
  } = useFirebaseContext();
  
  const initPhoneCountDown = (time: number) => {
    initCountdown(setCooldownPhone, time);
  }

  const initOTPCountDown = (time: number) => {
    initCountdown(setCooldownOTP, time);
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

  useEffect(() => {
    // setApplicationVerifier(new HCaptchaVerifier(captchaRef));
    setApplicationVerifier(new RecaptchaVerifier(
      captchaRef.current,
      {
        size: 'invisible',
        callback: res => {
          // reCAPTCHA solved, allow signInWithPhoneNumber
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      },
      auth
    ));
  }, []);

  const handleClickPhone : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    initPhoneCountDown(10);
    setIsPhoneInvalid(false);
    signInWithPhone();
  }

  const signInWithPhone = () => {
    const phoneWithDistrict = '+852' + phone;
    signInWithPhoneNumber(auth, phoneWithDistrict, applicationVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setConfirmationResult(confirmationResult);
        setIsOTPModalOpened(true);

      }).catch(err => {
        // Error; SMS not sent
        Logger.error("Trigger phone signin failed", err);
        setIsPhoneInvalid(true);
      });
    setPhone('');
  }

  const handleClickOTP : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    initOTPCountDown(5);
    setIsOTPInvalid(false);
    confirmationResult.confirm(OTP)
      .then(userCredential => {
        setIsOTPModalOpened(false);
        navigate("/");
      })
      .catch(err => {
        Logger.error("OTP verification failed", err);
        setIsOTPInvalid(true);
      });
    setOTP('');
  }

  return (
    <StyledContainer>
      <Heading className='title' fontWeight="medium" size='xl'>Workshop System</Heading>
      <PhoneForm className="phone-form"
        handleClickPhone={handleClickPhone}
        phone={phone}
        setPhone={setPhone}
        ref={captchaRef}
        cooldownPhone={cooldownPhone}
        isPhoneInvalid={isPhoneInvalid}
      />
      <OTPForm className="otp-form"
        isOpen={isOTPModalOpened}
        onClose={() => setIsOTPModalOpened(false)}
        OTP={OTP}
        setOTP={setOTP}
        handleClickOTP={handleClickOTP}
        isOTPInvalid={isOTPInvalid}
        cooldownOTP={cooldownOTP}
      />
    </StyledContainer>
  )
}

export default Login;