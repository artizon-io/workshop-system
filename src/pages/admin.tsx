import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Button } from '@chakra-ui/react';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { StyledNav } from '../styles/styledNav';
import { WorkshopList } from '../components/workshopList';
import { useWorkshops } from '../hooks/useWorkshops';
import { WorkshopModalAdmin } from '../components/workshopModalAdmin';
import { useNavigate } from 'react-router-dom';


const StyledAdmin = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > .button-container {
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

  const workshops = useWorkshops(true);
  const [isWorkshopModalOpened, setIsWorkshopModalOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <StyledAdmin {...props}>
      <div className="button-container">
        <Button colorScheme="blue" className="button" onClick={() => setIsWorkshopModalOpened(true)}>Add Workshop</Button>
        <WorkshopModalAdmin
          isOpen={isWorkshopModalOpened}
          onClose={() => setIsWorkshopModalOpened(false)}
        />
      </div>
      <WorkshopList workshops={workshops} adminMode={true}/>
    </StyledAdmin>
  );
}