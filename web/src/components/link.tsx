import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Link as RouterLink } from 'react-router-dom';

type StyledLinkVariants = Stitches.VariantProps<typeof StyledLink>

const StyledLink = styled(RouterLink, {
  variants: {
    style: {
      'next': {
        fontFamily: '$firacode',
        fontSize: '14px',
        color: '$gray550',
        '&:hover': {
          color: '$gray050',
        }
      }
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
        }
      },
    }
  },
  defaultVariants: {
    style: 'next',
    variant: 'normal'
  }
});

interface Props extends React.ComponentProps<typeof StyledLink> {
  
};

export const Link: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLink {...props}/>
  );
};