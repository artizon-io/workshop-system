import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

type StyledLayoutVariants = Stitches.VariantProps<typeof StyledLayout>

const StyledLayout = styled('div', {
  
});

interface Props extends React.ComponentProps<typeof StyledLayout> {
  
};

const Layout: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLayout {...props}>
      <Outlet/>
    </StyledLayout>
  );
};

export default Layout;