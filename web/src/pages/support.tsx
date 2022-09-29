import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';

type StyledSupportVariants = Stitches.VariantProps<typeof StyledSupport>

const StyledSupport = styled(motion.main, {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  '& > span > svg': {
    color: '$gray600'
  },
  '& > h1': {
    color: '$gray300',
    fontFamily: '$firacode',
    fontWeight: 600
  },
});

interface Props extends React.ComponentProps<typeof StyledSupport> {
  
};

// const MotionIoSettingsSharp = motion(IoSettingsSharp);

const Support: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledSupport {...props}
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
      <h1>Support</h1>
    </StyledSupport>
  );
};

export default Support;