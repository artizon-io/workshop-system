import React, { FC, useEffect, useRef, useState } from 'react';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, ModalProps, Input, InputAddon, InputLeftAddon, InputGroup, SlideFade, Box, Collapse, Spinner, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { datetimestrToTimestamp } from 'utils/datetimestrToTimestamp';
import { Workshop } from 'common/schema/workshop';
import { Flexbox } from 'components/flexbox';
import { useFormik } from 'formik';
import Logger from 'js-logger';
import { WorkshopModalAdminAddModeFooter } from './workshopModalAdminAddModeFooter';
import { WorkshopModalAdminEditModeFooter } from './workshopModalAdminEditModeFooter';
import { WorkshopModalAdminEnrollDetails } from './workshopModalAdminEnrollDetails';
import { useFirestore } from 'reactfire';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly workshop?: Workshop & {id: string};
  readonly isOpen: boolean;
  readonly onClose: () => void;
}


export const WorkshopModalAdmin: FC<Props> = ({
  workshop,
  isOpen,
  onClose,
  ...props
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const formButtonRef = useRef<HTMLButtonElement>(null);  // place button at modal footer instead of inside form (inside modal body)

  const [isEnrollDetailsOpened, setIsEnrollDetailsOpened] = useState(false);

  const firestore = useFirestore();

  const formik = useFormik({
    initialValues: {
      title: workshop?.title ?? '',
      description: workshop?.description ?? '',
      venue: workshop?.venue ?? '',
      fee: workshop?.fee ?? '',
      duration: workshop?.duration ?? '',
      language: workshop?.language ?? '',
      capacity: workshop?.capacity ?? '',
      date: workshop?.datetime.toDate().toLocaleDateString("sv-SE") ?? '',  // only to set the format
      time: workshop?.datetime.toDate().toLocaleTimeString("en-GB", {hour: '2-digit', minute: '2-digit', hour12: false}) ?? '',  // only to set the format
    },
    validate: values => {
      const errors : any = {};
      if (!values.title) {
        errors.title = 'Required';
      }
    
      if (!values.description) {
        errors.description = 'Required';
      }
    
      if (!values.venue) {
        errors.venue = 'Required';
      }
  
      if (!values.fee) {
        errors.fee = 'Required';
      }
  
      if (!values.duration) {
        errors.duration = 'Required';
      }
  
      if (!values.language) {
        errors.language = 'Required';
      }
  
      if (!values.capacity) {
        errors.capacity = 'Required';
      }
  
      if (!values.date) {
        errors.date = 'Required';
      }
  
      if (!values.time) {
        errors.time = 'Required';
      }
  
      return errors;
    },
    onSubmit: data => {
      Logger.debug("Triggering on submit");
      setIsUpdating(true);  // Firestore offline data actually allows for instant local write
                            // but we are blocking it here intentionally
      Logger.info("Data:", data);
      const docRef = !!workshop
        ? doc(firestore, 'workshops', workshop.id)
        : doc(firestore, 'workshops');
      setDoc(docRef, {
        title: data.title,
        fee: data.fee,
        venue: data.venue,
        language: data.language,
        capacity: data.capacity,
        duration: data.duration,
        description: data.description,
        datetime: datetimestrToTimestamp(data.date, data.time)
      })
        .then(() => {
          Logger.info("Successfully write workshop");
          setIsUpdating(false);
        })
        .catch(err => {
          Logger.error("Fail writing workshop", err);
          setIsUpdating(false);
        });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick size="4xl" scrollBehavior='inside' {...props}>
      <ModalOverlay />
      {!!isEnrollDetailsOpened
        ? <WorkshopModalAdminEnrollDetails
          setIsEnrollDetailsOpened={setIsEnrollDetailsOpened}
          workshop={workshop}
        />
        : <ModalContent>
          <ModalHeader>Workshop Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flexbox as="form" onSubmit={formik.handleSubmit}>
            {/* <form onSubmit={formik.handleSubmit}> */}
              <InputGroup>
                <InputLeftAddon>Title</InputLeftAddon>
                <Input name="title" type={"text"} onChange={formik.handleChange} value={formik.values.title} disabled={isUpdating} isInvalid={!!formik.errors.title}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Description</InputLeftAddon>
                <Input name="description" type={"text"} onChange={formik.handleChange} value={formik.values.description} disabled={isUpdating} isInvalid={!!formik.errors.description}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Venue</InputLeftAddon>
                <Input name="venue" type={"text"} onChange={formik.handleChange} value={formik.values.venue} disabled={isUpdating} isInvalid={!!formik.errors.venue}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Date</InputLeftAddon>
                <Input name="date" type={"date"} onChange={formik.handleChange} value={formik.values.date} disabled={isUpdating} isInvalid={!!formik.errors.date}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Time</InputLeftAddon>
                <Input name="time" type={"time"} onChange={formik.handleChange} value={formik.values.time} disabled={isUpdating} isInvalid={!!formik.errors.time}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Fee (HKD)</InputLeftAddon>
                <Input name="fee" type={"number"} onChange={formik.handleChange} value={formik.values.fee} disabled={isUpdating} isInvalid={!!formik.errors.fee}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Language</InputLeftAddon>
                <Input name="language" type={"text"} onChange={formik.handleChange} value={formik.values.language} disabled={isUpdating} isInvalid={!!formik.errors.language}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Duration (mins)</InputLeftAddon>
                <Input name="duration" type={"number"} onChange={formik.handleChange} value={formik.values.duration} disabled={isUpdating} isInvalid={!!formik.errors.duration}/>
              </InputGroup>
              {/* <InputGroup>
                <InputLeftAddon>Google Map Link</InputLeftAddon>
                <Input name="mapsrc" type={"text"} onChange={formik.handleChange} value={formik.values.mapsrc} disabled={isUpdating} placeholder="string after 'https://www.google.com/maps/embed?'" isInvalid={!!formik.errors.mapsrc}/>
              </InputGroup> */}
              <InputGroup>
                <InputLeftAddon>Capacity</InputLeftAddon>
                <Input name="capacity" type={"number"} onChange={formik.handleChange} value={formik.values.capacity} disabled={isUpdating} isInvalid={!!formik.errors.capacity}/>
              </InputGroup>
              {/* <iframe src={`https://www.google.com/maps/embed?${formik.values.mapsrc}`} style={{border: 0, width: "100%", height: "30vh"}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/> */}
              <button type="submit" style={{display: "none"}} ref={formButtonRef}/>
            </Flexbox>
            {/* </form> */}
          </ModalBody>
          {!!workshop
            ? <WorkshopModalAdminEditModeFooter
              // onClick={() => formButtonRef.current.click()}
              formButtonRef={formButtonRef}
              isUpdating={isUpdating}
              onClose={onClose}
              setIsEnrollDetailsOpened={setIsEnrollDetailsOpened}
              setIsUpdating={setIsUpdating}
              workshop={workshop}
            />
            : <WorkshopModalAdminAddModeFooter
              // onClick={() => formButtonRef.current.click()}
              formButtonRef={formButtonRef}
              isUpdating={isUpdating}
            />
          }
        </ModalContent>
      }
    </Modal>
  );
}