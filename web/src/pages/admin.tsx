import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import WorkshopCard from '@components/workshopCard';

type StyledAdminVariants = Stitches.VariantProps<typeof StyledAdmin>

const StyledAdmin = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  margin: '180px 100px 50px 100px',
  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  }
});

interface Props extends React.ComponentProps<typeof StyledAdmin> {
  
};

const Admin: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledAdmin {...props}>
      <div>
        <WorkshopCard workshopId={"someId"} role='admin'/>
        <WorkshopCard workshopId={"someId"} role='admin'/>
        <WorkshopCard workshopId={"someId"} role='admin'/>
      </div>
    </StyledAdmin>
  );
};

export default Admin;