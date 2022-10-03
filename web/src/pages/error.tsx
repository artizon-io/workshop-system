import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { SiFacepunch } from 'react-icons/si';
import { Button } from '@components/button';
import Header from '@components/header';

type StyledErrorVariants = Stitches.VariantProps<typeof StyledError>

const StyledError = styled(motion.main, {
  flexbox: 'column',
  gap: '20px',
  '& > svg': {
    color:'$red300'
  }
});

interface Props extends React.ComponentProps<typeof StyledError> {
  
};

const MotionLink = motion(Link);

const Error: React.FC<Props> = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <StyledError {...props}
      // initial="initial"
      // animate="animate"
      // exit="exit"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
    >
      {/* <MdOutlineReportGmailerrorred style={{ fontSize: '80px' }}/> */}
      <SiFacepunch style={{ fontSize: '80px' }}/>
      <Header>Error</Header>
      <Button onClick={() => navigate('/')}>Back to home</Button>
    </StyledError>
  );
};

export default Error;