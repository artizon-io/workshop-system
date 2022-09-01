import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Button } from '@chakra-ui/react';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { StyledNav } from '../styles/styledNav';
import { WorkshopList } from '../components/workshopList';
import { useWorkshops } from '../hooks/useWorkshops';
import { WorkshopModalAdmin } from '../components/workshopModalAdmin';
import { useNavigate } from 'react-router-dom';
import { MakeAdminModal } from '../components/makeAdminModal';


const StyledAdminManagement = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > .button-container {
    display: flex;
    justify-content: flex-end;
  }
`;

export const AdminManagement: FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const {
    firebaseApp,
    firebaseAnalytics,
    auth,
    user,
    firestore,
    functions
  } = useFirebaseContext();

  const [isMakeAdminModalOpened, setIsMakeAdminModalOpened] = useState(false);

  return (
    <StyledAdminManagement {...props}>
      <div className="button-container">
        <Button colorScheme="blue" className="button" onClick={() => setIsMakeAdminModalOpened(true)}>Make Admin</Button>
        <MakeAdminModal
          isOpen={isMakeAdminModalOpened}
          onClose={() => setIsMakeAdminModalOpened(false)}
        />
      </div>
    </StyledAdminManagement>
  );
}