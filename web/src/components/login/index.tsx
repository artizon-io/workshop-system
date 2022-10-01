import React, { useState, useEffect, useRef, HTMLProps } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Phone } from './phone';
import { OTP } from './otp';
import { AnimatePresence, motion, MotionAdvancedProps, MotionConfigProps, useAnimationControls, Variants } from 'framer-motion';

type StyledLoginVariants = Stitches.VariantProps<typeof StyledLogin>

const StyledLockIcon = styled('div', {
  width: "23px",
  height: "23px",
  color: '$gray800',
});

const LockIcon : React.FC<React.ComponentProps<typeof StyledLockIcon>> = ({...props}) => {
  return (
    <StyledLockIcon {...props} className="lock-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M6 8V7a6 6 0 1 1 12 0v1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2zm13 2H5v10h14V10zm-8 5.732a2 2 0 1 1 2 0V18h-2v-2.268zM8 8h8V7a4 4 0 1 0-8 0v1z"
          fill="currentColor"
        />
      </svg>
    </StyledLockIcon>
  );
}

LockIcon.toString = () => '.lock-icon';

const StyledLogin = styled(motion.div, {
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: '$gray950',
  padding: '100px',
  width: '500px',
  height: '500px',
  flexbox: 'column',
  [`& > ${LockIcon}`]: {
    position: 'absolute',
    top: '28px',
    right: '23px',
  },
});

type Direction = 'l' | 'r';

const variants : Variants = {
  initial: ({direction, isStart}: {
    direction: Direction;
    isStart: boolean
  }) => {
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

interface Props extends React.ComponentProps<typeof StyledLogin> {
  submitPhone: (phone: string) => Promise<void>;  // resolves if validation success
  submitOtp: (otp: string) => Promise<void>;
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
        transition: {
          opacity: {
            duration: 0.3
          },
          y: {
            duration: 0.3,
            ease: 'easeOut'
          }
        }
      }}
      exit={{
        opacity: 0,
        y: -30,
        transition: {
          delay: 0.8,
          opacity: {
            duration: 0.3
          },
          y: {
            duration: 0.3,
            ease: 'easeIn'
          }
        }
      }}
    >
      <LockIcon/>
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