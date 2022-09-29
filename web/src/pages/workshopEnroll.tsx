import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

type StyledWorkshopEnrollVariants = Stitches.VariantProps<typeof StyledWorkshopEnroll>

const StyledWorkshopEnroll = styled('main', {
  '& > h1': {
    color: '$gray500',
    fontFamily: '$firacode'
  }
});

interface Props extends React.ComponentProps<typeof StyledWorkshopEnroll> {
  
};

const WorkshopEnroll: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshopEnroll {...props}>
      <motion.h1>
        Workshop Enroll
      </motion.h1>
    </StyledWorkshopEnroll>
  );
};

export default WorkshopEnroll;