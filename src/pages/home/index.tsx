import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { WorkshopList } from 'components/workshopList';
import { useWorkshops } from 'hooks/useWorkshops';
import { Layout } from 'layout/layout';
import { Skeleton } from '@chakra-ui/react';


const StyledHome = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


export const Home: FC<{}> = ({ ...props }) => {
  const [workshops, isLoading, error] = useWorkshops();

  return (
    <Layout>
      <StyledHome {...props}>
        {isLoading
          ? <Skeleton height='300px'/>
          : <WorkshopList workshops={workshops} adminMode={false}/>
        }
      </StyledHome>
    </Layout>
  );
}