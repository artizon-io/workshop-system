import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Auth, User } from 'firebase/auth';
import { AdminNav } from '../components/adminNav';


const StyledAdminLayout = styled.div`

`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly user?: User;
  readonly auth: Auth;
}

export const AdminLayout: FC<Props> = ({ user, auth, ...props }) => {
  return (
    <StyledAdminLayout {...props}>
      <AdminNav user={user} auth={auth}/>
      <Outlet/>
    </StyledAdminLayout>
  );
}