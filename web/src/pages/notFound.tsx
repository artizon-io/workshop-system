import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { TbError404 } from 'react-icons/tb'

type StyledNotFoundVariants = Stitches.VariantProps<typeof StyledNotFound>

const StyledNotFound = styled(motion.main, {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& > div > svg': {
    color: '$gray600'
  },
  '& > div > h1': {
    color: '$gray300',
    fontFamily: '$firacode',
    fontWeight: 600
  },
  '& > a': {
    fontFamily: '$ibmplexmono',
    color: '$gray900',
    fontsize: '20px',
    borderRadius: '20px',
    backgroundColor: '$gray600',
    padding: '12px 20px',
    transition: 'background-color 0.2s'
  },
  '& > a:hover': {
    backgroundColor: '$gray500',
  },
});

interface Props extends React.ComponentProps<typeof StyledNotFound> {
  
};

const MotionLink = motion(Link);

const NotFound: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledNotFound {...props}
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
      <div>
        <TbError404 style={{ fontSize: '80px' }}/>
        <h1>Not Found</h1>
      </div>
      <MotionLink to="/"
        whileHover={{
          scale: 1.03
        }}
        whileTap={{
          scale: 0.97
        }}
      >
        Back to home
      </MotionLink>
    </StyledNotFound>
  );
};

export default NotFound;