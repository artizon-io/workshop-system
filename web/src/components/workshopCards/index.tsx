import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import WorkshopCard from './workshopCard';

type StyledWorkshopCardsVariants = Stitches.VariantProps<typeof StyledWorkshopCards>

const StyledWorkshopCards = styled('div', {
  flexbox: 'column',
  gap: '40px',
});

interface Props extends React.ComponentProps<typeof StyledWorkshopCards> {
  adminMode?: boolean;
};

const WorkshopCards: React.FC<Props> = ({ adminMode = false, ...props }) => {
  return (
    <StyledWorkshopCards {...props}>
      <WorkshopCard workshopId={"someId"} adminMode={adminMode}/>
      <WorkshopCard workshopId={"someId"} adminMode={adminMode}/>
      <WorkshopCard workshopId={"someId"} adminMode={adminMode}/>
    </StyledWorkshopCards>
  );
};

export default WorkshopCards;