import React, { FC } from 'react';
import { Text, Button, Heading } from '@chakra-ui/react';
import { Auth, User } from 'firebase/auth';
import { StyledNav } from '../styles/styledNav';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly user?: User;
  readonly auth: Auth;
}

export const Nav: FC<Props> = ({ user, auth, ...props }) => {
  return (
    <StyledNav {...props}>
      <Heading fontWeight='medium'>Workshop System</Heading>
      <div className="right">
        {!!user ?? <Text>{user.phoneNumber}</Text>}
        <Button colorScheme="blue" onClick={() => {auth.signOut()}}>Log out</Button>
      </div>
    </StyledNav>
  );
}