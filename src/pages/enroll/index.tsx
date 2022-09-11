import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Heading, Input, InputGroup, InputLeftAddon, Spinner, Text } from '@chakra-ui/react';
import { Flexbox } from 'components/flexbox';
import { useParams } from 'react-router-dom';
import Logger from 'js-logger';
import { useWorkshop } from 'hooks/useWorkshop';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { stripePublic } from 'config/stripeConfig';
import { EnrollPaymentForm } from './enrollPaymentForm';
import { getCookie, setCookie } from 'utils/cookies';
import { Layout } from 'layout/layout';
import { useStripeContext } from 'hooks/useStripeContext';


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

export const Enroll: FC<{}> = ({ ...props }) => {
  const { enrollId, workshopId } = useParams();
  const workshop = useWorkshop(workshopId);
  const [isLoading, setIsLoading] = useState(true);

  // const {
  //   stripeClientSecret
  // } = useStripeContext();

  // const cookie = useMemo(() => getCookie(), [document.cookie]);
  // useEffect(() => {
  //   Logger.debug(cookie);
  // }, [cookie]);

  useEffect(() => {
    
    setIsLoading(false);
  }, []);

  if (!window.localStorage['stripeClientSecret'])
  // if (!cookie['stripeClientSecret'])
  // if (!stripeClientSecret)
    return (
      <Text>You do not have access to this page</Text>
    );

  return (
    isLoading
      ? <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />
      : <Layout>
        <StyledHome {...props}>
          <Elements stripe={stripePromise} options={{
              // clientSecret: cookie['stripeClientSecret'],
              // clientSecret: window.localStorage['stripeClientSecret'],
              clientSecret: window.localStorage['stripeClientSecret']
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
      </Layout>
  );
}