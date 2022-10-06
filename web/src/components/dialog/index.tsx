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
        '@imac': {
          gap: '15px',
          padding: '30px',

          height: '95vh',
          maxHeight: '95vh',
          width: '95vw',  // TODO: not going to maxWidth even if element needs that space
          maxWidth: '95vh',
        },
        '@ipad': {
          gap: '10px',
          padding: '30px',

          height: '95vh',
          maxHeight: '95vh',
          width: '95vw',
          maxWidth: '95vh',
        }
      },
      'normal': {
        gap: '30px',

        '@imac': {
          maxHeight: '80vh',
          maxWidth: '80vw',
          padding: '40px',
        },
        '@ipad': {
          maxHeight: '90vh',  // TODO: make height & width better
          width: '90vw',
          maxWidth: '90vw',
          padding: '40px 30px',  // adhoc fix for above
        }
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