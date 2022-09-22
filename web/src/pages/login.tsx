import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { PhoneOTPLogin } from '@artizon/design-system';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';

type StyledLoginVariants = Stitches.VariantProps<typeof StyledLogin>

const StyledLogin = styled('main', {

});

interface Props extends React.ComponentProps<typeof StyledLogin> {
  
};

const Login: React.FC<Props> = ({ ...props }) => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    switch(showLogin) {
      case false:
        setTimeout(() => navigate('/admin'), 2000);
        break;
    }
  }, [showLogin]);

  return (
    <StyledLogin {...props}>
      <AnimatePresence>
        {showLogin
        && <PhoneOTPLogin
          submitPhone={(phone: string) => new Promise((resolve, reject) => setTimeout(() => resolve(), 500))}
          // submitPhone={(phone: string) => Promise.reject()}
          submitOtp={(otp: string) => new Promise((resolve, reject) => setTimeout(() => { resolve(); setShowLogin(false) }, 500))}
        />
        }
      </AnimatePresence>
    </StyledLogin>
  );
};

export default Login;