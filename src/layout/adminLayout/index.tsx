import React, { FC } from 'react';
import styled from '@emotion/styled';
import { AdminNav } from './adminNav';
import { useFirebaseContext } from 'hooks/useFirebaseContext';


const StyledAdminLayout = styled.div`

`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

export const AdminLayout: FC<Props> = ({ children, ...props }) => {
  const {
    user,
    auth
  } = useFirebaseContext();

  return (
    <StyledAdminLayout {...props}>
      <AdminNav user={user} auth={auth}/>
      {children}
    </StyledAdminLayout>
  );
}