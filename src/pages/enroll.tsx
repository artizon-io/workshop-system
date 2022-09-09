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
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { stripePublic } from '../stripeConfig';
import { useLocation } from 'react-router-dom';
import { EnrollPaymentForm } from '../components/enrollPaymentForm';


const StyledHome = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
`;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(stripePublic);

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

  const workshop = useWorkshop(workshopId);

  const location = useLocation();

  useEffect(() => {
    // TODO: check if enrollId is valid
  }, []);

  return (
    <StyledHome {...props}>
      <Elements stripe={stripePromise} options={{
          // @ts-ignore
          clientSecret: location.state.stripeClientSecret,
        }}
      >
       <EnrollPaymentForm/>
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
      </Elements>
    </StyledHome>
  );
}