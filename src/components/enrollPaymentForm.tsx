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


export const EnrollPaymentForm: FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
  } = useFirebaseContext();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },
    // validate,
    onSubmit: async data => {
      setIsSubmitting(true);
      Logger.info("Data: ", data);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000",
        },
      });
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        Logger.error(error.message);
      } else {
        Logger.error(error.message);
      }
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe)
      return;

    // @ts-ignore
    stripe.retrievePaymentIntent(location.state.stripeClientSecret).then(({ paymentIntent }) => {
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
        default:
          Logger.info("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    // @ts-ignore
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
      <PaymentElement/>
      <Button colorScheme={'blue'} disabled={isSubmitting} type="submit">Pay</Button>
    </Flexbox>
  );
}