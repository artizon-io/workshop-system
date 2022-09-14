import React, { FC } from 'react';
import { Text, Button, Heading } from '@chakra-ui/react';
import { Auth, User } from 'firebase/auth';
import { StyledNav } from 'styles/styledNav';


interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

export const Nav: FC<Props> = ({ ...props }) => {
  return (
    <StyledNav {...props}>
      <Heading fontWeight='medium'>Workshop System</Heading>
      <div className="right">
      </div>
    </StyledNav>
  );
}