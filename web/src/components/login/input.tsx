import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

export type StyledInputVariants = Stitches.VariantProps<typeof StyledInput>

const StyledInput = styled('input', {
  variants: {
    style: {
      'next': {  
        color: '$gray700',
        borderRadius: '12px',
        fontFamily: '$inter',
        padding: '12px 16px',
        border: '2px solid',
        transition: 'border-color .2s',
        '&:focus': {
          color: '$gray050',
        },
        '&::placeholder': {
          color: '$gray800',
        },
      }
    },
    size: {
      'square': {

      },
      'long': {
        width: '100%',
      }
    },
    variant: {
      'normal': {
        
      },
      'disabled': {
        
      },
      'error': {

      }
    }
  },
  defaultVariants: {
    style: 'next',
    variant: 'normal',
    size: 'long'
  },
  compoundVariants: [
    {
      style: 'next',
      variant: 'normal',
      css: {
        borderColor: '$gray700',
        '&:focus': {
          borderColor: '$gray050',
        },
      }
    },
    {
      style: 'next',
      variant: 'disabled',
      css: {
        borderColor: '$gray700',
      }
    },
    {
      style: 'next',
      variant: 'error',
      css: {
        borderColor: '$red500sss',
      }
    }
  ]
});

interface Props extends React.ComponentProps<typeof StyledInput> {
  
};

export const Input: React.FC<Props> = React.forwardRef(({ variant, ...props }, ref) => {
  return (
    <StyledInput variant={variant} {...props} ref={ref} disabled={variant === 'disabled'}/>
  );
});