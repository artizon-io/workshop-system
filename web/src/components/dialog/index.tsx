import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@styleProvider';
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Root as DialogRoot } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { Button } from '@components/button';


const StyledDialog = styled(motion.div, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 20000,
  // transform: 'translate(-50%, -50%) !important',  // framer motion needs to animate this...

  flexbox: 'column',
  justifyContent: 'normal',
  margin: 'auto',
  // https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
  alignItems: 'stretch',
  borderRadius: '23px',
  backgroundColor: '$gray950',

  overflow: 'scroll',

  variants: {
    spacing: {
      'compact': {
        gap: '15px',
        padding: '30px',

        maxHeight: '95%',
        maxWidth: '95%',
      },
      'normal': {
        gap: '30px',
        padding: '40px',

        maxHeight: '80%',
        maxWidth: '80%',
      }
    }
  },

  defaultVariants: {
    spacing: 'normal'
  }
});

interface Props extends React.ComponentProps<typeof StyledDialog> {

};

const Dialog: React.FC<Props> = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <StyledDialog {...props} ref={ref}
      initial={{
        opacity: 0,
        y: -30,
        translateX: '-50%',
        translateY: '-50%'
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        y: {
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.2
        }
      }}
      exit={{
        opacity: 0,
        y: -30
      }}
    >
      {children}
    </StyledDialog>
  );
});

export default Dialog;