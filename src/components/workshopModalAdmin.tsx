import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, ModalProps } from '@chakra-ui/react';
import { Card, StyledCard } from './card';
import { addDoc, collection, doc, Timestamp } from 'firebase/firestore';
import { WorkshopInputField } from './workshopInputField';
import { ErrorBoundary } from 'react-error-boundary'
import { MapErrorFallback } from './mapErrorFallback';
import { setDoc } from 'firebase/firestore';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { datetimestrToTimestamp } from '../utils/datetimestrToTimestamp';
import { StyledWorkshop, WorkshopType } from './workshop';
import { Flexbox } from './flexbox';
import { useFormik } from 'formik';
import Logger from 'js-logger';


export const WorkshopModalAdmin: FC<{
  readonly workshop?: WorkshopType;
  readonly isOpen: boolean;
  readonly onClose: () => void;

} & React.HTMLAttributes<HTMLDivElement>> = ({ 
  workshop,
  isOpen,
  onClose,
  ...props
}) => {
  const [date, setDate] = !!workshop
    ? useState(workshop.datetime.toDate().toLocaleDateString())
    : useState('');
  const [time, setTime] = !!workshop
    ? useState(workshop.datetime.toDate().toLocaleTimeString())
    : useState('');
  const [title, setTitle] = !!workshop
    ? useState(workshop.title)
    : useState('');
  const [fee, setFee] = !!workshop
    ? useState(workshop.fee.toString())
    : useState('');
  const [duration, setDuration] = !!workshop
    ? useState(workshop.duration.toString())
    : useState('');
  const [language, setLanguage] = !!workshop
    ? useState(workshop.language)
    : useState('');
  const [capacity, setCapacity] = !!workshop
    ? useState(workshop.capacity.toString())
    : useState('');
  const [venue, setVenue] = !!workshop
    ? useState(workshop.venue)
    : useState('');
  const [mapsrc, setMapsrc] = !!workshop
    ? useState(workshop.mapsrc)
    : useState('');
  const [description, setDescription] = !!workshop
    ? useState(workshop.description)
    : useState('');
  
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
  } = useFirebaseContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick size="4xl" scrollBehavior='inside' {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flexbox as="form">
            <WorkshopInputField k="Title" value={title} onChange={e => setTitle((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Description" value={description} onChange={e => setDescription((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Date" placeholder="e.g. 31/08/2022" value={date} onChange={e => setDate((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Time" placeholder="e.g. 19:30:00" value={time} onChange={e => setTime((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Duration" placeholder="in minutes" value={duration} onChange={e => setDuration((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Language" value={language} onChange={e => setLanguage((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Capacity" placeholder="limit on no. heads" value={capacity} onChange={e => setCapacity((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Fee" value={fee} placeholder="value in HKD" onChange={e => setFee((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Venue" value={venue} onChange={e => setVenue((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            <WorkshopInputField k="Map source" value={mapsrc} placeholder="string after 'https://www.google.com/maps/embed?'" onChange={e => setMapsrc((e.target as HTMLInputElement).value)} isUpdating={isUpdating}/>
            {/* <ErrorBoundary
              FallbackComponent={MapErrorFallback}
              // onReset={() => {
              //   // reset the state of your app so the error doesn't happen again
              // }}
            > */}
              <iframe src={`https://www.google.com/maps/embed?${mapsrc}`} style={{border: 0, width: "100%", height: "30vh"}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            {/* </ErrorBoundary> */}
          </Flexbox>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={isUpdating}
            colorScheme="blue"
            onClick={() => {
              if (!!workshop) {
                setIsUpdating(true);
                setDoc(doc(firestore, 'workshops', workshop.id), {
                  title,
                  fee: parseInt(fee),
                  venue,
                  language,
                  mapsrc,
                  capacity: parseInt(capacity),
                  duration: parseInt(duration),
                  description,
                  datetime: datetimestrToTimestamp(date, time)
                })
                  .then(() => {
                    Logger.info("Successfully update workshop details");
                    setIsUpdating(false);
                  })
                  .catch(err => {
                    Logger.error(err);
                    setIsUpdating(false);
                  });
              } else {
                setIsUpdating(true);
                addDoc(collection(firestore, 'workshops'), {
                  title,
                  fee: parseInt(fee),
                  venue,
                  language,
                  mapsrc,
                  capacity: parseInt(capacity),
                  duration: parseInt(duration),
                  description,
                  datetime: datetimestrToTimestamp(date, time)
                })
                  .then(() => {
                    Logger.info("Successfully add new workshop");
                    setTitle('');
                    setFee('');
                    setVenue('');
                    setLanguage('');
                    setMapsrc('');
                    setCapacity('');
                    setDuration('');
                    setDescription('');
                    setDate('');
                    setTime('');
                    setIsUpdating(false);
                  })
                  .catch(err => {
                    Logger.error(err);
                    setIsUpdating(false);
                  });
              }
            }}
          >{!!workshop
            ? "Apply changes"
            : "Create"
          }</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}