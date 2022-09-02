import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, ModalProps, Input, InputAddon, InputLeftAddon, InputGroup } from '@chakra-ui/react';
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
  const formik = useFormik({
    initialValues: {
      title: workshop?.title ?? '',
      description: workshop?.description ?? '',
      venue: workshop?.venue ?? '',
      fee: workshop?.fee ?? '',
      duration: workshop?.duration ?? '',
      language: workshop?.language ?? '',
      capacity: workshop?.capacity ?? '',
      mapsrc: workshop?.mapsrc ?? '',
      date: workshop?.datetime.toDate().toLocaleDateString("sv-SE") ?? '',  // only to set the format
      // date: workshop?.datetime.toDate().toISOString().substring(0, 10) ?? '',
      time: workshop?.datetime.toDate().toLocaleTimeString("en-GB", {hour: '2-digit', minute: '2-digit', hour12: false}) ?? '',  // only to set the format
      // time: workshop?.datetime.toDate().toISOString().substring(11,16) ?? '',
    },
    onSubmit: data => {
      setIsUpdating(true);
      Logger.info("Data: ", data);
      Logger.debug("Fee is type:", typeof data.fee);
      if (!!workshop)
        updateDocToFirestore(data);
      else
        addDocToFirestore(data);
    },
  });

  const updateDocToFirestore = ({
    title,
    description,
    venue,
    fee,
    duration,
    language,
    capacity,
    mapsrc,
    date,
    time,
  }) => {
    setDoc(doc(firestore, 'workshops', workshop.id), {
      title,
      fee,
      venue,
      language,
      mapsrc,
      capacity,
      duration,
      description,
      datetime: datetimestrToTimestamp(date, time)
    })
      .then(() => {
        Logger.info("Successfully update workshop details");
        setIsUpdating(false);
      })
      .catch(err => {
        Logger.error("Fail updating workshop details", err);
        setIsUpdating(false);
      });
  }

  const addDocToFirestore = ({
    title,
    description,
    venue,
    fee,
    duration,
    language,
    capacity,
    mapsrc,
    date,
    time,
  }) => {
    addDoc(collection(firestore, 'workshops'), {
      title,
      fee,
      venue,
      language,
      mapsrc,
      capacity,
      duration,
      description,
      datetime: datetimestrToTimestamp(date, time)
    })
      .then(() => {
        Logger.info("Successfully add new workshop");
        setIsUpdating(false);
      })
      .catch(err => {
        Logger.error("Fail adding new workshop", err);
        setIsUpdating(false);
      });
  }
  
  const [isUpdating, setIsUpdating] = useState(false);

  const formButtonRef = useRef<HTMLButtonElement>(null);

  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
  } = useFirebaseContext();

  useEffect(() => {
    // Logger.debug("Date:", workshop?.datetime.toDate().toISOString().substring(0, 10));
    // Logger.debug("Date:", workshop?.datetime.toDate().toLocaleDateString("sv-SE"));
    // Logger.debug(workshop?.datetime.toDate().toISOString().substring(0, 10) === workshop?.datetime.toDate().toLocaleDateString("sv-SE"));
    // Logger.debug("Time:", workshop?.datetime.toDate().toISOString().substring(11,16));
    // Logger.debug("Time:", workshop?.datetime.toDate().toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit', hour12: false}));
  }, []);

  // useEffect(() => {
  //   Logger.debug("Date (current):", formik.values.date);
  // }, [formik.values.date]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick size="4xl" scrollBehavior='inside' {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {/* @ts-ignore */}
          <Flexbox as="form" onSubmit={formik.handleSubmit}>
            <InputGroup>
              <InputLeftAddon>Title</InputLeftAddon>
              <Input name="title" type={"text"} onChange={formik.handleChange} value={formik.values.title} disabled={isUpdating}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Description</InputLeftAddon>
              <Input name="description" type={"text"} onChange={formik.handleChange} value={formik.values.description} disabled={isUpdating}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Venue</InputLeftAddon>
              <Input name="venue" type={"text"} onChange={formik.handleChange} value={formik.values.venue} disabled={isUpdating}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Date</InputLeftAddon>
              <Input name="date" type={"date"} onChange={formik.handleChange} value={formik.values.date} disabled={isUpdating}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Time</InputLeftAddon>
              <Input name="time" type={"time"} onChange={formik.handleChange} value={formik.values.time} disabled={isUpdating}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Fee (HKD)</InputLeftAddon>
              <Input name="fee" type={"number"} onChange={formik.handleChange} value={formik.values.fee} disabled={isUpdating}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Language</InputLeftAddon>
              <Input name="language" type={"text"} onChange={formik.handleChange} value={formik.values.language} disabled={isUpdating}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Duration (mins)</InputLeftAddon>
              <Input name="duration" type={"number"} onChange={formik.handleChange} value={formik.values.duration} disabled={isUpdating}/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Google Map Link</InputLeftAddon>
              <Input name="mapsrc" type={"text"} onChange={formik.handleChange} value={formik.values.mapsrc} disabled={isUpdating} placeholder="string after 'https://www.google.com/maps/embed?'"/>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>Capacity</InputLeftAddon>
              <Input name="capacity" type={"number"} onChange={formik.handleChange} value={formik.values.capacity} disabled={isUpdating}/>
            </InputGroup>
            {/* <ErrorBoundary
              FallbackComponent={MapErrorFallback}
              // onReset={() => {
              //   // reset the state of your app so the error doesn't happen again
              // }}
            > */}
              <iframe src={`https://www.google.com/maps/embed?${formik.values.mapsrc}`} style={{border: 0, width: "100%", height: "30vh"}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            {/* </ErrorBoundary> */}
            <button type="submit" style={{display: "none"}} ref={formButtonRef}></button>
          </Flexbox>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={isUpdating}
            colorScheme="blue"
            onClick={() => {
              formButtonRef.current.click();
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