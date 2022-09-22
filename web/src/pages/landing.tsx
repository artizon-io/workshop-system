import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

type StyledLandingVariants = Stitches.VariantProps<typeof StyledLanding>

const StyledLanding = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledLanding> {
  
};

const Landing: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLanding {...props}>
      
    </StyledLanding>
  );
};

export default Landing;