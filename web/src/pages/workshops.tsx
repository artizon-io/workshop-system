import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

type StyledWorkshopsVariants = Stitches.VariantProps<typeof StyledWorkshops>

const StyledWorkshops = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledWorkshops> {
  
};

const Workshops: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshops {...props}>
      <h1>Workshops</h1>
    </StyledWorkshops>
  );
};

export default Workshops;