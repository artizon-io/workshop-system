import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';

type StyledLoadingVariants = Stitches.VariantProps<typeof StyledLoading>

const StyledLoading = styled(motion.main, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  '& > span > svg': {
    color: '$gray600'
  },
  '& > h1': {
    color: '$gray300',
    fontFamily: '$firacode',
    fontWeight: 600
  },
});

interface Props extends React.ComponentProps<typeof StyledLoading> {
  
};

// const MotionIoSettingsSharp = motion(IoSettingsSharp);

const Loading: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLoading {...props}
      initial={{
        opacity: 0,
        scale: 0.9,
        y: -30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        opacity: {
          duration: 0.2
        }
      }}
    >
      <motion.span
        initial={{
          rotate: 0
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: 0.6,
        }}
      >
        <IoSettingsSharp style={{ fontSize: '80px' }}/>
      </motion.span>
      <h1>Loading</h1>
    </StyledLoading>
  );
};

export default Loading;