import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';

type StyledWorkshopEnrollCompleteVariants = Stitches.VariantProps<typeof StyledWorkshopEnrollComplete>

const StyledWorkshopEnrollComplete = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledWorkshopEnrollComplete> {
  
};

const WorkshopEnrollComplete: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshopEnrollComplete {...props}>
      
    </StyledWorkshopEnrollComplete>
  );
};

export default WorkshopEnrollComplete;