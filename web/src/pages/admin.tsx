import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import WorkshopCard from '@components/workshopCard';

type StyledAdminVariants = Stitches.VariantProps<typeof StyledAdmin>

const StyledAdmin = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  marginTop: '250px'
});

interface Props extends React.ComponentProps<typeof StyledAdmin> {
  
};

const Admin: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledAdmin {...props}>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
      <WorkshopCard workshopId={"someId"} role='admin'/>
    </StyledAdmin>
  );
};

export default Admin;