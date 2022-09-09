import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Nav } from '../components/nav';
import { Footer } from '../components/footer';
import { Auth, User } from 'firebase/auth';


const StyledLayout = styled.div`

`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly user?: User;
  readonly auth: Auth;
}

export const Layout: FC<Props> = ({ user, auth, ...props }) => {
  return (
    <StyledLayout {...props}>
      <Nav user={user} auth={auth}/>
      <Outlet/>
      <Footer/>
    </StyledLayout>
  );
}