import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

type StyledLandingVariants = Stitches.VariantProps<typeof StyledLanding>

const StyledLanding = styled('main', {
  '& > h1': {
    fontFamily: '$firacode',
    color: '$blue300',
    fontSize: '100px'
  }
});

interface Props extends React.ComponentProps<typeof StyledLanding> {
  
};

const Landing: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLanding {...props}>
      <motion.h1
        initial={{
          opacity: 0,
          scale: 0.9,
          y: -30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          opacity: {
            duration: 0.2
          }
        }}
      >
        Landing
      </motion.h1>
    </StyledLanding>
  );
};

export default Landing;