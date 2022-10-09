import React, { useState, useEffect, useRef, HTMLProps } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Phone } from './phone';
import { OTP } from './otp';
import { AnimatePresence, motion, MotionAdvancedProps, MotionConfigProps, useAnimationControls, Variants } from 'framer-motion';
import LockIcon from './lockicon';

type StyledLoginVariants = Stitches.VariantProps<typeof StyledLogin>

const StyledLogin = styled(motion.div, {
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: '$gray950',
  '@bp4': {
    padding: '100px',
    width: '500px',
    height: '500px',
  },
  '@bp1': {
    padding: '30px',
    width: '95vw',
    height: '500px',
  },
  flexbox: 'column',
  '& > .lock-icon': {
    position: 'absolute',
    top: '28px',
    right: '23px',
  },
});

type Direction = 'l' | 'r';

const variants : Variants = {
  initial: {
    opacity: 0,
    y: -30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.3 },
      y: { duration: 0.3, ease: 'easeOut' }
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      // delay: 0.8,  // TODO: dynamic exit depending on if it is successful login?
      opacity: { duration: 0.3 },
      y: { duration: 0.3, ease: 'easeIn' }
    }
  }
};

const distance = 30;

const stageVariants : Variants = {
  initial: (direction: Direction) => ({
    x: direction === 'r' ? -distance : distance,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { ease: 'easeOut', duration: 0.3 },
      opacity: { duration: 0.15 }
    }
  },
  exit: (direction: Direction) => ({
    x: direction === 'r' ? distance : -distance,
    opacity: 0,
    transition: {
      x: { ease: 'easeIn', duration: 0.3 },
      opacity: { duration: 0.15 }
    }
  }),
};

interface Props extends React.ComponentProps<typeof StyledLogin> {
  submitPhone: (phone: string) => Promise<void>;  // resolves if validation success
  submitOtp: (otp: string) => Promise<void>;
};

const Login: React.FC<Props> = ({ submitPhone, submitOtp, ...props }) => {
  const [stage, setStage] = useState(1);
  const [direction, setDirection] = useState<Direction>('r');

  const stageProps = {
    handleNext: () => {
      setDirection('r');
      setStage(val => val+1);
    },
    handleBack: () => {
      setDirection('l');
      setStage(val => val-1);
    },
    variants: stageVariants,
    custom: direction,
    initial: "initial", animate: "animate", exit: "exit"
  };

  const renderStage = () => {
    switch(stage) {
      case 1:
        return <Phone submitPhone={submitPhone} key='phone' {...stageProps}/>
      case 2:
        return <OTP submitOtp={submitOtp} submitPhone={submitPhone} key='otp' {...stageProps}/>
    }
  }

  return (
    <StyledLogin {...props}
      variants={variants} initial="initial" animate="animate" exit="exit"
    >
      <LockIcon/>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        {renderStage()}
      </AnimatePresence>
    </StyledLogin>
  );
};

export default Login;