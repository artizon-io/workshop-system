import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button } from '@chakra-ui/react';
import { Card, StyledCard } from './card';
import { Timestamp } from 'firebase/firestore';
import { WorkshopInputField } from './workshopInputField';
import { ErrorBoundary } from 'react-error-boundary'
import { MapErrorFallback } from './mapErrorFallback';


// const StyledWorkshop = styled(StyledCard.withComponent("button"))`
const StyledWorkshop = styled(Card)`
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
  readonly adminMode: boolean;

} & React.HTMLAttributes<HTMLDivElement>> = ({ 
  workshop,
  adminMode,
  ...props
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [date, setDate] = useState(workshop.datetime.toDate().toLocaleDateString());
  const [time, setTime] = useState(workshop.datetime.toDate().toLocaleTimeString());
  const [title, setTitle] = useState(workshop.title);
  const [fee, setFee] = useState(workshop.fee.toString());
  const [duration, setDuration] = useState(workshop.duration.toString());
  const [language, setLanguage] = useState(workshop.language);
  const [capacity, setCapacity] = useState(workshop.capacity.toString());
  const [venue, setVenue] = useState(workshop.venue);
  const [mapsrc, setMapsrc] = useState(workshop.mapsrc);
  const [description, setDescription] = useState(workshop.description);

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
      {isModalOpened &&
        <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)} isCentered closeOnOverlayClick size="4xl" scrollBehavior='inside' {...props}>
          <ModalOverlay />
          <ModalContent>
            {!adminMode && <ModalHeader>{workshop.title}</ModalHeader>}
            <ModalCloseButton />
            <ModalBody>
              {!adminMode ?
                <>
                  {!!workshop.description && <Text>Description: {workshop.description}</Text>}
                  <Text>Date: {workshop.datetime.toDate().toLocaleDateString()}</Text>
                  <Text>Time: {workshop.datetime.toDate().toLocaleTimeString()}</Text>
                  <Text>Duration: {workshop.duration} mins</Text>
                  <Text>Language: {workshop.language}</Text>
                  <Text>Capacity: {workshop.capacity}</Text>
                  <Text>Fee: HKD {workshop.fee}</Text>
                  <Text>Venue: {workshop.venue}</Text>
                  <iframe src={workshop.mapsrc} style={{border: 0, width: "100%", height: "30vh"}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </> :
                <>
                  <WorkshopInputField k="Title" value={title} onChange={e => setTitle((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Description" value={description} onChange={e => setDescription((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Date" value={date} onChange={e => setDate((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Time" value={time} onChange={e => setTime((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Duration" value={duration} onChange={e => setDuration((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Language" value={language} onChange={e => setLanguage((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Capacity" value={capacity} onChange={e => setCapacity((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Fee" value={fee} onChange={e => setFee((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Venue" value={venue} onChange={e => setVenue((e.target as HTMLInputElement).value)}/>
                  <WorkshopInputField k="Map source" value={mapsrc} onChange={e => setMapsrc((e.target as HTMLInputElement).value)}/>
                  {/* <ErrorBoundary
                    FallbackComponent={MapErrorFallback}
                    // onReset={() => {
                    //   // reset the state of your app so the error doesn't happen again
                    // }}
                  > */}
                    <iframe src={`https://www.google.com/maps/embed?${mapsrc}`} style={{border: 0, width: "100%", height: "30vh"}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  {/* </ErrorBoundary> */}
                </>
              }
            </ModalBody>
            <ModalFooter>
              {!adminMode ?
                <Button
                  colorScheme="blue"
                  // onClick={}
                >Enroll</Button>
                : <Button
                  colorScheme="blue"
                  // onClick={}
                >Apply changes</Button>
              }
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </StyledWorkshop>
  );
}