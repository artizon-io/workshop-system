import React, { useState, useEffect, useRef } from 'react';
import { keyframes, styled } from "@styleProvider";
import type * as Stitches from '@stitches/react';
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
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
  animationIterationCount: 'infinite'
});

const SpinnerIcon : React.FC = ({...props}) => {
  return (
    <StyledImSpinner {...props}/>
  )
}

const StyledButton = styled(motion.button, {
  fontFamily: '$firacode',
  fontWeight: 'lighter',
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
    },
    size: {
      's': {
        fontSize: '18px',
        borderRadius: '30px',
        padding: '20px 30px'
      },
      'm': {
        fontSize: '18px',
        borderRadius: '30px',
        padding: '20px 30px'
      },
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
      }
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
        backgroundColor: '$gray050',
        color: '$gray850',
        '&:hover': {
          backgroundColor: '$gray000',
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
  children: string;
};

export const Button: React.FC<Props> = ({ state, children, ...props }) => {
  return (
    <StyledButton state={state} layout {...props} disabled={state !== 'normal'}
      whileTap={{ scale: 0.97 }}
    >
      {
      state === 'error' ? <IoClose/> :
      state === 'loading' ? <SpinnerIcon/> :
      state === 'success' ? <IoCheckmarkSharp/> :
      children
      }
    </StyledButton>
  );
};