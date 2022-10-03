import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

type StyledAdminUserManagementVariants = Stitches.VariantProps<typeof StyledAdminUserManagement>

const StyledAdminUserManagement = styled('main', {
  flexbox: 'column',
  margin: '180px 100px 50px 100px',
  '& > h1': {
    color: '$gray500',
    fontFamily: '$firacode'
  }
});

interface Props extends React.ComponentProps<typeof StyledAdminUserManagement> {
  
};

const AdminUserManagement: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledAdminUserManagement {...props}>
      <motion.h1
      >
        Admin User Management
      </motion.h1>
    </StyledAdminUserManagement>
  );
};

export default AdminUserManagement;