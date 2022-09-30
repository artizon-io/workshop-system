import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Link } from '../link';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileBubble } from './profileBubble';
import { LayoutGroup, motion, MotionProps, useAnimation, useAnimationFrame, useScroll, useSpring, useTransform } from 'framer-motion';
import Logo from './logo';
import profileIcon from '@assets/profileIcon.jpg';

type StyledNavBarVariants = Stitches.VariantProps<typeof StyledNavBar>

const StyledNav = styled(motion.nav, {
  flexbox: "row",
  justifyContent: 'space-between',
  '& > ul': {
    flexbox: 'row',
    gap: '30px',
  },
  variants: {
    state: {
      'full': {
        padding: '40px 50px',
        backgroundColor: '$gray950',
      },
      'slim': {
        padding: '20px 50px',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }
    }
  },
  defaultVariants: {
    state: 'full'
  }
});

const Nav : React.FC<{
  adminMode: boolean;
} & React.ComponentProps<typeof StyledNav>> = ({ adminMode, ...props }) => {
  return (
    <StyledNav layout {...props}
      // transition={{
      //   when: 'afterChildren'
      // }}
    >
      <Logo to="/" layout/>
      <motion.ul layout>
        <li><Link to="/admin/user-management" style={'gray'}>User Management</Link></li>
        <li><Link to="/support" style={'gray'}>Support</Link></li>
        {adminMode &&
        <ProfileBubble img={profileIcon}/>
        }
      </motion.ul>
    </StyledNav>
  );
}

const StyledProgressbar = styled(motion.div, {
  backgroundColor: '$blue300',
  height: '4px',
});

const Progressbar : React.FC<React.ComponentProps<typeof StyledProgressbar>> = ({ ...props }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <StyledProgressbar {...props}
      layout
      style={{ scaleX, originX: 0 }}
    />
  );
}

const StyledNavBar = styled(motion.header, {
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
});

interface Props extends React.ComponentProps<typeof StyledNavBar> {
  adminMode?: boolean;
};

const NavBar: React.FC<Props> = ({ adminMode = false, ...props }) => {
  const { scrollY } = useScroll();
  const [atTop, setAtTop] = useState(true);

  // Detect if scrollY has value or not
  // const height = useTransform(scrollY, [0, 1], [300, 100]); nice attempt
  useAnimationFrame(t => {
    setAtTop(scrollY.get() < 100);
  });

  return (
    <StyledNavBar {...props}
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
      <LayoutGroup>
        <Nav adminMode={adminMode} state={atTop ? 'full' : 'slim'}/>
        <Progressbar/>
      </LayoutGroup>
    </StyledNavBar>
  );
};

export default NavBar;