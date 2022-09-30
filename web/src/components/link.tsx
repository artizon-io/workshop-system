import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Link as RouterLink } from 'react-router-dom';

type StyledLinkVariants = Stitches.VariantProps<typeof StyledLink>

const StyledLink = styled(RouterLink, {
  variants: {
    style: {
      'gray': {},
      'blue': {}
    },
    'inline': {
      true: {
        fontFamily: 'inherit',
        fontSize: 'inherit',
      },
      false:{
        fontFamily: '$firacode',
        fontSize: '14px',
      }
    },
    'underline': {
      true: {
        underline: "",
        textDecorationColor: 'transparent',
      },
      false: {}
    },
    state: {
      'normal': {
        '&:hover': {
          cursor: 'pointer'
        }
      },
      'disabled': {
        color: '$gray700',
        textDecoration: 'line-through',
        '&:hover': {
          cursor: 'not-allowed'
        },
      },
    }
  },
  compoundVariants: [
    {
      underline: 'true',
      style: 'blue',
      state: 'normal',
      css: {
        color: '$blue500',
        '&:hover': {
          textDecorationColor: "$blue500"
        }
      }
    },
    {
      underline: 'true',
      style: 'gray',
      state: 'normal',
      css: {
        color: '$gray550',
        '&:hover': {
          textDecorationColor: "$gray550"
        }
      }
    },
    {
      underline: 'false',
      style: 'blue',
      state: 'normal',
      css: {
        color: '$blue500',
        '&:hover': {
          color: '$blue200',
        }
      }
    },
    {
      underline: 'false',
      style: 'gray',
      state: 'normal',
      css: {
        color: '$gray550',
        '&:hover': {
          color: '$gray050',
        }
      }
    },
  ],
  defaultVariants: {
    inline: false,
    underline: false,
    state: 'normal',
    style: 'blue'
  }
});

interface Props extends React.ComponentProps<typeof StyledLink> {
  
};

export const Link: React.FC<Props> = ({ state, ...props }) => {
  return (
    <StyledLink state={state} {...props} onClick={e => state === 'disabled' ? e.preventDefault() : null}/>
  );
};