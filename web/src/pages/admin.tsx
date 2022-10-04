import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import WorkshopCards from '@components/workshopCards';

type StyledAdminVariants = Stitches.VariantProps<typeof StyledAdmin>

const StyledAdmin = styled('main', {
  flexbox: 'column',
  // TODO: Refactor - combine admin & user panel
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