import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type StyledLandingVariants = Stitches.VariantProps<typeof StyledLanding>

const StyledLanding = styled(motion.main, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  '& > h1': {
    fontFamily: '$firacode',
    color: '$blue300',
    fontSize: '100px'
  },
  '& > nav': {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
  },
  '& > nav > a': {
    fontFamily: '$ibmplexmono',
    color: '$gray900',
    fontsize: '20px',
    borderRadius: '20px',
    backgroundColor: '$gray500',
    padding: '12px 20px',
    transition: 'background-color 0.2s',
    textAlign: 'center'
  },
  '& > nav > a:hover': {
    backgroundColor: '$gray400',
  },
});

interface Props extends React.ComponentProps<typeof StyledLanding> {
  
};

const Landing: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledLanding {...props}
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
      <h1>Landing</h1>
      <nav>
        <Link to="/workshop">Workshops</Link>
        <Link to="/admin">Admin panel</Link>
        <Link to="/loading">Loading</Link>
        <Link to="/error">Error</Link>
        <Link to="/404">404</Link>
      </nav>
    </StyledLanding>
  );
};

export default Landing;