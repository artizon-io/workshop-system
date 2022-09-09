import React, { FC, useEffect, useRef, useState } from 'react';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, ModalProps, Input, InputAddon, InputLeftAddon, InputGroup, SlideFade, Box, Collapse, Spinner, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { datetimestrToTimestamp } from '../utils/datetimestrToTimestamp';
import { Workshop } from '../hooks/useWorkshop';
import { Flexbox } from './flexbox';
import { useFormik } from 'formik';
import Logger from 'js-logger';
import { useWorkshopConfidentialRealtime } from '../hooks/useWorkshopConfidentialRealtime';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly workshop?: Workshop;
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

  const workshopConfidential = useWorkshopConfidentialRealtime(workshop.id);

  const {
    firestore,
  } = useFirebaseContext();

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
  
      if (!values.mapsrc) {
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
      setIsUpdating(true);  // Firestore offline data actually allows for instant local write
                            // but we are blocking it here intentionally
      Logger.info("Data:", data);
      setDoc(doc(firestore, 'workshops', workshop.id), {
        title: data.title,
        fee: data.fee,
        venue: data.venue,
        language: data.language,
        mapsrc: data.mapsrc,
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
      {!isEnrollDetailsOpened ?
        <ModalContent>
          <ModalHeader>Workshop Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flexbox as="form" onSubmit={formik.handleSubmit}>
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
              <InputGroup>
                <InputLeftAddon>Google Map Link</InputLeftAddon>
                <Input name="mapsrc" type={"text"} onChange={formik.handleChange} value={formik.values.mapsrc} disabled={isUpdating} placeholder="string after 'https://www.google.com/maps/embed?'" isInvalid={!!formik.errors.mapsrc}/>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Capacity</InputLeftAddon>
                <Input name="capacity" type={"number"} onChange={formik.handleChange} value={formik.values.capacity} disabled={isUpdating} isInvalid={!!formik.errors.capacity}/>
              </InputGroup>
              <iframe src={`https://www.google.com/maps/embed?${formik.values.mapsrc}`} style={{border: 0, width: "100%", height: "30vh"}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              <button type="submit" style={{display: "none"}} ref={formButtonRef}/>
            </Flexbox>
          </ModalBody>
          <ModalFooter>
            {!!workshop && <>
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
              >Delete</Button>
            </>}
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
      : <ModalContent>
        <ModalHeader>Workshop Enroll Details</ModalHeader>
        <ModalBody>
          {!workshopConfidential
            ? <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
            : <Flexbox>
              <Text>Current/Capacity: {workshopConfidential.current}/{workshop.capacity}</Text>
              <TableContainer>
                <Table variant='simple'>
                  {/* <TableCaption>Workshop enrolled members details</TableCaption> */}
                  <Thead>
                    <Tr>
                      <Th>Last Name</Th>
                      <Th>First Name</Th>
                      <Th>Phone number</Th>
                      <Th>Email</Th>
                      <Th>Payment status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {workshopConfidential.enrolls.map(entity => <Tr key={entity.id}>
                      <Td>{entity.lastName}</Td>
                      <Td>{entity.firstName}</Td>
                      <Td>{entity.phone}</Td>
                      <Td>{entity.email}</Td>
                      <Td>{entity.paymentStatus}</Td>
                    </Tr>)}
                  </Tbody>
                  {/* <Tfoot>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Phone number</Th>
                      <Th>Email</Th>
                    </Tr>
                  </Tfoot> */}
                </Table>
              </TableContainer>
            </Flexbox>
          }
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={"blue"}
            onClick={() => setIsEnrollDetailsOpened(false)}
          >Back</Button>
        </ModalFooter>
      </ModalContent>
      }
    </Modal>
  );
}