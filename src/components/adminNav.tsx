import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Button } from '@chakra-ui/react';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { StyledNav } from '../styles/styledNav';
import { WorkshopList } from '../components/workshopList';
import { useWorkshops } from '../hooks/useWorkshops';
import { WorkshopModalAdmin } from '../components/workshopModalAdmin';
import { useNavigate } from 'react-router-dom';
import { Auth, User } from 'firebase/auth';


export const AdminNav: FC<{
  user: User,
  auth: Auth

} & React.HTMLAttributes<HTMLDivElement>> = ({ user, auth, ...props }) => {
  const navigate = useNavigate();

  return (
    <StyledNav>
      <Heading fontWeight='medium'>Workshop System Admin</Heading>
      <div className="right">
        {user ? <Text>{user.phoneNumber}</Text> : ""}
        <Button colorScheme="blue" onClick={() => {navigate("./admin-management")}}>Admin Accounts Management</Button>
        <Button colorScheme="blue" onClick={() => {auth.signOut()}}>Log out</Button>
      </div>
    </StyledNav>
  );
}