import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import WorkshopCard from '@components/workshopCard';

type StyledWorkshopsVariants = Stitches.VariantProps<typeof StyledWorkshops>

const StyledWorkshops = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  margin: '180px 100px 50px 100px',
  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  }
});

interface Props extends React.ComponentProps<typeof StyledWorkshops> {
  
};

const Workshops: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshops {...props}>
      <div>
        <WorkshopCard workshopId={"someId"} role='user'/>
        <WorkshopCard workshopId={"someId"} role='user'/>
        <WorkshopCard workshopId={"someId"} role='user'/>
      </div>
    </StyledWorkshops>
  );
};

export default Workshops;