import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Nav } from '../components/nav';
import { Footer } from '../components/footer';
import { Auth, User } from 'firebase/auth';
import { AdminNav } from '../components/adminNav';


const StyledAdminLayout = styled.div`

`;

export const AdminLayout: FC<{
  readonly user?: User;
  readonly auth: Auth;

} & React.HTMLAttributes<HTMLDivElement>> = ({ user, auth, ...props }) => {
  return (
    <StyledAdminLayout {...props}>
      <AdminNav user={user} auth={auth}/>
      <Outlet/>
    </StyledAdminLayout>
  );
}