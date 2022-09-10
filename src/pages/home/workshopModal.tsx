import React, { FC, useState } from 'react';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button } from '@chakra-ui/react';
import { useFirebaseContext } from 'hooks/useFirebaseContext';
import { Workshop } from 'types/workshop';
import { Flexbox } from 'components/flexbox';
import { httpsCallable } from 'firebase/functions';
import Logger from 'js-logger';
import { useNavigate } from 'react-router-dom';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly workshop: Workshop;
}

export const WorkshopModal: FC<Props> = ({ 
  workshop,
  isOpen,
  onClose,
  ...props
}) => {
  const {
    functions
  } = useFirebaseContext();

  const [isWaitingForEnroll, setIsWaitingForEnroll] = useState(false);
  const navigate = useNavigate();

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
            onClick={() => {
              setIsWaitingForEnroll(true);
              httpsCallable<
                {  // request
                  workshopId: string;
                },
                {  // response
                  enrollId: string;
                  stripeClientSecret: string;
                }
              >(functions, 'initiateEnroll')({ workshopId: workshop.id })
                .then(res => {
                  // Logger.info(`Retrieve data`, res.data);
                  setIsWaitingForEnroll(false);
                  navigate(`/workshop/${workshop.id}/enroll/${res.data.enrollId}`, {
                    state: {
                      stripeClientSecret: res.data.stripeClientSecret
                    }
                  });
                })
                .catch(err => {
                  Logger.error(`Error message`, err.message);
                  setIsWaitingForEnroll(false);
                });
            }}
            disabled={isWaitingForEnroll}
          >Enroll</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}