import React, { FC, useEffect, useImperativeHandle, useRef } from "react";
import { Heading, Input, InputGroup, InputLeftAddon, Button, Text } from '@chakra-ui/react'
import styled from "@emotion/styled";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CaptchaRef } from "../pages/login";


const StyledPhoneForm = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface PhoneFormProps {
  readonly phone: string;
  readonly setPhone: (phone: string) => void;
  readonly handleClickPhone: React.MouseEventHandler<HTMLButtonElement>;
  readonly isPhoneInvalid: boolean;
  readonly cooldownPhone: number;
}

export const PhoneForm = React.forwardRef<CaptchaRef, PhoneFormProps & React.HTMLAttributes<HTMLDivElement>>(({
  phone,
  setPhone,
  handleClickPhone,
  isPhoneInvalid,
  cooldownPhone,
  ...props
}, captchaRef) => {
  const captchaElemRef = useRef<HCaptcha>(null);
  const captchaTokenRef = useRef<string>(null);

  useImperativeHandle(captchaRef, () => {
    return ({
      elem: captchaElemRef.current,
      token: captchaTokenRef.current
    })
  });

  return (
    <StyledPhoneForm {...props}>
      <Heading size="md" fontWeight="normal" mb="10">Sign in with Phone Number</Heading>
      <InputGroup className="phone-input" mb="10">
        <InputLeftAddon children='+852' />
        <Input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder={cooldownPhone ? `Try again in ${cooldownPhone} seconds` : "Phone no."}
          disabled={!!cooldownPhone}
          isInvalid={isPhoneInvalid}
        />
      </InputGroup>
      {isPhoneInvalid && 
        <div className="error-message">
          <Text color="red.600" fontSize="sm" mb="10">Could be because of:</Text>
          <ul>
            <Text color="red.600" fontSize="sm" as="li">Phone number is invalid</Text>
            <Text color="red.600" fontSize="sm" as="li">Too many request in a short period of time</Text>
          </ul>
        </div>
      }
      <HCaptcha
        sitekey="your-sitekey"
        onVerify={token => {
          captchaTokenRef.current = token;
        }}
        ref={captchaElemRef}
      />
      <Button
        onClick={handleClickPhone}
        colorScheme="blue"
        disabled={!!cooldownPhone}
        className="button"
      >Submit</Button>
    </StyledPhoneForm>
  );
});

          