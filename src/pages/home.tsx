import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { WorkshopList } from '../components/workshopList';
import { useWorkshops } from '../hooks/useWorkshops';


const StyledHome = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


export const Home: FC<{}> = ({ ...props }) => {
  const workshops = useWorkshops();

  return (
    <StyledHome {...props}>
      <WorkshopList workshops={workshops} adminMode={false}/>
    </StyledHome>
  );
}