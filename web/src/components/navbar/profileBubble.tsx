import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger, Root as PopoverRoot } from '@radix-ui/react-popover';
import { Link } from '@components/link';
import { MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import { HiExternalLink } from 'react-icons/hi';
import { useAuth } from 'reactfire';
import { redirect } from 'react-router-dom';

type StyledProfileBubbleVariants = Stitches.VariantProps<typeof StyledProfileBubble>

const StyledAnchor = styled(PopoverAnchor, {
  // display: 'none',
  position: 'absolute',
  bottom: '-20px',
  left: '50%',
});

const Anchor : React.FC = ({ ...props }) => {
  return (
    <StyledAnchor asChild={true} {...props}>
      <div />
    </StyledAnchor>
  );
}

Anchor.toString = () => '.anchor';

const StyledTrigger = styled(PopoverTrigger, {
  position: 'relative',
  background: 'transparent',
  '& > img': {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
  },
  '& > img:hover': {
    cursor: 'pointer'
  },
});

const Trigger : React.FC<{
  img: string;
  toggle: () => void;
} & React.ComponentProps<typeof StyledTrigger>> = ({ img, toggle, ...props }) => {
  return (
    <StyledTrigger {...props}>
      <motion.img src={img}
        onClick={() => toggle()}
        whileHover={{
          scale: 1.1
        }}
        whileTap={{
          scale: 1
        }}
      />
      <Anchor/>
    </StyledTrigger>
  );
}

const listVariants : Variants = {
  close: {  // initial & exit
    // y: -20,
    // Careful: also clip arrow
    clipPath: "inset(50% 50% 50% 50% round 8px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3
    }
  },
  open: {  // animate
    // y: 0,
    clipPath: "inset(0% 0% 0% 0% round 8px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    }
  },
};

const listItemVariants : Variants = {
  close: {  // initial & exit
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.5
    }
  },
  open: {  // animate
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
};

const StyledPopover = styled(PopoverContent, {
  zIndex: 5000,
  flexbox: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  backgroundColor: '$gray500',
  padding: '30px',
  [`& > li > ${Link}`]: {
    flexbox: 'row',
    gap: '5px'
  }
});

const Popover : React.FC<{
  close: () => void;
} & React.ComponentProps<typeof StyledPopover>> = React.forwardRef(({ close, ...props }, ref) => {
  const auth = useAuth();

  return (
    <StyledPopover asChild={true} forceMount={true} {...props} side='bottom' ref={ref}>
      <motion.ul
        initial='close'
        animate='open'
        exit='close'
        variants={listVariants}
      >
        <motion.li variants={listItemVariants}>
          <Link to="/support" style={'white'} size={'s'} onClick={e => {
            close();
          }}>
            <MdOutlineManageAccounts style={{ transform: 'translate(0px, -1px)', fontSize: '17px' }}/>
            Account Management
          </Link>
        </motion.li>
        <motion.li variants={listItemVariants}>
          <Link to="/support" style={'white'} size={'s'} onClick={e => {
            close();
          }}>
            <HiExternalLink style={{ transform: 'translate(0px, 0px)', fontSize: '15px' }}/>
            Stripe Dashboard
          </Link>
        </motion.li>
        <motion.li variants={listItemVariants}>
          <Link to="/" style={'white'} size={'s'} onClick={e => {
            close();
            auth.signOut();
            // auth.signOut().then(() => close());
            // FIXME: not triggering animate presence because of promise
          }}>
            <MdLogout style={{ transform: 'translate(0px, 0px)', fontSize: '15px' }}/>
            Logout
          </Link>
        </motion.li>
      </motion.ul>
    </StyledPopover>
  )
});

const StyledProfileBubble = styled(PopoverRoot, {

});

interface Props extends React.ComponentProps<typeof StyledProfileBubble> {
  img: string;
};

export const ProfileBubble: React.FC<Props> = ({ img, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setIsOpen(false))
  }, []);

  return (
    <StyledProfileBubble {...props} open={isOpen}>
      <Trigger img={img} toggle={() => setIsOpen(state => !state)}/>
      <AnimatePresence>
        {/* Directly controlling popover open/close logic */}
        {/* See https://github.com/radix-ui/primitives/discussions/1058 */}
        {isOpen &&
        // Portal will cause popover be outside of the top-level animate presence
        // <PopoverPortal forceMount={true}>
        <Popover close={() => setIsOpen(false)}/>
        // </PopoverPortal>
        }
      </AnimatePresence>
      {/* <Popover close={() => setIsOpen(false)}/> */}
    </StyledProfileBubble>
  );
};