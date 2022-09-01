import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button } from '@chakra-ui/react';
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


export const WorkshopModal: FC<{
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly workshop: WorkshopType

} & React.HTMLAttributes<HTMLDivElement>> = ({ 
  workshop,
  isOpen,
  onClose,
  ...props
}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick size="4xl" scrollBehavior='inside' {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{workshop.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flexbox>
            {!!workshop.description && <Text>Description: {workshop.description}</Text>}
            <Text>Date: {workshop.datetime.toDate().toLocaleDateString()}</Text>
            <Text>Time: {workshop.datetime.toDate().toLocaleTimeString()}</Text>
            <Text>Duration: {workshop.duration} mins</Text>
            <Text>Language: {workshop.language}</Text>
            <Text>Capacity: {workshop.capacity}</Text>
            <Text>Fee: HKD {workshop.fee}</Text>
            <Text>Venue: {workshop.venue}</Text>
            <iframe src={`https://www.google.com/maps/embed?${workshop.mapsrc}`} style={{border: 0, width: "100%", height: "30vh"}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Flexbox>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            // onClick={}
          >Enroll</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}