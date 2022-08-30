import {  
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  InputGroup,
  Input
} from "@chakra-ui/react";
import React, { FC } from "react";


interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly verificationCode: string;
  readonly setVerificationCode: (code: string) => void;
  readonly handleClick: React.MouseEventHandler<HTMLButtonElement>;
  readonly isOTPInvalid: boolean;
  readonly countDown: number;
}

export const OTPForm = React.forwardRef<HTMLButtonElement, Props>(({
  isOpen,
  onClose,
  verificationCode,
  setVerificationCode,
  handleClick,
  isOTPInvalid,
  countDown,
  ...props
}, ref) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Phone Verification</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          A notification has been sent to your phone
          <InputGroup className="phone-verification-input">
            <Input
              type="number"
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
              placeholder={countDown ? `Try again in ${countDown} seconds` : "6-digit verification code"}
              disabled={!!countDown}
              isInvalid={isOTPInvalid}
            />
          </InputGroup>
          {isOTPInvalid && <Text color="red.600" fontSize="sm">OTP is invalid</Text>}
          <ModalFooter>
            <Button onClick={handleClick} ref={ref} colorScheme="blue" disabled={!!countDown}>Submit</Button>
          </ModalFooter>
        </ModalBody>

      </ModalContent>
    </Modal>
  );
})