import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Text, Button, Heading } from '@chakra-ui/react';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { Auth, User } from 'firebase/auth';
import { StyledNav } from '../styles/styledNav';


export const Nav: FC<{
  readonly user?: User;
  readonly auth: Auth;

} & React.HTMLAttributes<HTMLDivElement>> = ({ user, auth, ...props }) => {
  return (
    <StyledNav {...props}>
      <Heading fontWeight='medium'>Workshop System</Heading>
      <div className="right">
        {user ? <Text>{user.phoneNumber}</Text> : ""}
        <Button colorScheme="blue" onClick={() => {auth.signOut()}}>Log out</Button>
      </div>
    </StyledNav>
  );
}