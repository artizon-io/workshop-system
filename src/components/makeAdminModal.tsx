import React, { FC, useState } from 'react';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, Input } from '@chakra-ui/react';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { httpsCallable } from "firebase/functions";
import Logger from 'js-logger';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const MakeAdminModal: FC<Props> = ({
  isOpen,
  onClose,
  ...props
}) => {
  const {
    functions
  } = useFirebaseContext();
  
  const [phone, setPhone] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick size="md" scrollBehavior='inside' {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Make existing account an Admin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            disabled={isUpdating}
            placeholder="e.g. +85291001234"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            disabled={isUpdating}
            onClick={() => {
              setIsUpdating(true);
              httpsCallable<
                {  // request
                  phoneNumber: string;
                },
                {  // response
                  message: string;
                }
              >(functions, 'makeAdmin')({ phoneNumber: phone })
                .then(res => {
                  Logger.info(`Retrieve data`, res.data);
                  setIsUpdating(false);
                })
                .catch(err => {
                  Logger.error(`Error message`, err.message);
                  setIsUpdating(false);
                });
            }}
          >Make account an Admin</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}