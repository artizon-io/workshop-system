import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import WorkshopCards from '@components/workshopCards';

type StyledAdminVariants = Stitches.VariantProps<typeof StyledAdmin>

const StyledAdmin = styled('main', {
  flexbox: 'column',
  // TODO: Refactor - combine admin & user panel
  '@bp4': {
    margin: '180px 10vw 50px 10vw',
  },
  '@bp3': {
    margin: '180px 5vw 50px 5vw',
  },
  '@bp2': {
    margin: '180px 5vw 50px 5vw',
  },
  '@bp1': {
    margin: '180px 5vw 50px 5vw',
  }
});

interface Props extends React.ComponentProps<typeof StyledAdmin> {
  
};

const Admin: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledAdmin {...props}>
      <WorkshopCards adminMode={true}/>
    </StyledAdmin>
  );
};

export default Admin;