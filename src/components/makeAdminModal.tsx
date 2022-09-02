import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, Input } from '@chakra-ui/react';
import { Card, StyledCard } from './card';
import { doc, Timestamp } from 'firebase/firestore';
import { WorkshopInputField } from './workshopInputField';
import { ErrorBoundary } from 'react-error-boundary'
import { MapErrorFallback } from './mapErrorFallback';
import { setDoc } from 'firebase/firestore';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { datetimestrToTimestamp } from '../utils/datetimestrToTimestamp';
import { WorkshopType } from './workshop';
import { Flexbox } from './flexbox';
import { httpsCallable } from "firebase/functions";
import Logger from 'js-logger';


export const MakeAdminModal: FC<{
  readonly isOpen: boolean;
  readonly onClose: () => void;

} & React.HTMLAttributes<HTMLDivElement>> = ({
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
              httpsCallable(functions, 'makeAdmin')({ phoneNumber: phone })
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