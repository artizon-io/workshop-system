import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import WorkshopCard from '@components/workshopCard';

type StyledWorkshopsVariants = Stitches.VariantProps<typeof StyledWorkshops>

const StyledWorkshops = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px'
});

interface Props extends React.ComponentProps<typeof StyledWorkshops> {
  
};

const Workshops: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshops {...props}>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
      <WorkshopCard workshopId={"someId"} role='user'/>
    </StyledWorkshops>
  );
};

export default Workshops;