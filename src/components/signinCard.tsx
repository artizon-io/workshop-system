import React, { FC } from 'react';
import styled from '@emotion/styled';
import { PhoneForm, PhoneFormProps } from './phoneForm';
import { OTPForm, OTPFormProps } from './otpform';


const StyledSigninCard = styled.div`
  border: 1px solid #e7e7e7;
  border-radius: 20px;
  padding: 80px 50px;

  & > .phone-form {
    
  }
  & > .otp-form {

  }
`;

interface Props {
  readonly phone: string;
  readonly setPhone: (phone: string) => void;
  readonly handleClickPhone: React.MouseEventHandler<HTMLButtonElement>;
  readonly isPhoneInvalid: boolean;
  readonly cooldownPhone: number

  readonly isOTPModalOpened: boolean;
  readonly setIsOTPModalOpened: (isOpened: false) => void;
  readonly OTP: string;
  readonly setOTP: (code: string) => void;
  readonly handleClickOTP: React.MouseEventHandler<HTMLButtonElement>;
  readonly isOTPInvalid: boolean;
  readonly cooldownOTP: number; 
}

export const SigninCard = React.forwardRef<HTMLButtonElement, Props & React.HTMLAttributes<HTMLDivElement>>(({
  phone,
  setPhone,
  handleClickPhone,
  isPhoneInvalid,
  cooldownPhone,
  isOTPModalOpened,
  setIsOTPModalOpened,
  OTP,
  setOTP,
  handleClickOTP,
  isOTPInvalid,
  cooldownOTP,
  ...props
}, ref) => {
  return (
    <StyledSigninCard {...props}>
      <PhoneForm className="phone-form"
        handleClickPhone={handleClickPhone}
        phone={phone}
        setPhone={setPhone}
        ref={ref}
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
    </StyledSigninCard>
  );
})