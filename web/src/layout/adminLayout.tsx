import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

type StyledAdminLayoutVariants = Stitches.VariantProps<typeof StyledAdminLayout>

const StyledAdminLayout = styled('div', {
  
});

interface Props extends React.ComponentProps<typeof StyledAdminLayout> {
  
};

const AdminLayout: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledAdminLayout {...props}>
      <Outlet/>
    </StyledAdminLayout>
  );
};

export default AdminLayout;