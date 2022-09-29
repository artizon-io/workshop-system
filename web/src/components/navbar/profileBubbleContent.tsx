import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { PopoverArrow, PopoverClose, PopoverContent } from '@radix-ui/react-popover';
import { motion, Variants } from 'framer-motion';
import { MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import { HiExternalLink } from 'react-icons/hi';
import { useAuth } from 'reactfire';

type StyledProfileBubbleContentVariants = Stitches.VariantProps<typeof StyledProfileBubbleContent>

const StyledProfileBubbleContent = styled(motion.ul, {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  backgroundColor: '$gray500',
  padding: '30px 30px',
  zIndex: 2000,
  variants: {
    style: {
      'next': {
        '& > li > a' : {
          fontSize: '13px',
          color: '$gray800',
          fontWeight: 400,
          fontFamily: '$firacode',
        },
        '& > li > a:hover' : {
          color: '$gray1000',
          cursor: 'pointer'
        }
      }
    }
  },
  defaultVariants: {
    style: 'next'
  }
});

interface Props extends React.ComponentProps<typeof StyledProfileBubbleContent> {
  isOpen: boolean;
};

const listVariants : Variants = {
  close: {  // initial & exit
    // y: -20,
    // Careful: also clip arrow
    clipPath: "inset(10% 35% 90% 65% round 8px)",
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

export const ProfileBubbleContent: React.FC<Props> = React.forwardRef(({ isOpen, ...props }, ref) => {
  const auth = useAuth();

  return (
    <StyledProfileBubbleContent {...props} ref={ref}
      initial='close'
      animate='open'
      exit='close'
      variants={listVariants}
    >
      {/* <PopoverClose /> */}
      <motion.li
        variants={listItemVariants}
      >
        <a href="#" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <MdOutlineManageAccounts style={{ transform: 'translate(0px, -1px)', fontSize: '17px' }}/>
          <span>Account Management</span>
        </a>
      </motion.li>
      <motion.li
        variants={listItemVariants}
      >
        <a href="#" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <HiExternalLink style={{ transform: 'translate(0px, 0px)', fontSize: '15px' }}/>
          <span>Stripe Dashboard</span>
        </a>
      </motion.li>
      <motion.li
        variants={listItemVariants}
      >
        {/* <a href="#">Settings</a> */}
      </motion.li>
      <motion.li
        variants={listItemVariants}
      >
        <a onClick={() => auth.signOut()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <MdLogout style={{ transform: 'translate(0px, 0px)', fontSize: '15px' }}/>
          <span>Logout</span>
        </a>
      </motion.li>
    </StyledProfileBubbleContent>
  );
});