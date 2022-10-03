import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { TbError404 } from 'react-icons/tb'
import { Button } from '@components/button';
import Header from '@components/header';

type StyledNotFoundVariants = Stitches.VariantProps<typeof StyledNotFound>

const StyledNotFound = styled(motion.main, {
  flexbox: 'column',
  gap: '20px',
  '& > svg': {
    color: '$gray500'
  }
});

interface Props extends React.ComponentProps<typeof StyledNotFound> {
  
};

const NotFound: React.FC<Props> = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <StyledNotFound {...props}
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
      <TbError404 style={{ fontSize: '100px' }}/>
      <Header>Not Found</Header>
      <Button onClick={() => navigate('/')}>Back to home</Button>
    </StyledNotFound>
  );
};

export default NotFound;