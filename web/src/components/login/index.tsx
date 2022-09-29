import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Phone } from './phone';
import { OTP } from './otp';
import { AnimatePresence, motion, MotionAdvancedProps, MotionConfigProps, useAnimationControls, Variants } from 'framer-motion';

type StyledLoginVariants = Stitches.VariantProps<typeof StyledLogin>

const StyledLogin = styled(motion.div, {
  borderRadius: '25px',
  backgroundColor: '$gray950',
  padding: '100px',
  width: '500px',
  height: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

interface Props extends React.ComponentProps<typeof StyledLogin> {
  submitPhone: (phone: string) => Promise<void>;  // resolves if validation success
  submitOtp: (otp: string) => Promise<void>;
};

type Direction = 'l' | 'r';

const variants : Variants = {
  initial: ({direction, isStart}: {
    direction: Direction;
    isStart: boolean
  }) => {
    // return isStart
    // ? {
    //   x: 0,
    //   opacity: 0
    // }
    // : {
    return {
      x: direction === 'r' ? -50 : 50,
      opacity: 0,
    }
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: {
        ease: 'easeOut',
        duration: 0.3
      },
      opacity: {
        duration: 0.15
      }
    }
  },
  exit: ({direction, isStart}: {
    direction: Direction;
    isStart: boolean;
  }) => ({
    x: direction === 'r' ? 50 : -50,
    opacity: 0,
    transition: {
      x: {
        ease: 'easeIn',
        duration: 0.3
      },
      opacity: {
        duration: 0.15
      }
    }
  }),
};

const Login: React.FC<Props> = ({ submitPhone, submitOtp, ...props }) => {
  const [stage, setStage] = useState<'phone' | 'otp'>('phone');
  const [direction, setDirection] = useState<Direction>('r');
  const [isStart, setIsStart] = useState(true);

  useEffect(() => {
    setIsStart(false);
  }, [stage]);

  return (
    <StyledLogin {...props}
      initial={{
        opacity: 0,
        y: -30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        opacity: {
          duration: 0.3
        },
        y: {
          duration: 0.3,
          ease: 'easeOut'
        }
      }}
    >
      <AnimatePresence mode="wait" custom={{direction, isStart}} initial={false}>
        {stage === 'phone'
        ? <Phone submitPhone={submitPhone} handleNext={() => { setDirection('r'); setStage('otp'); }}
          key='phone'
          variants={variants}
          custom={{direction, isStart}}
          initial="initial"
          animate="animate"
          exit="exit"
          />
        : <OTP submitOtp={submitOtp} handleBack={() => { setDirection('l'); setStage('phone'); }}
          key='otp'
          variants={variants}
          custom={{direction, isStart}}
          initial="initial"
          animate="animate"
          exit="exit"
          />
        }
      </AnimatePresence>
    </StyledLogin>
  );
};

export default Login;