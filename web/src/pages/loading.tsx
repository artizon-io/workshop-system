import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion, Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import Header from '@components/header';
import SettingsIcon from '@components/settingsIcon';

type StyledLoadingVariants = Stitches.VariantProps<typeof StyledLoading>

const StyledLoading = styled(motion.main, {
  flexbox: 'column',
  gap: '20px',
});

interface Props extends React.ComponentProps<typeof StyledLoading> {
  
};

const settingsIconVariants : Variants = {
  initial: {
    rotate: 0
  },
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      duration: 1,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      repeat: 0
    }
  }
}

// const MotionIoSettingsSharp = motion(IoSettingsSharp);

const Loading: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLoading {...props}
      initial="initial"
      animate="animate"
      exit="exit"
      // transition={{
      //   when: 'afterChildren'
      // }}
    >
      <SettingsIcon
        size='m'
        variants={settingsIconVariants}
      />
      <Header>Loading</Header>
    </StyledLoading>
  );
};

export default Loading;