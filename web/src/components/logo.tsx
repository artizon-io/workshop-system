import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { IoSettingsSharp } from "react-icons/io5";
import { motion, Variants } from 'framer-motion';

type StyledLogoVariants = Stitches.VariantProps<typeof StyledLogo>

const spinning = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const StyledLogo = styled(motion.a, {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '26px',
  padding: '12px 26px',
  $$shadowColor: 'rgba(0, 0, 0, 15%)',
  boxShadow: '0 0 30px 1px $$shadowColor',
  fontFamily: '$ibmplexmono',
  fontSize: '25px',
  fontWeight: 400,
  color:'$gray050',
  transition: 'color 0.2s, background-color 0.2s',
  '& > h1': {
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
  '& > div': {
    display: 'flex',
    alignItems: 'center'
  },
  '& > div > svg': {
    height: '22px',
    width: '22px',
    marginTop: '3px',
    color: '$gray800'
  },
  '&:hover': {
    backgroundColor: '$gray200',
    color: '$gray900'
  },
  '&:hover > div > svg': {
    animation: `${spinning} 3000ms`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

interface Props extends React.ComponentProps<typeof StyledLogo> {

};

const Logo: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLogo {...props} href="#"
      whileHover={{
        scale: 1.1,
        transition: {
          type: 'spring',
          bounce: 0.7,
        }
      }}
    >
      <h1>Workshop</h1>
      <motion.div>
        <IoSettingsSharp/>
      </motion.div>
    </StyledLogo>
  );
};

export default Logo;