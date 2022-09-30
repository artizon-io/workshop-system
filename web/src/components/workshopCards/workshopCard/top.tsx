import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';

type StyledTopVariants = Stitches.VariantProps<typeof StyledTop>

const StyledTop = styled('div', {
  gridArea: 'top'
});

interface Props extends React.ComponentProps<typeof StyledTop> {
  
};

const Top: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledTop className='top' {...props}>
      
    </StyledTop>
  );
};

Top.toString = () => '.top';

export default Top;