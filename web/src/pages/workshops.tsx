import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import WorkshopCards from '@components/workshopCards';

type StyledWorkshopsVariants = Stitches.VariantProps<typeof StyledWorkshops>

const StyledWorkshops = styled('main', {
  flexbox: 'column',
  margin: '180px 100px 50px 100px',
});

interface Props extends React.ComponentProps<typeof StyledWorkshops> {
  
};

const Workshops: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshops {...props}>
      <WorkshopCards/>
    </StyledWorkshops>
  );
};

export default Workshops;