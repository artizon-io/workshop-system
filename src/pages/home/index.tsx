import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { WorkshopList } from 'components/workshopList';
import { useWorkshops } from 'hooks/useWorkshops';
import { Layout } from 'layout/layout';


const StyledHome = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


export const Home: FC<{}> = ({ ...props }) => {
  const workshops = useWorkshops();

  return (
    <Layout>
      <StyledHome {...props}>
        <WorkshopList workshops={workshops} adminMode={false}/>
      </StyledHome>
    </Layout>
  );
}