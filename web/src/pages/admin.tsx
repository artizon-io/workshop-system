import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';

type StyledAdminVariants = Stitches.VariantProps<typeof StyledAdmin>

const StyledAdmin = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledAdmin> {
  
};

const Admin: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledAdmin {...props}>
      <h1>Admin Dashboard</h1>
    </StyledAdmin>
  );
};

export default Admin;