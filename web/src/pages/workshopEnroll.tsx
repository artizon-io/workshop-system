import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@stitches/react';
import type * as Stitches from '@stitches/react';

type StyledWorkshopEnrollVariants = Stitches.VariantProps<typeof StyledWorkshopEnroll>

const StyledWorkshopEnroll = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledWorkshopEnroll> {
  
};

const WorkshopEnroll: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshopEnroll {...props}>
      
    </StyledWorkshopEnroll>
  );
};

export default WorkshopEnroll;