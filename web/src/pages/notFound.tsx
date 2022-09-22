import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@stitches/react';
import type * as Stitches from '@stitches/react';

type StyledNotFoundVariants = Stitches.VariantProps<typeof StyledNotFound>

const StyledNotFound = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledNotFound> {
  
};

const NotFound: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledNotFound {...props}>
      
    </StyledNotFound>
  );
};

export default NotFound;