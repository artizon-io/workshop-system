import React, { useState, useEffect, useRef, ReactEventHandler } from "react";
import { Field, Form, Formik, FormikProps, useFormik } from "formik";
import { toFormikValidationSchema } from "@artizon/zod-formik-adapter";
import { object, string } from "zod";
import { styled } from "@styleProvider";
import type * as Stitches from '@stitches/react';
import { Button, StyledButtonVariants } from "../button";
import { Back } from "../back";
import { Input, StyledInputVariants } from "../input";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@components/link";
import Logger from "js-logger";
import useLoginStore from "./states";


type StyledPhoneVariants = Stitches.VariantProps<typeof StyledPhone>;

const StyledHeader = styled('h2', {
  fontFamily: '$firacode',
  fontWeight: 400,
  fontSize: '25px'
});

const StyledForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '25px'
});

const StyledInputGroup = styled('div', {
  display: 'flex',
  gap: '5px',
  '& > select': {
    backgroundColor: '$gray050',
    borderRadius: '12px',
    color: '$gray900',
    padding: '12px 8px',
    fontFamily: '$firacode',
    borderRight: '5px solid transparent',  // add 'padding' to the arrow
    // '-webkit-appearance': 'none',
    // '-moz-appearance': 'none',
    // 'appearance': 'none',
  },
  '& > select:hover': {
    cursor: 'pointer'
  }
});

const StyledFormText = styled('p', {
  color: '$gray600',
  fontWeight: 300,
  fontSize: '13px',
  fontStyle: 'normal'
});

const StyledPhone = styled(motion.div, {
  flexbox: 'column',
  gap: '50px',
  alignItems: 'flex-start'
});

const StyledButton = styled(Button, {
  // for hiding Recaptcha
  '& + span': { display: 'none' }
});


interface Props extends React.ComponentProps<typeof StyledPhone> {
  submitPhone: (phone: string) => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
};

export const Phone: React.FC<Props> = ({ submitPhone, handleNext, ...props }) => {
  const setPhone = useLoginStore(state => state.setPhone);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Auto focus to otp input when component render
  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      phone: '',
      country: '',
    },
    initialStatus: 'waiting',
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (data, { setStatus, setFieldError }) => {
      setStatus('loading');
      submitPhone(`${data.country}${data.phone}`)
        .then(() => {
          setStatus('next');
          handleNext();
        })
        .catch(err => {
          setFieldError('phone', 'Invalid phone number');
          setFieldError('country', 'Invalid phone number');
        });
    },
    // validate: (values) => {
    //   const { success } = object({
    //     phone: string().regex(/^\d{8}$/)
    //   }).safeParse(values);
    //   if (!success)
    // },
    validationSchema: () => toFormikValidationSchema(
      object({
        country: string().regex(/^\+\d+$/),
        phone: string().regex(/^\d{8}$/),
      })
    )
  });

  useEffect(() => {
    setPhone(`${formik.values.country}${formik.values.phone}`);
  }, [formik.values.phone, formik.values.country]);

  useEffect(() : any => {
    formik.setErrors({});

    // if (!formik.dirty)
    if (formik.values.phone === formik.initialValues.phone)
      formik.setStatus('waiting');
    else
      formik.setStatus('normal');

  }, [formik.values.phone]);

  useEffect(() => {
    if (Object.keys(formik.errors).length > 0) {  // note that {} is truthy
      formik.setStatus('error');
      phoneInputRef.current?.focus();
    }
  }, [formik.errors]);

  return (
    <StyledPhone {...props}>
      <StyledHeader>Login</StyledHeader>
      <StyledForm autoComplete="off" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <StyledInputGroup>
          <select name='country' onChange={formik.handleChange} value={formik.values.country}>
            <option value="" disabled>+</option>
            <option value="+852">+852</option>
            <option value="+44">+44</option>
            <option value="+1">+1</option>
            <option value="+86">+86</option>
          </select>
          <Input
            type="tel" name={'phone'} placeholder="Phone"
            onChange={formik.handleChange} value={formik.values.phone}
            ref={phoneInputRef}
            state={formik.status}
          />
        </StyledInputGroup>
        <StyledFormText>Need help? <Link to="/support" style={'blue'} inline underline>Contact support</Link></StyledFormText>
        <StyledButton type="submit" id='recaptcha-container' state={formik.status}>Verify</StyledButton>
      </StyledForm>
    </StyledPhone>
  );
};