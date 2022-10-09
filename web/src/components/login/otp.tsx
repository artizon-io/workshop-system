import React, { useState, useEffect, useRef, ReactEventHandler } from "react";
import { Form, Formik, FormikProps, useFormik } from "formik";
import { toFormikValidationSchema } from "@artizon/zod-formik-adapter";
import { object, string, ZodString } from "zod";
import { styled } from "@styleProvider";
import type * as Stitches from '@stitches/react';
import { Button, StyledButtonVariants } from "../button";
import { Back } from "../back";
import { AnimatePresence, motion } from "framer-motion";
import Logger from "js-logger";
import { Input } from "@components/input";
import useLoginStore from "./states";


type StyledOTPVariants = Stitches.VariantProps<typeof StyledOTP>;

const StyledForm = styled('form', {
  flexbox: 'column',
  gap: '30px',
  alignItems: 'stretch'
});

const StyledHeader = styled('h2', {
  fontFamily: '$firacode',
  fontWeight: 400,
  fontSize: '22px'
});

const StyledSubheader = styled('p', {
  color: '$gray600',
  fontWeight: 300,
  fontSize: '14px',
  '& > em': {
    color: '$gray300',
    fontWeight: 400,
    fontFamily: '$firacode',
    fontSize: 'inherit',
    fontStyle: 'normal'
  },
});

const StyledBodyText = styled('p', {
  color: '$gray600',
  fontWeight: 300,
  fontSize: '13px'
});

const StyledInputGroup = styled('div', {
  flexbox: 'row',
  gap: '10px',
});

const StyledOTP = styled(motion.div, {
  flexbox: "column",
  alignItems: 'stretch',
  gap: '35px',
  [`& > ${Back}`]: {
    alignSelf: 'flex-start',
  },
});

interface Props extends React.ComponentProps<typeof StyledOTP> {
  submitOtp: (otp: string) => Promise<void>;
  submitPhone: (phone: string) => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
};

export const OTP: React.FC<Props> = ({ submitOtp, handleBack, submitPhone, ...props }) => {
  const [otpIndex, setOtpIndex] = useState(0);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const otpSubmitRef = useRef<HTMLButtonElement>(null);
  const phone = useLoginStore(state => state.phone);

  // Auto focus to otp input when component render
  useEffect(() => {
    otpInputRef.current?.focus();
  }, []);

  useEffect(() => {
    otpInputRef.current?.focus();
  }, [otpIndex]);

  const formik = useFormik({
    initialValues:
      [...Array(6).keys()]  // loop 6 times
        .reduce((acc, current) => {
          (acc as {[key: string]: string})[`otp${current+1}`] = '';
          return acc;
        },{}),
    initialStatus: 'waiting',
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (data, { setStatus, setFieldError, resetForm, setErrors }) => {
      setStatus('loading');

      Logger.debug('OTP', Object.values(data).join(''));

      await submitOtp(Object.values(data).join(''))
        .then(() => {
          setStatus('success');
        })
        .catch(err => {
          Logger.error(err);
          setErrors({otp: 'Invalid'});
        });
    },
    onReset: () => setOtpIndex(0),
    validationSchema: toFormikValidationSchema(
      object([...Array(6).keys()].reduce((acc, current) => {
        // Object.defineProperty(acc, `otp${current+1}`, {
        //   value: string().regex(/\d/)
        // });
        (acc as {[key: string]: ZodString})[`otp${current+1}`] = string().regex(/\d/);
        return acc;
      }, {}))
    )
  });

  useEffect(() : any => {
    formik.setErrors({});

    if ((Object.keys(formik.values) as Array<keyof typeof formik.values>).some(field => formik.values[field] === formik.initialValues[field]))
      formik.setStatus('waiting');
    else
      formik.setStatus('normal');

  }, [formik.values]);

  useEffect(() => {
    if (Object.keys(formik.errors).length > 0) {  // note that {} is truthy
      formik.setStatus('error');
      otpInputRef.current?.focus();
    }
  }, [formik.errors]);

  const otpInputOnChange = () => {
    // Just populated last otp input
    if (otpIndex === 5) {
      otpInputRef.current?.blur();  // Take off focus
      formik.submitForm();
    }

    // Just been populated, move forward
    if (otpInputRef.current?.value)
      setOtpIndex(index => Math.min(5, index+1));
  }

  useEffect(() => {
    otpInputOnChange();
  }, [formik.values]);

  // Always fire before onChange
  const otpInputOnKeydown : React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Backspace" || e.key === "Delete")
      // Just been removed, move back
      if (!e.currentTarget.value)
        setOtpIndex(index => Math.max(0, index-1));
  }

  return (
    <StyledOTP {...props}>
      <Back onClick={handleBack}/>
      <StyledHeader>Verification</StyledHeader>
      {/* Replace the last 4 char with * */}
      <StyledSubheader>An OTP has been sent to <em>{phone.replace(/.{4}$/, '****')}</em></StyledSubheader>
      <StyledForm autoComplete="off" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <StyledInputGroup>
          {[...Array(6).keys()].map(index =>
            <Input
              key={index} type="tel" name={`otp${index+1}`} placeholder="*"
              ref={otpIndex === index ? otpInputRef : null}
              onChange={formik.handleChange} value={(formik.values as {[key: string]: string})[`otp${index+1}`]}
              state={formik.status} size={'square'}
              onKeyDown={otpInputOnKeydown}
            />
          )}
        </StyledInputGroup>
        <StyledBodyText>Didn't receive the code? <Button onClick={e => submitPhone(phone)}>Resend</Button></StyledBodyText>
        <Button type="submit" state={formik.status}>Verify</Button>
      </StyledForm>
    </StyledOTP>
  );
};