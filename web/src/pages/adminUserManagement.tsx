import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';

type StyledAdminUserManagementVariants = Stitches.VariantProps<typeof StyledAdminUserManagement>

const StyledAdminUserManagement = styled('main', {
  
});

interface Props extends React.ComponentProps<typeof StyledAdminUserManagement> {
  
};

const AdminUserManagement: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledAdminUserManagement {...props}>
      
    </StyledAdminUserManagement>
  );
};

export default AdminUserManagement;