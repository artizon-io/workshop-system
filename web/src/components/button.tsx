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

const StyledButton = styled(motion.button, {
  '& > .spinner': {
    animation: `${spinning} 1000ms`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  variants: {
    style: {
      'next': {
        fontFamily: '$firacode',
        fontWeight: 'lighter',
        $$shadowColor: 'hsla(0, 0%, 30%, 15%)',
        boxShadow: '0 0 20px 3px $$shadowColor',
        transition: 'background-color 0.2s, color 0.2s',
      },
    },
    size: {
      'm': {
        fontSize: '18px',
        borderRadius: '30px',
        padding: '20px 30px'
      },
    },
    variant: {
      'normal': {
        '&:hover': {
          cursor: 'pointer'
        }
      },
      'disabled': {
        '&:hover': {
          cursor: 'not-allowed'
        },
      },
      'loading': {
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
      'error': {
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
      'success': {
        '&:hover': {
          cursor: 'not-allowed'
        }
      }
    }
  },
  defaultVariants: {
    size: 'm',
    style: 'next',
    variant: 'normal'
  },
  compoundVariants: [
    {
      style: 'next',
      variant: 'normal',
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
      style: 'next',
      variant: 'disabled',
      css: {
        backgroundColor: '$gray900',
        color: '$gray800',
      }
    },
    {
      style: 'next',
      variant: 'loading',
      css: {
        backgroundColor: '$gray000',
        color: '$gray950',
      }
    },
    {
      style: 'next',
      variant: 'error',
      css: {
        backgroundColor: '$red500sss',
        color: '$gray950',
      }
    },
    {
      style: 'next',
      variant: 'success',
      css: {
        backgroundColor: '$blue500sss',
        color: '$gray950',
      }
    },
  ],
});

interface Props extends React.ComponentProps<typeof StyledButton> {
  children: string;
};

export const Button: React.FC<Props> = ({ variant, children, ...props }) => {
  return (
    <StyledButton variant={variant} layout {...props} disabled={variant !== 'normal'}
      whileTap={{ scale: 0.97 }}
    >
      {
      variant === 'error' ? <IoClose/> :
      variant === 'loading' ? <ImSpinner8 className='spinner'/> :
      variant === 'success' ? <IoCheckmarkSharp/> :
      children
      }
    </StyledButton>
  );
};