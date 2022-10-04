import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { Link } from '../link';
import { Link as RouterLink } from 'react-router-dom';
import { ProfileBubble } from './profileBubble';
import { LayoutGroup, motion, MotionProps, useAnimation, useAnimationFrame, useScroll, useSpring, useTransform } from 'framer-motion';
import Logo from './logo';
import cat1Icon from '@assets/cat1.jpg';
import cat2Icon from '@assets/cat2.jpg';
import cat3Icon from '@assets/cat3.jpg';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { LinkPopover } from './linkPopover';
import Logger from 'js-logger';

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
        '@imac': {
          padding: '40px 50px',
        },
        '@ipad': {
          padding: '40px 5vw',
        },
        backgroundColor: '$gray950',
      },
      'slim': {
        '@imac': {
          padding: '20px 50px',
        },
        '@ipad': {
          padding: '20px 5vw',
        },
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
  const { width, height } = useWindowDimensions();

  return (
    <StyledNav layout {...props}
      // transition={{
      //   when: 'afterChildren'
      // }}
    >
      <Logo to="/" layout/>
      <motion.ul layout>
        {width > 768
          ? <>
            <li><Link to="/admin/user-management" style={'gray'}>User Management</Link></li>
            <li><Link to="/support" style={'gray'}>Support</Link></li>
          </>
          : <LinkPopover>
            <Link to="/admin/user-management" style={'white'}>User Management</Link>
            <Link to="/support" style={'white'}>Support</Link>
          </LinkPopover>
        }
        {adminMode &&
        <ProfileBubble img={cat1Icon}/>
        // <ProfileBubble img={cat2Icon}/>
        // <ProfileBubble img={cat3Icon}/>
        }
      </motion.ul>
    </StyledNav>
  );
}

const StyledProgressbar = styled(motion.div, {
  backgroundColor: '$gray300',
  height: '2px',
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