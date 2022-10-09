import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { SiFacepunch } from 'react-icons/si';
import { Button } from '@components/button';
import Header from '@components/header';

type StyledErrorVariants = Stitches.VariantProps<typeof DeviceNotSupported>

const StyledDeviceNotSupported = styled(motion.main, {
  flexbox: 'column',
  gap: '25px',
  padding: '8vh 10vw',
  margin: '0 5vw',
  backgroundColor: '$gray1000',
  borderRadius: '20px',
  boxShadow: '0 2px 20px #acacac39',
  '& > svg': {
    color:'#ae4141'
  },
  '& > p': {
    fontFamily: '$firacode',
    fontSize: '18px',
    color: '$gray600',
    lineHeight: 1.8,
    textAlign: 'center'
  }
});

interface Props extends React.ComponentProps<typeof StyledDeviceNotSupported> {
  
};

const MotionLink = motion(Link);

const DeviceNotSupported: React.FC<Props> = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <StyledDeviceNotSupported {...props}
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
      <Header style={{ fontSize: '32px', textAlign: 'center' }}>Device Type Not Supported</Header>
      <p>Sorry!! At the moment only desktop browsers are supported.</p>
    </StyledDeviceNotSupported>
  );
};

export default DeviceNotSupported;