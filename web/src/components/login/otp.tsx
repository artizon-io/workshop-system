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

const StyledOTP = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  gap: '35px',
  // alignItems: 'center',
  '& > .header': {
    fontFamily: '$firacode',
    fontWeight: 500,
    fontSize: '22px'
  },
  '& > .notify': {
    color: '$gray600',
    fontWeight: 300,
    fontSize: '14px'
  },
  '& > .notify > em': {
    color: '$gray300',
    fontWeight: 400,
    fontFamily: '$firacode',
    fontSize: 'inherit',
    fontStyle: 'normal'
  },
  '& > form': {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    alignSelf: 'center'
  },
  '& > form > input': {
    border: '2px solid transparent',
    width: '50px',
    height: '50px',
    paddingLeft: '18px',
    backgroundColor: '$gray900',
    fontFamily: '$firacode',
    borderRadius: '8px',
    color: '$gray100',
  },
  '& > form > input::placeholder': {
    color: '$gray800',
  },
  '& > form > input:focus': {
    borderColor: '$gray050',
    color: '$gray050',
  },
  '& > .resend': {
    color: '$gray600',
    fontWeight: 300,
    fontSize: '13px'
  },
  '& > .resend > a': {
    color: '$blue500s',
    fontWeight: 400,
    textDecoration: 'underline',
    textDecorationColor: 'transparent',
    textUnderlineOffset: '3px',
    textDecorationThickness: '1px'
  },
  '& > .resend > a:hover': {
    cursor: 'pointer',
    textDecorationColor: '$blue500',
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
  const [buttonState, setButtonState] = useState<StyledButtonVariants['variant']>('disabled');

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
      <h3 className="header">Verification</h3>
      <p className="notify">An OTP has been sent to <em>91000000</em></p>
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
            <Form autoComplete="off">
              {[...Array(6).keys()].map(index =>
                <input key={index} type="tel" name={`otp${index+1}`} placeholder="*" ref={otpIndex === index ? otpInputRef : null} onChange={props.handleChange} disabled={otpIndex !== index} value={props.values[`otp${index+1}`]} onKeyDown={otpInputOnKeydown}/>
              )}
              <button type="submit" ref={otpSubmitRef} style={{display: 'none'}}>Verify</button>
            </Form>
          );
        }}
      </Formik>
      <p className="resend">Didn't receive the code? <a>Resend</a></p>
      <Button variant={buttonState}>Verify</Button>
    </StyledOTP>
  );
};