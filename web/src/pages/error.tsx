import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';

type StyledErrorVariants = Stitches.VariantProps<typeof StyledError>

const StyledError = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledError> {
  
};

const Error: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledError {...props}>
      
    </StyledError>
  );
};

export default Error;