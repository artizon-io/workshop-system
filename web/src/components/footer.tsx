import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Link } from './link';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useAnimation, useAnimationFrame, useScroll, useSpring, useTransform } from 'framer-motion';
import { CgCopyright } from 'react-icons/cg'

type StyledFooterVariants = Stitches.VariantProps<typeof StyledFooter>

const StyledFooter = styled(motion.footer, {
  position: 'relative',
  width: '100vw',
  zIndex: 1000,
  padding: '60px 80px',
  backgroundColor: '$gray950',
  '& > nav > ul': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  '& > nav > ul > li > a': {
    fontSize: '13px'
  },
  '& > p': {
    position: 'absolute',
    bottom: '20px',
    right: '30px',
    fontSize: '13px',
    fontFamily: '$ibmplexmono',
    color: '$gray650',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  }
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
      <nav>
        <ul>
          <li><Link to="#">Terms & Conditions</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="#">Back to top</Link></li>
        </ul>
      </nav>
      <p><CgCopyright style={{ fontSize: '16px' }}/>Workshop System 2022</p>
    </StyledFooter>
  );
};

export default Footer;