import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';

type StyledIconTextVariants = Stitches.VariantProps<typeof StyledIconText>

const StyledIconText = styled('span', {
  fontFamily: '$ibmplexmono',
  fontSize: '14px',
  flexbox: 'row',
  gap: '5px',
  color: '$gray650'
});

interface Props extends React.ComponentProps<typeof StyledIconText> {
  
};

export const IconText: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledIconText {...props}/>
  );
};