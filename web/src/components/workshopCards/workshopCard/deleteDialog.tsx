import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@styleProvider';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import { Button } from '@components/button';


const StyledHeader = styled('h1', {
  fontFamily: '$firacode',
  fontSize: '20px',
  color: '$gray050',
  fontWeight: 400
});

const StyledBodyText = styled('p', {
  fontFamily: '$inter',
  fontSize: '15px',
  color: '$gray650'
});

const StyledFooter = styled('div', {
  width: '100%',
  display: 'grid',
  justifyContent: 'end',
  gap: '10px',
  // gridTemplateColumns: 'repeat(auto-fit, max(120px))',  // FIXME
  gridTemplateColumns: 'repeat(auto-fill, max(120px))',
});

const StyledDeleteDialog = styled(motion.div, {
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

interface Props extends React.ComponentProps<typeof StyledDeleteDialog> {
  close: () => void;
};

const DeleteDialog: React.FC<Props> = React.forwardRef(({ close, ...props }, ref) => {
  return (
    <StyledDeleteDialog {...props} ref={ref}
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
      <StyledHeader>Delete Workshop</StyledHeader>
      <StyledBodyText>You sure you want to delete this workshop?</StyledBodyText>
      <StyledFooter>
        <Button onClick={() => close()} size="s">Cancel</Button>
        <Button size="s" style={'red'}>Confirm</Button>
      </StyledFooter>
    </StyledDeleteDialog>
  );
});

export default DeleteDialog;