import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import WorkshopCards from '@components/workshopCards';

type StyledWorkshopsVariants = Stitches.VariantProps<typeof StyledWorkshops>

const StyledWorkshops = styled('main', {
  flexbox: 'column',
  '@imac': {
    margin: '180px 10vw 50px 10vw',
  },
  '@macbook': {
    margin: '180px 5vw 50px 5vw',
  },
  '@ipad': {
    margin: '180px 5vw 50px 5vw',
  },
  '@iphone': {
    margin: '180px 5vw 50px 5vw',
  }
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