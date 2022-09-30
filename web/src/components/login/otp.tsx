import React, { useState, useEffect, useRef, ReactEventHandler } from "react";
import { Form, Formik, FormikProps, useFormik } from "formik";
import { toFormikValidationSchema } from "@artizon/zod-formik-adapter";
import { object, string } from "zod";
import { styled } from "@styleProvider";
import type * as Stitches from '@stitches/react';
import { Button, StyledButtonVariants } from "../button";
import { Back } from "../back";
import { AnimatePresence, motion } from "framer-motion";


type StyledOTPVariants = Stitches.VariantProps<typeof StyledOTP>;

const StyledForm = styled(Form, {
  flexbox: 'row',
  gap: '10px',
});

const StyledOTPInput = styled('input', {
  border: '2px solid transparent',
  width: '50px',
  height: '50px',
  paddingLeft: '18px',
  backgroundColor: '$gray900',
  fontFamily: '$firacode',
  borderRadius: '8px',
  color: '$gray100',
  '&::placeholder': {
    color: '$gray800',
  },
  '&:focus': {
    borderColor: '$gray050',
    color: '$gray050',
  },
});

const StyledHeader = styled('h2', {
  fontFamily: '$firacode',
  fontWeight: 500,
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
  fontSize: '13px',
  '& > a': {
    color: '$blue500s',
    fontWeight: 400,
    underline: "",
    textDecorationColor: 'transparent',
  },
  '& > a:hover': {
    cursor: 'pointer',
    textDecorationColor: '$blue500',
  },
});

const StyledOTP = styled(motion.div, {
  flexbox: "column",
  alignItems: 'stretch',
  gap: '35px',
  [`& ${Back}`]: {
    alignSelf: 'flex-start',
  },
});

// See https://github.com/stitchesjs/stitches/discussions/213
interface Props extends React.ComponentProps<typeof StyledOTP> {
  submitOtp: (otp: string) => Promise<void>;
  handleBack: React.MouseEventHandler<HTMLAnchorElement>;
};

export const OTP: React.FC<Props> = ({ submitOtp, handleBack, ...props }) => {
  const [otpIndex, setOtpIndex] = useState(0);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const otpSubmitRef = useRef<HTMLButtonElement>(null);
  const [buttonState, setButtonState] = useState<StyledButtonVariants['state']>('disabled');

  // Auto focus to otp input when component render
  useEffect(() => {
    otpInputRef.current?.focus();
  }, []);

  useEffect(() => {
    // console.debug("otpIndex", otpIndex);
    otpInputRef.current?.focus();
  }, [otpIndex]);

  // useEffect(() => {
  //   Logger.debug(buttonState);
  // }, [buttonState])

  const otpInputOnChange : ReactEventHandler<HTMLInputElement> = (e) => {
    // Logger.debug("Trigger input change");
    // Just populated last otp input
    if (otpIndex === 5) {
      otpSubmitRef.current?.click();
      otpInputRef.current?.blur();
    }

    // Just been populated, move forward
    if (e.currentTarget.value) {
      if (buttonState === 'error')
        setButtonState('disabled');
      setOtpIndex(index => Math.min(5, index+1));
    }
  }

  // Always fire before onChange
  const otpInputOnKeydown : React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // Logger.debug("Trigger keydown");
    if (e.key === "Backspace" || e.key === "Delete")
      // Just been removed, move back
      if (!e.currentTarget.value)
        setOtpIndex(index => Math.max(0, index-1));
  }

  return (
    <StyledOTP {...props}>
      <Back onClick={handleBack}/>
      <StyledHeader>Verification</StyledHeader>
      <StyledSubheader>An OTP has been sent to <em>91000000</em></StyledSubheader>
      <Formik
        initialValues={
          [...Array(6).keys()].reduce(
            (acc, current) => {
              // @ts-ignore
              acc[`otp${current+1}`] = '';
              return acc;
            },
            {}
          )
        }
        onSubmit={async (data : {[k: string] : string}, {
          resetForm
        }) => {
          setButtonState('loading');
          // Logger.debug('Formik otp data', data);
          console.debug('OTP', Object.values(data).join(''));
          await submitOtp(Object.values(data).join(''))
            .then(() => {
              setButtonState('success');
            })
            .catch(_err => {
              setButtonState('error');
              resetForm();
              setOtpIndex(0);
            });
        }}
        // Not strictly necessary
        // validationSchema={toFormikValidationSchema(
        //   object([...Array(6).keys()].reduce(
        //     (acc, current) => {
        //       // @ts-ignore
        //       acc[`otp${current+1}`] = string().regex(/\d/);
        //       return acc;
        //     },
        //     {}
        //   ))
        // )}
      >
        {(props : FormikProps<{[k: string]: string}>) => {
          const formikHandleChange = props.handleChange;
          props.handleChange = (e: React.ChangeEvent<any>) => {
            otpInputOnChange(e);
            formikHandleChange(e);
          };
          return (
            <StyledForm autoComplete="off">
              {[...Array(6).keys()].map(index =>
                <StyledOTPInput key={index} type="tel" name={`otp${index+1}`} placeholder="*" ref={otpIndex === index ? otpInputRef : null} onChange={props.handleChange} disabled={otpIndex !== index} value={props.values[`otp${index+1}`]} onKeyDown={otpInputOnKeydown}/>
              )}
              <button type="submit" ref={otpSubmitRef} style={{display: 'none'}}>Verify</button>
            </StyledForm>
          );
        }}
      </Formik>
      <StyledBodyText className="resend">Didn't receive the code? <a>Resend</a></StyledBodyText>
      <Button state={buttonState}>Verify</Button>
    </StyledOTP>
  );
};