import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

type StyledLoadingVariants = Stitches.VariantProps<typeof StyledLoading>

const StyledLoading = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledLoading> {
  
};

const Loading: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLoading {...props}>
      <h1>Loading</h1>
    </StyledLoading>
  );
};

export default Loading;