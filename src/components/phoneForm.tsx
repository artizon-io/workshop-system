import React, { FC, useEffect } from "react";
import { Heading, Input, InputGroup, InputLeftAddon, Button, Text } from '@chakra-ui/react'
import styled from "@emotion/styled";


const StyledPhoneForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* & > .phone-input {
    flex: 1;
  } */
`;

interface Props {
  readonly phone: string;
  readonly setPhone: (phone: string) => void;
  readonly handleClick: React.MouseEventHandler<HTMLButtonElement>;
  readonly isSigninFailed: boolean;
  readonly countDown: number
}

export const PhoneForm = React.forwardRef<HTMLButtonElement, Props>(({
  phone,
  setPhone,
  handleClick,
  isSigninFailed,
  countDown,
  ...props
}, ref) => {
  return (
    <StyledPhoneForm {...props}>
      <InputGroup className="phone-input">
        <InputLeftAddon children='+852' />
        <Input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder={countDown ? `Try again in ${countDown} seconds` : "Phone no."}
          disabled={!!countDown}
          isInvalid={isSigninFailed}
        />
      </InputGroup>
      {isSigninFailed && 
        <div className="error-message">
          <Text color="red.600" fontSize="sm">Could be because of:</Text>
          <ul>
            <Text color="red.600" fontSize="sm" as="li">Phone number is invalid</Text>
            <Text color="red.600" fontSize="sm" as="li">Too many request in a short period of time</Text>
          </ul>
        </div>
      }
      <Button onClick={handleClick} ref={ref} colorScheme="blue" disabled={!!countDown}>Submit</Button>
    </StyledPhoneForm>
  );
});

          