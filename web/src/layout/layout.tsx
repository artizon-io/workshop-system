import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NavBar } from "@artizon/design-system";
import Logo from '@components/logo';

type StyledLayoutVariants = Stitches.VariantProps<typeof StyledLayout>

const StyledLayout = styled('div', {
  margin: '200px 100px'
});

interface Props extends React.ComponentProps<typeof StyledLayout> {
  
};

const Layout: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLayout {...props}>
      <AnimatePresence>
        <NavBar logo={<Logo/>} />
      </AnimatePresence>
      <Outlet/>
    </StyledLayout>
  );
};

export default Layout;