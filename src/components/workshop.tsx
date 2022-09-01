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
import { Flexbox } from './flexbox';
import { WorkshopModalAdmin } from './workshopModalAdmin';
import { WorkshopModal } from './workshopModal';


// const StyledWorkshop = styled(StyledCard.withComponent("button"))`
export const StyledWorkshop = styled(Card)`
  padding: 30px;
  align-items: flex-start;

  /* &:hover {
    box-shadow: 0px 0px 16px 4px #f0f0f0;
  }
  transition: box-shadow 0.3s; */
`;

export interface WorkshopType {
  id: string;
  title: string;
  description: string;
  datetime: Timestamp;
  duration: number;
  language: string;
  capacity: number;
  fee: number;
  venue: string;
  mapsrc: string;
}

export const Workshop: FC<{
  readonly workshop: WorkshopType;
  readonly isAdmin: boolean;

} & React.HTMLAttributes<HTMLDivElement>> = ({ 
  workshop,
  isAdmin,
  ...props
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <StyledWorkshop
      // onClick={() => setIsModalOpened(true)}
      {...props}
    >
      <Heading size="md" fontWeight="medium">{workshop.title}</Heading>
      {!!workshop.description && <Text>Description: {workshop.description}</Text>}
      <Text>Date: {workshop.datetime.toDate().toLocaleDateString()}</Text>
      <Text>Time: {workshop.datetime.toDate().toLocaleTimeString()}</Text>
      <Button onClick={() => setIsModalOpened(true)} colorScheme="blue">View Details</Button>
      {/* Map */}
      {isAdmin ?
        <WorkshopModalAdmin
          isOpen={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          workshop={workshop}
        />
        : <WorkshopModal
          isOpen={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          workshop={workshop}
          {...props}
        />
      }
    </StyledWorkshop>
  );
}