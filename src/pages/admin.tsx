import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Button } from '@chakra-ui/react';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { StyledNav } from '../styles/styledNav';
import { WorkshopList } from '../components/workshopList';
import { useWorkshops } from '../hooks/useWorkshops';


const StyledAdmin = styled.div`

`;

export const Admin: FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
  } = useFirebaseContext();

  const workshops = useWorkshops();

  return (
    <StyledAdmin {...props}>
      <StyledNav>
        <Heading fontWeight='medium'>Workshop System Admin</Heading>
        <div className="right">
          {user ? <Text>{user.phoneNumber}</Text> : ""}
          <Button colorScheme="blue" onClick={() => {auth.signOut()}}>Log out</Button>
        </div>
      </StyledNav>
      <main>
        <WorkshopList workshops={workshops} adminMode={true}/>
      </main>
    </StyledAdmin>
  );
}