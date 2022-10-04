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


type StyledPhoneVariants = Stitches.VariantProps<typeof StyledPhone>;

const StyledHeader = styled('h2', {
  fontFamily: '$firacode',
  fontWeight: 500,
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
    borderRight: '5px solid transparent'  // add 'padding' to the arrow
    // '-webkit-appearance': 'none',
    // appearance: 'none',
  },
  '& > select:hover': {
    cursor: 'pointer'
  }
});

const StyledFormText = styled('p', {
  color: '$gray600',
  fontWeight: 300,
  fontSize: '13px',
});

const StyledPhone = styled(motion.div, {
  flexbox: 'column',
  gap: '50px',
  alignItems: 'flex-start'
});

// See https://github.com/stitchesjs/stitches/discussions/213
interface Props extends React.ComponentProps<typeof StyledPhone> {
  submitPhone: (phone: string) => Promise<void>;  // resolves if validation success
  handleNext: () => void;
};

export const Phone: React.FC<Props> = ({ submitPhone, handleNext, ...props }) => {
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Auto focus to otp input when component render
  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      phone: ''
    },
    initialStatus: 'waiting',
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (data, { setStatus, setFieldError }) => {
      setStatus('loading');
      await submitPhone(`+852${data.phone}`)  // Hard code to HK, for now
        .then(() => {
          setStatus('next');
          handleNext();
        })
        .catch(err => {
          setFieldError('phone', 'Invalid');
        });
    },
    // validate: (values) => {
    //   const { success } = object({
    //     phone: string().regex(/^\d{8}$/)
    //   }).safeParse(values);
    //   if (!success)

    // },
    validationSchema: toFormikValidationSchema(
      object({ phone: string().regex(/^\d{8}$/) })
    )
  });

  useEffect(() : any => {
    // else if ((Object.keys(formik.values) as Array<keyof typeof formik.values>).every(field => formik.values[field] === formik.initialValues[field]))
    //   formik.setStatus('waiting');
    formik.setErrors({});

    if (!formik.dirty)
      formik.setStatus('waiting');

    else
      formik.setStatus('normal');

  }, [formik.values]);

  useEffect(() => {
    if (Object.keys(formik.errors).length > 0) {  // note that {} is truthy
      Logger.debug(formik.errors);
      formik.setStatus('error');
      phoneInputRef.current?.focus();
    }
  }, [formik.errors]);

  return (
    <StyledPhone {...props}>
      <StyledHeader>Login</StyledHeader>
      <StyledForm autoComplete="off" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <StyledInputGroup>
          {/* <HK className='country'/> */}
          <select>
            <option value="hk">+852</option>
          </select>
          <Input
            type="tel" name={'phone'} placeholder="Phone"
            onChange={formik.handleChange} value={formik.values.phone}
            ref={phoneInputRef}
            state={formik.status}
          />
        </StyledInputGroup>
        <StyledFormText className="support">Need help? <Link to="/support" style={'blue'} inline underline>Contact support</Link></StyledFormText>
        <Button type="submit" id='recaptcha-container'
          state={formik.status}
        >
          Verify
        </Button>
      </StyledForm>
    </StyledPhone>
  );
};