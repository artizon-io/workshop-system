import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Link as RouterLink } from 'react-router-dom';

type StyledLinkVariants = Stitches.VariantProps<typeof StyledLink>

const StyledLink = styled(RouterLink, {
  variants: {
    style: {
      'gray': {},
      'blue': {},
      'white': {},
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
      underline: 'true',
      style: 'white',
      state: 'normal',
      css: {
        color: '$gray800',
        '&:hover': {
          textDecorationColor: "$gray800"
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
    {
      underline: 'false',
      style: 'white',
      state: 'normal',
      css: {
        color: '$gray800',
        '&:hover': {
          color: '$gray900',
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

export const Link: React.FC<Props> = ({ state, onClick, ...props }) => {
  return (
    <StyledLink state={state} {...props} className='link'
      onClick={e => {
        state === 'disabled'
          ? e.preventDefault()
          : onClick ? onClick(e) : null
      }}
    />
  );
};

Link.toString = () => '.link';