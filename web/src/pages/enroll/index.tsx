import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Heading, Input, InputGroup, InputLeftAddon, Spinner, Text } from '@chakra-ui/react';
import { Flexbox } from 'components/flexbox';
import { useParams } from 'react-router-dom';
import Logger from 'js-logger';
import { useWorkshopOnce } from 'hooks/useWorkshopOnce';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { stripePublic } from 'config/stripeConfig';
import { EnrollPaymentForm } from './enrollPaymentForm';
import { getCookie, setCookie } from 'utils/cookies';
import { Layout } from 'layout/layout';
import { EnrollSummary } from './enrollSummary';


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

  // const {
  //   stripeClientSecret
  // } = useStripeContext();

  // const cookie = useMemo(() => getCookie(), [document.cookie]);
  // useEffect(() => {
  //   Logger.debug(cookie);
  // }, [cookie]);

  if (!window.localStorage['stripeClientSecret'])
  // if (!cookie['stripeClientSecret'])
  // if (!stripeClientSecret)
    return (
      <Text>You do not have access to this page</Text>
    );

  return (
    <Layout>
      <StyledHome {...props}>
        <Elements stripe={stripePromise} options={{
            // clientSecret: cookie['stripeClientSecret'],
            // clientSecret: window.localStorage['stripeClientSecret'],
            clientSecret: window.localStorage['stripeClientSecret']
          }}
        >
          <EnrollPaymentForm/>
        </Elements>
        <EnrollSummary/>
      </StyledHome>
    </Layout>
  );
}