import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Heading, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import { Flexbox } from 'components/flexbox';
import { useParams } from 'react-router-dom';
import Logger from 'js-logger';
import { useWorkshop } from 'hooks/useWorkshop';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { stripePublic } from 'config/stripeConfig';
import { EnrollPaymentForm } from './enrollPaymentForm';
import { getCookies } from 'utils/cookies';
import { Layout } from 'layout/layout';


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
  const cookies = useMemo(() => getCookies(), [document.cookie]);

  if (!cookies['stripeClientSecret'])
    return (
      <Heading fontWeight={'medium'}>You do not have access to this page</Heading>
    );

  return (
    <Layout>
      <StyledHome {...props}>
        <Elements stripe={stripePromise} options={{
            clientSecret: cookies['stripeClientSecret'],
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