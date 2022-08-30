import React, { FC, useEffect } from "react";
import { Heading, Input, InputGroup, InputLeftAddon, Button, Text } from '@chakra-ui/react'
import styled from "@emotion/styled";


const StyledPhoneForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  /* & > .phone-input {
    flex: 1;
  } */
`;

export interface PhoneFormProps {
  readonly phone: string;
  readonly setPhone: (phone: string) => void;
  readonly handleClickPhone: React.MouseEventHandler<HTMLButtonElement>;
  readonly isPhoneInvalid: boolean;
  readonly cooldownPhone: number
}

export const PhoneForm = React.forwardRef<HTMLButtonElement, PhoneFormProps & React.HTMLAttributes<HTMLDivElement>>(({
  phone,
  setPhone,
  handleClickPhone,
  isPhoneInvalid,
  cooldownPhone,
  ...props
}, ref) => {
  return (
    <StyledPhoneForm {...props}>
      <Heading size="md" fontWeight="normal">Sign in with Phone Number</Heading>
      <InputGroup className="phone-input">
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
          <Text color="red.600" fontSize="sm">Could be because of:</Text>
          <ul>
            <Text color="red.600" fontSize="sm" as="li">Phone number is invalid</Text>
            <Text color="red.600" fontSize="sm" as="li">Too many request in a short period of time</Text>
          </ul>
        </div>
      }
      <Button onClick={handleClickPhone} ref={ref} colorScheme="blue" disabled={!!cooldownPhone}>Submit</Button>
    </StyledPhoneForm>
  );
});

          