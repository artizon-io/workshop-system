import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavBar } from "@artizon/design-system";
import profileIcon from '@assets/profileIcon.jpg';
import Logo from '@components/logo';

type StyledAdminLayoutVariants = Stitches.VariantProps<typeof StyledAdminLayout>

const StyledAdminLayout = styled('div', {

});

interface Props extends React.ComponentProps<typeof StyledAdminLayout> {
  
};

const AdminLayout: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledAdminLayout {...props}>
      <NavBar img={profileIcon} logo={<Logo/>} />
      <Outlet/>
    </StyledAdminLayout>
  );
};

export default AdminLayout;