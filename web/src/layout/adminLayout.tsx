import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NavBar } from "@artizon/design-system";
import profileIcon from '@assets/profileIcon.jpg';
import Logo from '@components/logo';
import { useAuth, useUser } from 'reactfire';
import { signOut } from 'firebase/auth';
import { HiExternalLink } from 'react-icons/hi';
import { MdOutlineManageAccounts, MdLogout } from 'react-icons/md';

type StyledAdminLayoutVariants = Stitches.VariantProps<typeof StyledAdminLayout>

const StyledAdminLayout = styled('div', {
  margin: '200px 100px'
});

interface Props extends React.ComponentProps<typeof StyledAdminLayout> {
  
};

const AdminLayout: React.FC<Props> = ({ ...props }) => {
  const [showNav, setShowNav] = useState(true);

  const user = useUser();
  // TODO: retrieve icon pic
  const auth = useAuth();

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    setShowNav(false);
    setTimeout(() => navigate('/login'), 2000);
  }

  return (
    <StyledAdminLayout {...props}>
      <AnimatePresence>
        {showNav &&
        <NavBar img={profileIcon} logo={<Logo/>}>
          <a href="#" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <MdOutlineManageAccounts style={{ transform: 'translate(0px, -1px)', fontSize: '17px' }}/>
            <span>Account Management</span>
          </a>
          <a href="#" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <HiExternalLink style={{ transform: 'translate(0px, 0px)', fontSize: '15px' }}/>
            <span>Stripe Dashboard</span>
          </a>
          {/* <a href="#">Settings</a> */}
          <a onClick={() => logout()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <MdLogout style={{ transform: 'translate(0px, 0px)', fontSize: '15px' }}/>
            <span>Logout</span>
          </a>
        </NavBar>
        }
      </AnimatePresence>
      <Outlet/>
    </StyledAdminLayout>
  );
};

export default AdminLayout;