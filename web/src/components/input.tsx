import React, { useState, useEffect, useRef, HTMLProps } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';


export type StyledInputVariants = Stitches.VariantProps<typeof StyledInput>

const StyledInput = styled('input', {
  fontFamily: '$firacode',
  '&::placeholder': {
    color: '$gray800',
    fontFamily: '$firacode'
  },
  variants: {
    thickness: {
      'thick': {
        border: '2px solid',
      },
      'thin': {
        border: '1px solid',
      }
    },
    size: {
      'm': {
        width: '100%',
        borderRadius: '12px',
        padding: '12px 16px',
      },
      'square': {
        width: '50px',
        height: '50px',
        paddingLeft: '18px',
        borderRadius: '8px',
      },
      'fit': {}
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
    },
  },
  defaultVariants: {
    state: 'normal',
    size: 'm',
    thickness: 'thick'
  },
});

const StyledInputWrapper = styled('div', {
  position: 'relative',
  backgroundColor: 'inherit',

  flexbox: 'row',
  alignItems: 'flex-start',
  gap: '10px'
});

const StyledChildrenWrapper = styled('div', {
  color: '$gray300',
  fontFamily: '$firacode',
  
  variants: {
    position: {
      'absolute': {
        position: 'absolute',
        top: '-6px',
        left: '5px',
        backgroundColor: 'inherit',
        padding: '0 5px',

        fontSize: '12px',
      },
      'normal': {
        fontSize: '13px',
        lineHeight: 1.5,
      }
    }
  },
  defaultVariants: {
    position: 'normal'
  }
});

interface Props extends React.ComponentProps<typeof StyledInput> {
  // type: HTMLInputElement['type'] | 'textarea';  // TODO: figure out what I am doing...
  // type: NonNullable<JSX.IntrinsicElements['input']['type'] | 'textarea' | 'select'>;
  type: JSX.IntrinsicElements['input']['type'] | 'textarea' | 'select';
  icon?: React.ReactNode;
};

export const Input: React.FC<Props> = React.forwardRef(({ state, type, children, icon, ...props }, ref) => {
  // Another approach: TS makes type & isTextArea mutually exclusive
  let as : keyof HTMLElementTagNameMap = 'input';
  let childrenPosition : Stitches.VariantProps<typeof StyledChildrenWrapper>['position'] = 'absolute';
  let additionalCss : Stitches.CSSProperties = {};
  let additionalProps : {[key: string]: any} = {};

  switch(type) {
    case 'textarea':
      as = 'textarea';
      additionalCss.resize = 'none';
      break;
    case 'number':
      additionalProps.onScroll = (e => e.preventDefault()) as React.UIEventHandler<HTMLInputElement>
      break;
    case 'checkbox':
      childrenPosition = 'normal';
      break;
  }

  return (
    <StyledInputWrapper>
      <StyledInput state={state} {...props} ref={ref} type={type}
        as={as}
        style={additionalCss}
        {...additionalProps}
        disabled={state === 'disabled'}
      />
      <StyledChildrenWrapper position={childrenPosition}>{children}</StyledChildrenWrapper>
    </StyledInputWrapper>
  );
});