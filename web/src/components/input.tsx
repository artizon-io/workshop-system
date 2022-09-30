import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

export type StyledInputVariants = Stitches.VariantProps<typeof StyledInput>

const StyledInput = styled('input', {
  borderRadius: '12px',
  fontFamily: '$firacode',
  padding: '12px 16px',
  border: '2px solid',
  '&::placeholder': {
    color: '$gray800',
    fontFamily: '$firacode'
  },
  variants: {
    state: {
      'normal': {
        borderColor: '$gray800',
        '&:focus': {
          borderColor: '$gray050',
        },
      },
      'disabled': {
        borderColor: '$gray800',
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
      'error': {
        borderColor: '$red700ss',
      }
    }
  },
  defaultVariants: {
    state: 'normal',
  },
});

interface Props extends React.ComponentProps<typeof StyledInput> {
  
};

export const Input: React.FC<Props> = React.forwardRef(({ state, ...props }, ref) => {
  return (
    <StyledInput state={state} {...props} ref={ref} disabled={state === 'disabled'}/>
  );
});