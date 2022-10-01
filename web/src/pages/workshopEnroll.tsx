import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import { redirect, useParams } from 'react-router-dom';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { IconText } from '@components/iconText';
import { MdAttachMoney, MdDateRange } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import Logger from 'js-logger';

type StyledWorkshopEnrollVariants = Stitches.VariantProps<typeof StyledWorkshopEnroll>

const StyledPaymentForm = styled(motion.div, {

});

const PaymentForm: React.FC<React.ComponentProps<typeof StyledPaymentForm>> = ({ ...props }) => {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) return;

    stripe.retrievePaymentIntent(window.localStorage['stripeClientSecret']).then(({ paymentIntent }) => {
      if (!paymentIntent) return;

      switch (paymentIntent.status) {
        case "succeeded":
          Logger.info("Payment succeeded!");
          break;
        case "processing":
          Logger.info("Your payment is processing.");
          break;
        case "requires_payment_method":
          Logger.info("Your payment was not successful, please try again.");
          break;
        case "requires_capture":
          Logger.info("");
          break;
        case "requires_confirmation":
          Logger.info("");
          break;
        case "requires_action":
          Logger.info("");
          break;
        default:
          Logger.error("Unknown paymentIntention status received:", paymentIntent.status);
          break;
      }
    });
  }, [stripe]);

  return (
    <StyledPaymentForm>
      <PaymentElement/>
    </StyledPaymentForm>
  );
}

const StyledWorkshopOverviewHeader = styled(motion.div, {
  fontFamily: '$firacode',
  fontSize: '20px',
  color: '$gray050',
  fontWeight: 400
});

const StyledWorkshopOverviewBody = styled(motion.div, {
  flexbox: 'column',
  gap: '10px',
  alignItems: 'flex-start'
});

const StyledWorkshopOverview = styled(motion.div, {
  flexbox: 'column',
  borderRadius: '30px',
});

const WorkshopOverview: React.FC<React.ComponentProps<typeof StyledPaymentForm>> = ({ ...props }) => {
  return (
    <StyledWorkshopOverview>
      <StyledWorkshopOverviewHeader>Workshop Title</StyledWorkshopOverviewHeader>
      <StyledWorkshopOverviewBody>
        <IconText>
          <MdDateRange style={{ fontSize: '17px' }}/>
          21/Jul
        </IconText>
        <IconText>
          <BiTime style={{ fontSize: '18px' }}/>
          09:00am
        </IconText>
        <IconText>
          <MdAttachMoney style={{ fontSize: '20px' }}/>
          HKD 200
        </IconText>
      </StyledWorkshopOverviewBody>
    </StyledWorkshopOverview>
  );
}

const StyledWorkshopEnroll = styled('main', {
  
});

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  import.meta.env.DEV
    ? import.meta.env.VITE_STRIPE_API_TEST_KEY
    : import.meta.env.VITE_STRIPE_API_KEY
);

interface Props extends React.ComponentProps<typeof StyledWorkshopEnroll> {
  
};

const WorkshopEnroll: React.FC<Props> = ({ ...props }) => {
  const params = useParams();

  useEffect(() => {
    if (!window.localStorage['stripeClientSecret'])
      redirect('/error');
  }, []);

  return (
    <StyledWorkshopEnroll {...props}>
      <Elements stripe={stripePromise} options={{
        clientSecret: window.localStorage['stripeClientSecret']
      }}>
        <PaymentForm/>
        <WorkshopOverview/>
      </Elements>
    </StyledWorkshopEnroll>
  );
};

export default WorkshopEnroll;