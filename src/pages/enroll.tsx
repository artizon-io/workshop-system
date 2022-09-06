import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { Button, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import { Nav } from '../components/nav';
import { Footer } from '../components/footer';
import { getDocs, getDoc, getDocFromServer, getDocsFromServer, collection, Timestamp } from 'firebase/firestore';
import { Flexbox } from '../components/flexbox';
import { Workshop, WorkshopType } from '../components/workshop';
import { WorkshopList } from '../components/workshopList';
import { useWorkshops } from '../hooks/useWorkshops';
import { useParams } from 'react-router-dom';
import Logger from 'js-logger';
import { useFormik } from 'formik';
import { useWorkshop } from '../hooks/useWorkshop';


const StyledHome = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
`;


export const Enroll: FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
  } = useFirebaseContext();

  const { enrollId, workshopId } = useParams();
  useEffect(() => {
    Logger.log(enrollId);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },
    // validate,
    onSubmit: data => {
      setIsSubmitting(true);
      Logger.info("Data: ", data);
    },
  });

  const workshop = useWorkshop(workshopId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // TODO: check if enrollId is valid
  }, []);

  return (
    <StyledHome {...props}>
      {/* @ts-ignore */}
      <Flexbox as="form" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <InputLeftAddon>First Name</InputLeftAddon>
          <Input name="first-name" type={"text"} onChange={formik.handleChange} value={formik.values.firstName} disabled={isSubmitting} isInvalid={!!formik.errors.firstName}/>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Last Name</InputLeftAddon>
          <Input name="last-name" type={"text"} onChange={formik.handleChange} value={formik.values.firstName} disabled={isSubmitting} isInvalid={!!formik.errors.firstName}/>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Phone Number</InputLeftAddon>
          <Input name="phone" type={"tel"} onChange={formik.handleChange} value={formik.values.phone} disabled={isSubmitting} isInvalid={!!formik.errors.phone}/>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Email Address</InputLeftAddon>
          <Input name="email" type={"email"} onChange={formik.handleChange} value={formik.values.email} disabled={isSubmitting} isInvalid={!!formik.errors.email}/>
        </InputGroup>
        <Button colorScheme={'blue'} disabled={isSubmitting} type="submit">Pay</Button>
      </Flexbox>
      {!!workshop &&
        <Flexbox>
          <Text>{workshop.title}</Text>
          <Text>Description: {workshop.description}</Text>
          <Text>Date: {workshop.datetime.toDate().toLocaleDateString()}</Text>
          <Text>Time: {workshop.datetime.toDate().toLocaleTimeString()}</Text>
          <Text>Duration: {workshop.duration} mins</Text>
          <Text>Language: {workshop.language}</Text>
          <Text>Capacity: {workshop.capacity}</Text>
          <Text>Fee: HKD {workshop.fee}</Text>
          <Text>Venue: {workshop.venue}</Text>
        </Flexbox>
      }
    </StyledHome>
  );
}