import React, { FC, useEffect, useRef, useState } from 'react';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, ModalProps, Input, InputAddon, InputLeftAddon, InputGroup, SlideFade, Box, Collapse, Spinner, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { Workshop, WorkshopWithId } from 'common/schema/workshop';
import Logger from 'js-logger';
import { useFirestore } from 'reactfire';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly isUpdating: boolean;
  readonly workshop: WorkshopWithId;
  readonly setIsEnrollDetailsOpened: (state: boolean) => void;
  readonly setIsUpdating: (state: boolean) => void;
  readonly onClose: () => void;
  readonly formButtonRef: React.MutableRefObject<HTMLButtonElement>;
}

export const WorkshopModalAdminEditModeFooter : FC<Props> = ({
  isUpdating,
  setIsEnrollDetailsOpened,
  setIsUpdating,
  workshop,
  onClose,
  formButtonRef,
  ...props
}) => {
  const firestore = useFirestore();

  return (
    <ModalFooter {...props}>
      <Button
        disabled={isUpdating}
        colorScheme="blue"
        onClick={() => {
          setIsEnrollDetailsOpened(true);
        }}
        marginRight={'3'}
      >
        View Enroll Details
      </Button>
      <Button
        disabled={isUpdating}
        colorScheme="red"
        onClick={() => {
          setIsUpdating(true);
          deleteDoc(doc(firestore, `/workshops/${workshop.id}`))
            .then(() => {
              Logger.info("Successfully delete workshop");
              onClose();
            })
            .catch(err => {
              Logger.error(err);
              setIsUpdating(false);
            });
        }}
        marginRight={'3'}
      >
        Delete
      </Button>
      <Button
        disabled={isUpdating}
        colorScheme="blue"
        onClick={() => {
          formButtonRef.current.click();
        }}
      >
        Apply changes
      </Button>
    </ModalFooter>
  )
}