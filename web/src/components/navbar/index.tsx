import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Link } from '../link';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileBubble } from './profileBubble';
import { motion, useAnimation, useAnimationFrame, useScroll, useSpring, useTransform } from 'framer-motion';
import Logo from './logo';

type StyledNavBarVariants = Stitches.VariantProps<typeof StyledNavBar>

const StyledNavBar = styled(motion.header, {
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  '& > nav > div': {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
  },
  '& > nav > div > ul': {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  '& > .progressbar': {
    backgroundColor: '$blue300',
    transformOrigin: '0%',
    height: '4px',
  },
  variants: {
    variant: {
      'full': {
        '& > nav': {
          padding: '40px 50px',
          backgroundColor: '$gray950',
        },
        // '& > .progressbar': {
        //   height: '0px',
        // }
      },
      'slim': {
        '& > nav': {
          padding: '20px 50px',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        },
        // '& > .progressbar': {
        //   height: '5px'
        //   // borderBottom: '1px solid',
        //   // borderBottomColor: '$gray850'
        // } 
      }
    }
  },
});

interface Props extends React.ComponentProps<typeof StyledNavBar> {
  img?: string;
};

const NavBar: React.FC<Props> = ({ img, ...props }) => {
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
    <StyledNavBar {...props} layout variant={atTop ? 'full' : 'slim'}
      initial={{
        y: -100
      }}
      animate={{
        y: 0,
      }}
      exit={{
        y: -100,
        transition: {
          ease: 'easeIn'
        }
      }}
    >
      <motion.nav layout>
        <motion.div layout>
          <Logo to="/"/>
          <span></span>
          <ul>
            <li><Link to="/admin/user-management">User Management</Link></li>
            <li><Link to="/support">Support</Link></li>
            {img &&
            <ProfileBubble img={img}>
            </ProfileBubble>
            }
          </ul>
        </motion.div>
      </motion.nav>
      <motion.div className="progressbar" style={{ scaleX }}/>
    </StyledNavBar>
  );
};

export default NavBar;