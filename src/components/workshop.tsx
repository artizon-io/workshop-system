import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button } from '@chakra-ui/react';
import { Card, StyledCard } from './card';
import { Flexbox } from './flexbox';
import { WorkshopModalAdmin } from './workshopModalAdmin';
import { WorkshopModal } from './workshopModal';
import { Workshop } from '../hooks/useWorkshop';


// const StyledWorkshop = styled(StyledCard.withComponent("button"))`
export const StyledWorkshop = styled(Card)`
  padding: 30px;
  align-items: flex-start;
  justify-content: space-between;

  & > .upper {
    gap: 20px;
  }
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly workshop: Workshop;
  readonly isAdmin: boolean;
}

export const WorkshopBrief: FC<Props> = ({ 
  workshop,
  isAdmin,
  ...props
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <StyledWorkshop
      {...props}
    >
      <Flexbox className='upper'>
        <Heading size="md" fontWeight="medium">{workshop.title}</Heading>
        {!!workshop.description && <Text>Description: {workshop.description}</Text>}
        <Text>Date: {workshop.datetime.toDate().toLocaleDateString()}</Text>
        <Text>Time: {workshop.datetime.toDate().toLocaleTimeString()}</Text>
      </Flexbox>
      <Button onClick={() => setIsModalOpened(true)} colorScheme="blue">View Details</Button>
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
        />
      }
    </StyledWorkshop>
  );
}