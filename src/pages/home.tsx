import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { Button, Text } from '@chakra-ui/react';
import { Nav } from '../components/nav';
import { Footer } from '../components/footer';
import { getDocs, getDoc, getDocFromServer, getDocsFromServer, collection, Timestamp } from 'firebase/firestore';
import { Flexbox } from '../components/flexbox';
import { Workshop, WorkshopType } from '../components/workshop';
import { WorkshopList } from '../components/workshopList';
import { useWorkshops } from '../hooks/useWorkshops';


const StyledHome = styled.main`
`;


export const Home: FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const workshops = useWorkshops();

  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
  } = useFirebaseContext();

  return (
    <StyledHome {...props}>
      <WorkshopList workshops={workshops} adminMode={false}/>
    </StyledHome>
  );
}