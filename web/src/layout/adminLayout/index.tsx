import React, { FC } from 'react';
import styled from '@emotion/styled';
import { AdminNav } from './adminNav';
import { useAuth, useUser } from 'reactfire';


const StyledAdminLayout = styled.div`

`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

export const AdminLayout: FC<Props> = ({ children, ...props }) => {
  const user = useUser();
  const auth = useAuth();

  return (
    <StyledAdminLayout {...props}>
      <AdminNav user={user.data} auth={auth}/>
      {children}
    </StyledAdminLayout>
  );
}