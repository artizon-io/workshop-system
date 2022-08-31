import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Nav } from '../components/nav';
import { Footer } from '../components/footer';
import { Auth, User } from 'firebase/auth';


const StyledLayout = styled.div`

`;

export const Layout: FC<{
  readonly user?: User;
  readonly auth: Auth;

} & React.HTMLAttributes<HTMLDivElement>> = ({ user, auth, ...props }) => {
  return (
    <StyledLayout {...props}>
      <Nav user={user} auth={auth}/>
      <Outlet/>
      <Footer/>
    </StyledLayout>
  );
}