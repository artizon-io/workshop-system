import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Button } from '@chakra-ui/react';
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

export const AdminManagement: FC<{}> = ({ ...props }) => {
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