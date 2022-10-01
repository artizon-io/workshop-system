import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

export type StyledInputVariants = Stitches.VariantProps<typeof StyledInput>

const StyledInput = styled('input', {
  fontFamily: '$firacode',
  border: '2px solid',
  '&::placeholder': {
    color: '$gray800',
    fontFamily: '$firacode'
  },
  variants: {
    size: {
      'm': {
        borderRadius: '12px',
        padding: '12px 16px',
      },
      'square': {
        width: '50px',
        height: '50px',
        paddingLeft: '18px',
        borderRadius: '8px',
      }
    },
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
      'waiting': {
        borderColor: '$gray800',
        '&:focus': {
          borderColor: '$gray050',
        },
      },
      'loading': {
        borderColor: '$gray800',
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
      'error': {
        borderColor: '$red700ss',
      },
      'success': {
        borderColor: '$gray800',
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
      'next': {
        borderColor: '$gray800',
        '&:hover': {
          cursor: 'not-allowed'
        }
      },
    }
  },
  defaultVariants: {
    state: 'normal',
    size: 'm'
  },
});

interface Props extends React.ComponentProps<typeof StyledInput> {
  
};

export const Input: React.FC<Props> = React.forwardRef(({ state, ...props }, ref) => {
  return (
    <StyledInput state={state} {...props} ref={ref} disabled={state === 'disabled'}/>
  );
});