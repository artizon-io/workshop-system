import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Link } from './link';
import { motion, useAnimation, useAnimationFrame, useScroll, useSpring, useTransform } from 'framer-motion';
import { CgCopyright } from 'react-icons/cg'

type StyledFooterVariants = Stitches.VariantProps<typeof StyledFooter>

const StyledCopyright = styled('p', {
  fontSize: '13px',
  fontFamily: '$ibmplexmono',
  color: '$gray650',
  flexbox: 'row',
  gap: '5px'
});

const Copyright : React.FC = ({ ...props }) => {
  return (
    <StyledCopyright className='copyright'>
      <CgCopyright/>Workshop System 2022
    </StyledCopyright>
  )
}

Copyright.toString = () => '.copyright'

const StyledNav = styled('nav', {
  '& > ul': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
});

const Nav : React.FC = ({ ...props }) => {
  return (
    <StyledNav>
      <ul>
        <li><Link to="/terms-&-conditions" underline style={'gray'} size={'s'}>Terms & Conditions</Link></li>
        <li><Link to="/customer-support" underline style={'gray'} size={'s'}>Customer Support</Link></li>
        <li><Link to="#" as='a' underline style={'gray'} size={'s'}>Back to top</Link></li>
      </ul>
    </StyledNav>
  )
}

const StyledFooter = styled(motion.footer, {
  width: '100vw',
  zIndex: 1000,
  '@imac': {
    padding: '60px 80px',
  },
  '@macbook': {
    padding: '60px 6vw',
  },
  '@ipad': {
    padding: '60px 6vw',
  },
  '@iphone': {
    padding: '60px 8vw',
  },
  backgroundColor: '$gray950',

  position: 'relative',
  [`& > ${Copyright}`]: {
    position: 'absolute',
    bottom: '20px',
    right: '30px',
  },
});

interface Props extends React.ComponentProps<typeof StyledFooter> {
  img?: string;
};

const Footer: React.FC<Props> = ({ img, ...props }) => {
  const { scrollY } = useScroll();
  const [atTop, setAtTop] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Detect if scrollY has value or not
  // const height = useTransform(scrollY, [0, 1], [300, 100]); nice attempt
  useAnimationFrame(t => {
    setAtTop(scrollY.get() < 100);
  });

  return (
    <StyledFooter {...props} layout
      initial={{
        y: 100
      }}
      animate={{
        y: 0,
      }}
      exit={{
        y: 100,
        transition: {
          ease: 'easeIn'
        }
      }}
    >
      <Nav/>
      <Copyright/>
    </StyledFooter>
  );
};

export default Footer;