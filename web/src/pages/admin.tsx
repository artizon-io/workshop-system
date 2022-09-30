import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import WorkshopCards from '@components/workshopCards';

type StyledAdminVariants = Stitches.VariantProps<typeof StyledAdmin>

const StyledAdmin = styled('main', {
  flexbox: 'column',
  margin: '180px 100px 50px 100px',
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