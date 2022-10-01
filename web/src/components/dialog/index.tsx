import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@styleProvider';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import { Button } from '@components/button';


const StyledDialog = styled(motion.div, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 20000,
  // transform: 'translate(-50%, -50%) !important',  // framer motion needs to animate this...

  flexbox: 'column',
  alignItems: 'flex-start',
  gap: '30px',
  padding: '40px',
  borderRadius: '23px',
  backgroundColor: '$gray950',

  // [`& > ${StyledFooter}`]: {
  //   alignSelf: 'flex-end',
  // }
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