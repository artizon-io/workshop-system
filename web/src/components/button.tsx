import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { keyframes, styled } from "@styleProvider";
import type * as Stitches from '@stitches/react';
import { IoArrowForward, IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { motion } from 'framer-motion';


export type StyledButtonVariants = Stitches.VariantProps<typeof StyledButton>

const spinning = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '18%': { transform: 'rotate(90deg)' },
  '40%': { transform: 'rotate(180deg)' },
  '70%': { transform: 'rotate(270deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const StyledImSpinner = styled(ImSpinner8, {
  animation: `${spinning} 1000ms`,
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',

  fontSize: '22px'
});

const SpinnerIcon : React.FC = ({...props}) => {
  return (
    <StyledImSpinner {...props}/>
  )
}

const StyledButton = styled(motion.button, {
  flexbox: 'row',
  gap: '5px',

  fontFamily: '$firacode',
  fontWeight: 400,
  transition: 'background-color 0.2s, color 0.2s',
  variants: {
    'shadow': {
      true: {
        $$shadowColor: 'hsla(0, 0%, 30%, 15%)',
        boxShadow: '0 0 20px 3px $$shadowColor',
      },
      false: {}
    },
    style: {
      'gray': {},
      'blue': {},
      'red': {},
      'lightgray': {},
    },
    size: {
      's': {
        fontSize: '15px',
        borderRadius: '20px',
        padding: '12px 16px'
      },
      'm': {
        fontSize: '18px',
        borderRadius: '30px',
        padding: '20px 30px'
      },
      'round': {
        borderRadius: '50%',
        width: '50px',
        height: '50px'
      }
    },
    state: {
      'normal': {
        '&:hover': {
          cursor: 'pointer'
        }
      },
      'disabled': {
        backgroundColor: '$gray900',
        color: '$gray800',
        '&:hover': {
          cursor: 'not-allowed'
        },
      },
      'waiting': {
        backgroundColor: '$gray900',
        color: '$gray800',
        '&:hover': {
          cursor: 'not-allowed'
        },
      },
      'loading': {
        backgroundColor: '$gray000',
        color: '$gray950',
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
      'error': {
        backgroundColor: '$red500sss',
        color: '$gray950',
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
      'success': {
        backgroundColor: '$blue500sss',
        color: '$gray950',
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
      'next': {
        backgroundColor: '$gray000',
        color: '$gray950',
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
    },
    position: {
      'relative': {
        position: 'relative'
      },
      'absolute': {
        position: 'absolute'
      },
      'normal': {}
    }
  },
  compoundVariants: [
    {
      style: 'gray',
      state: 'normal',
      css: {
        backgroundColor: '$gray050',
        color: '$gray850',
        '&:hover': {
          backgroundColor: '$gray000',
          color: '$gray950',
        }
      }
    },
    {
      style: 'blue',
      state: 'normal',
      css: {
        backgroundColor: '$blue300',
        color: '$gray850',
        '&:hover': {
          backgroundColor: '$blue200',
          color: '$gray950',
        }
      }
    },
    {
      style: 'red',
      state: 'normal',
      css: {
        backgroundColor: '$red400',
        color: '$gray850',
        '&:hover': {
          backgroundColor: '$red300',
          color: '$gray950',
        }
      }
    },
    {
      style: 'lightgray',
      state: 'normal',
      css: {
        backgroundColor: '$gray700',
        color: '$gray850',
        '&:hover': {
          backgroundColor: '$gray600',
          color: '$gray950',
        }
      }
    },
  ],
  defaultVariants: {
    size: 'm',
    style: 'gray',
    state: 'normal'
  },
});

interface Props extends React.ComponentProps<typeof StyledButton> {
  state?: StyledButtonVariants['state'];
  // as?: React.Component;  // TODO
  // position?: CSSProperties['position'];
  position?: 'relative' | 'absolute' | 'normal';
};

export const Button: React.FC<Props> = React.forwardRef(({ state = 'normal', position = 'normal', children, ...props }, ref) => {
  return (
    <StyledButton state={state} {...props} disabled={state !== 'normal'} ref={ref} position={position}
      whileTap={{ scale: 0.97 }}
    >
      {
      state === 'error' ? <IoClose style={{ fontSize: '22px' }}/> :
      state === 'loading' ? <SpinnerIcon/> :
      state === 'next' ? <IoArrowForward style={{ fontSize: '22px' }}/> :
      state === 'success' ? <IoCheckmarkSharp style={{ fontSize: '22px' }}/> :
      children
      }
    </StyledButton>
  );
});