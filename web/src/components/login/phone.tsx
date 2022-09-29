import React, { useState, useEffect, useRef, ReactEventHandler } from "react";
import { Field, Form, Formik, FormikProps, useFormik } from "formik";
import { toFormikValidationSchema } from "@artizon/zod-formik-adapter";
import { object, string } from "zod";
import { styled } from "@styleProvider";
import type * as Stitches from '@stitches/react';
import { Button, StyledButtonVariants } from "../button";
import { Back } from "../back";
// import { HK } from 'country-flag-icons/react/3x2'
import { Input, StyledInputVariants } from "./input";
import { AnimatePresence, motion } from "framer-motion";


type StyledPhoneVariants = Stitches.VariantProps<typeof StyledPhone>;

const StyledPhone = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  gap: '50px',
  // alignItems: 'center',
  '& > .header': {
    fontFamily: '$firacode',
    fontWeight: 500,
    fontSize: '25px'
  },
  '& > form': {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  '& > form > div': {
    display: 'flex',
    gap: '5px'
  },
  '& > form > div > .country': {
    backgroundColor: '$gray050',
    borderRadius: '12px',
    color: '$gray900',
    padding: '12px 8px',
    fontFamily: '$firacode',
    borderRight: '5px solid transparent'  // add 'padding' to the arrow
    // '-webkit-appearance': 'none',
    // appearance: 'none',
  },
  '& > form > .support': {
    color: '$gray600',
    fontWeight: 300,
    fontSize: '13px'
  },
  '& > form > .support > a': {
    color: '$blue500s',
    fontWeight: 400,
    textDecoration: 'underline',
    textDecorationColor: 'transparent',
    textUnderlineOffset: '3px',
    textDecorationThickness: '1px'
  },
  '& > form > .support > a:hover': {
    cursor: 'pointer',
    textDecorationColor: '$blue500',
  },
});

// See https://github.com/stitchesjs/stitches/discussions/213
interface Props extends React.ComponentProps<typeof StyledPhone> {
  submitPhone: (phone: string) => Promise<void>;  // resolves if validation success
  handleNext: () => void;
};

export const Phone: React.FC<Props> = ({ submitPhone, handleNext, ...props }) => {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [buttonState, setButtonState] = useState<StyledButtonVariants['variant']>('disabled');
  const [phoneInputState, setPhoneInputState] = useState<StyledInputVariants['variant']>('normal');

  // Auto focus to otp input when component render
  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  useEffect(() => {
    // console.debug('React to Button State Change');
    switch(buttonState) {
      case 'normal':
        setPhoneInputState('normal');
        break;
      case 'loading':
        setPhoneInputState('disabled');
        break;
      case 'error':
        setPhoneInputState('error');
        // TODO: figure out how event queue and react works
        queueMicrotask(() => phoneInputRef.current?.focus());
        break;
    }
  }, [buttonState]);

  const phoneInputOnChange : ReactEventHandler<HTMLInputElement> = (e) => {
    // Just became empty
    if (e.currentTarget.value === '') {
      setButtonState('disabled')
    }

    // Just been populated
    else if (buttonState === 'disabled' || buttonState === 'error') {
      if (e.currentTarget.value !== '')
        setButtonState('normal');
    }
  }

  return (
    <StyledPhone {...props}>
      <h3 className="header">Login</h3>
      <Formik
        initialValues={{
          phone: ''
        }}
        onSubmit={async data => {
          setButtonState('loading');
          // Logger.debug('Formik otp data', data);
          const { success } = object({ phone: string().regex(/^\d{8}$/) }).safeParse(data);
          if (!success)
            return setButtonState('error');

          await submitPhone(`+852${data.phone}`)  // Hard code to HK, for now
            .then(() => {
              handleNext();
            })
            .catch(_err => {
              setButtonState('error');
            });
        }}
        // Useful if validationOnChange & validationOnBlur, but not for our usecase
        // validationSchema={toFormikValidationSchema(
        //   object({ phone: string().regex(/\d{8}/) })
        // )}
      >
        {props => {
          const formikHandleChange = props.handleChange;
          props.handleChange = (e: React.ChangeEvent<any>) => {
            phoneInputOnChange(e);
            formikHandleChange(e);
          };
          return (
            <Form autoComplete="off">
              <div>
                {/* <HK className='country'/> */}
                <select className='country'>
                  <option value="hk">+852</option>
                </select>
                <Input type="tel" name={'phone'} placeholder="Phone" ref={phoneInputRef} onChange={props.handleChange} value={props.values.phone} variant={phoneInputState} />
              </div>
              <p className="support">Need help? <a>Contact support</a></p>
              <Button type="submit" variant={buttonState} id='recaptcha-container'>Verify</Button>
            </Form>
          );
        }}
      </Formik>
    </StyledPhone>
  );
};