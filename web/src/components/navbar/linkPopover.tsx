import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger, Root as PopoverRoot } from '@radix-ui/react-popover';
import { Link } from '@components/link';
import { MdArrowDropDown, MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from 'react-icons/io';
import { HiExternalLink } from 'react-icons/hi';
import { useAuth } from 'reactfire';
import { redirect } from 'react-router-dom';
import Logger from 'js-logger';

type StyledLinkPopoverVariants = Stitches.VariantProps<typeof StyledLinkPopover>

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

const StyledTrigger = styled(motion(PopoverTrigger), {
  position: 'relative',
  background: 'transparent',
  color: '$gray650',
  '&:hover': {
    cursor: 'pointer'
  },
});

const Trigger : React.FC<{
  open: () => void;
} & React.ComponentProps<typeof StyledTrigger>> = ({ open, ...props }) => {
  return (
    <StyledTrigger {...props}
      onClick={() => open()}
      whileHover={{
        scale: 1.1
      }}
      whileTap={{
        scale: 1
      }}
    >
      <IoIosArrowDropdownCircle style={{ fontSize: '25px' }} />
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

const StyledPopover = styled(PopoverContent, {
  zIndex: 5000,
  flexbox: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  backgroundColor: '$gray300',
  margin: '0 30px',  // collision padding
  padding: '30px',
});

const Popover : React.FC<{
  close: () => void;
  setIsClose: (val: boolean) => void;
} & React.ComponentProps<typeof StyledPopover>> = React.forwardRef(({ close, setIsClose, children, ...props }, ref) => {
  const auth = useAuth();

  useEffect(() => {
    setIsClose(false);
    return () => setIsClose(true);
  }, []);

  return (
    <StyledPopover asChild={true} forceMount={true} {...props} side='bottom' ref={ref}
      // onInteractOutside={e => { close(); e.stopImmediatePropagation(); }}  // interactoutside is fired before the click event but they don't belong to the same event tree?
      onInteractOutside={e => close()}  // interactoutside is fired before the click event but they don't belong to the same event tree?
    >
      <motion.ul
        initial='close'
        animate='open'
        exit='close'
        variants={listVariants}
      >
        {children}
      </motion.ul>
    </StyledPopover>
  )
});

const StyledLinkPopover = styled(PopoverRoot, {

});

interface Props extends React.ComponentProps<typeof StyledLinkPopover> {

};

export const LinkPopover: React.FC<Props> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isClose = useRef(true);

  const setIsClose = (val : boolean) => { isClose.current = val };

  useEffect(() => {
    window.addEventListener('scroll', () => setIsOpen(false))
  }, []);

  return (
    <StyledLinkPopover {...props} open={isOpen}>
      <Trigger open={() => { if (isClose.current) setIsOpen(true); }}/>
      <AnimatePresence>
        {/* Directly controlling popover open/close logic */}
        {/* See https://github.com/radix-ui/primitives/discussions/1058 */}
        {isOpen &&
        <PopoverPortal forceMount={true}>
          <Popover close={() => setIsOpen(false)} setIsClose={setIsClose}>
            {children}
          </Popover>
        </PopoverPortal>
        }
      </AnimatePresence>
      {/* <Popover close={() => setIsOpen(false)}/> */}
    </StyledLinkPopover>
  );
};