import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Button } from '@chakra-ui/react';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { StyledNav } from '../styles/styledNav';
import { WorkshopList } from '../components/workshopList';
import { useWorkshops } from '../hooks/useWorkshops';
import { WorkshopModalAdmin } from '../components/workshopModalAdmin';


const StyledAdmin = styled.div`
  & > main {
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & > main > .button-container {
    display: flex;
    justify-content: flex-end;
  }
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
  const [isModalOpened, setIsModalOpened] = useState(false);

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
        <div className="button-container">
          <Button colorScheme="blue" className="button" onClick={() => setIsModalOpened(true)}>Add Workshop</Button>
          <WorkshopModalAdmin
            isOpen={isModalOpened}
            onClose={() => setIsModalOpened(false)}
          />
        </div>
        <WorkshopList workshops={workshops} adminMode={true}/>
      </main>
    </StyledAdmin>
  );
}