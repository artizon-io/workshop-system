import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Heading, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import { Flexbox } from 'components/flexbox';
import Logger from 'js-logger';
import { useFormik } from 'formik';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getCookie } from 'utils/cookies';
import { domain } from 'config/appConfig';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { appLocation, firebaseConfig, functionsDomain } from 'config/firebaseConfig';


interface Props extends  React.HTMLAttributes<HTMLDivElement> {

}

export const EnrollPaymentForm: FC<Props> = ({ ...props }) => {
  const { enrollId, workshopId } = useParams();
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },
    validate: values => {
      const errors : any = {};
      if (!values.firstName) {
        errors.firstName = 'Required';
      }
    
      if (!values.lastName) {
        errors.lastName = 'Required';
      }
    
      if (!values.phone) {
        errors.phone = 'Required';
      }

      if (!values.email) {
        errors.email = 'Required';
      }
  
      return errors;
    },
    onSubmit: async data => {
      setIsSubmitting(true);
      Logger.info("Submitting form data:", data);
      
      axios
        .post(`${functionsDomain}/enroll`, {
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          email: formik.values.email,
          phone: '+852' + formik.values.phone,
          enrollId: enrollId,
          workshopId: workshopId
        })
        .then(res => {
          Logger.info(res);
        })
        .catch(err => {
          Logger.error(err);
        });

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${domain}/workshop/${workshopId}/enroll/${enrollId}/confirmation`,
          receipt_email: formik.values.email,
        },
        redirect: "if_required"
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

  const stripe = useStripe();
  const elements = useElements();
  
  // const cookie = useMemo(() => getCookie(), [document.cookie]);

  useEffect(() => {
    if (!stripe)
      return;

    if (!window.localStorage['stripeClientSecret'])
    // if (!cookie['stripeClientSecret'])
      throw Error('Stripe client secret token not present in site cookie');

    // stripe.retrievePaymentIntent(cookie['stripeClientSecret']).then(({ paymentIntent }) => {
    stripe.retrievePaymentIntent(window.localStorage['stripeClientSecret']).then(({ paymentIntent }) => {
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
    <Flexbox as="form" onSubmit={formik.handleSubmit}>
      <InputGroup>
        <InputLeftAddon>First Name</InputLeftAddon>
        <Input name="firstName" type={'text'} onChange={formik.handleChange} value={formik.values.firstName} disabled={isSubmitting} isInvalid={!!formik.errors.firstName}/>
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Last Name</InputLeftAddon>
        <Input name="lastName" type={"text"} onChange={formik.handleChange} value={formik.values.lastName} disabled={isSubmitting} isInvalid={!!formik.errors.lastName}/>
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