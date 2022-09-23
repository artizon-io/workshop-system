import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { Card, CardTitle, CardDescription } from '@artizon/design-system';

type StyledWorkshopCardVariants = Stitches.VariantProps<typeof StyledWorkshopCard>

const StyledWorkshopCard = styled(Card, {
  
});

interface Props extends React.ComponentProps<typeof StyledWorkshopCard> {
  
};

const WorkshopCard: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshopCard {...props}>
      <CardTitle>Workshop</CardTitle>
      <CardDescription>A fantastic workshop hosted in Hong Kong</CardDescription>
    </StyledWorkshopCard>
  );
};

export default WorkshopCard;