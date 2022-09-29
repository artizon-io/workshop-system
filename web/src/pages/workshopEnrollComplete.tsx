import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

type StyledWorkshopEnrollCompleteVariants = Stitches.VariantProps<typeof StyledWorkshopEnrollComplete>

const StyledWorkshopEnrollComplete = styled('main', {
  '& > h1': {
    color: '$gray500',
    fontFamily: '$firacode'
  }
});

interface Props extends React.ComponentProps<typeof StyledWorkshopEnrollComplete> {
  
};

const WorkshopEnrollComplete: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshopEnrollComplete {...props}>
      <motion.h1>
        Enroll Complete
      </motion.h1>
    </StyledWorkshopEnrollComplete>
  );
};

export default WorkshopEnrollComplete;