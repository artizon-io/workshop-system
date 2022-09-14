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


export interface OTPFormProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly OTP: string;
  readonly setOTP: (code: string) => void;
  readonly handleClickOTP: React.MouseEventHandler<HTMLButtonElement>;
  readonly isOTPInvalid: boolean;
  readonly cooldownOTP: number;
}

export const OTPForm = React.forwardRef<HTMLButtonElement, OTPFormProps & React.HTMLAttributes<HTMLDivElement>>(({
  isOpen,
  onClose,
  OTP,
  setOTP,
  handleClickOTP,
  isOTPInvalid,
  cooldownOTP,
  ...props
}, ref) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Phone Verification</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          A notification has been sent to your phone
          <InputGroup className="phone-verification-input">
            <Input
              type="number"
              value={OTP}
              onChange={e => setOTP(e.target.value)}
              placeholder={cooldownOTP ? `Try again in ${cooldownOTP} seconds` : "6-digit verification code"}
              disabled={!!cooldownOTP}
              isInvalid={isOTPInvalid}
            />
          </InputGroup>
          {isOTPInvalid && <Text color="red.600" fontSize="sm">OTP is invalid</Text>}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClickOTP} ref={ref} colorScheme="blue" disabled={!!cooldownOTP}>Submit</Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  );
})