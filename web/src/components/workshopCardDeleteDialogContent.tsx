import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

type StyledWorkshopCardDeleteDialogVariants = Stitches.VariantProps<typeof StyledWorkshopCardDeleteDialogContent>

const StyledWorkshopCardDeleteDialogContent = styled(motion.div, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  // transform: 'translate(-50%, -50%) !important',
  // transform: 'translate(-50%, -50%)',
  zIndex: 3000,

  backgroundColor: '$gray950',
  borderRadius: '20px',
  padding: '50px',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  '& > .title': {
    fontFamily: '$firacode',
    fontSize: '22px',
    color: '$gray050',
    fontWeight: 400
  },
  '& > .description': {
    fontFamily: '$inter',
    fontSize: '15px',
    color: '$gray650'
  },
  '& > .footer': {
    alignSelf: 'flex-end',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max(100px))',
    gap: '10px'
  },
  '& > .footer > .btn': {
    background: '$blue300',
    fontFamily: '$firacode',
    color: '$gray900',
    padding: '14px 20px',
    borderRadius: '15px',
    display: 'inline-block',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '14px'
  },
  '& > .footer > .cancelbtn': {
    background: '$gray700',
  },
  '& > .footer > .confirmbtn': {
    background: '$red500sss',
  },
});

interface Props extends React.ComponentProps<typeof StyledWorkshopCardDeleteDialogContent> {
  close: () => void;
};

const WorkshopCardDeleteDialogContent: React.FC<Props> = React.forwardRef(({ close, ...props }, ref) => {
  return (
    <StyledWorkshopCardDeleteDialogContent {...props} ref={ref}
      initial={{
        opacity: 0,
        scale: 0.5,
        x: '-50%',
        y: '-50%'
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        opacity: {
          ease: 'easeOut',
        },
        scale: {
          type: 'spring',
          mass: 0.2,
          stiffness: 150,
          damping: 20
        }
      }}
      exit={{
        opacity: 0,
        scale: 0.5
      }}
    >
      <AlertDialogTitle className='title'>Delete Workshop</AlertDialogTitle>
      <AlertDialogDescription className='description'>You sure you want to delete this workshop?</AlertDialogDescription>
      <span></span>
      <div className='footer'>
        <AlertDialogCancel asChild={true}>
          <motion.button className="btn cancelbtn" onClick={close}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95
            }}
          >
            Cancel
          </motion.button>
        </AlertDialogCancel>
        <AlertDialogAction asChild={true}>
          <motion.button className="btn confirmbtn" onClick={close}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95
            }}
          >
            Confirm
          </motion.button>
        </AlertDialogAction>
      </div>
    </StyledWorkshopCardDeleteDialogContent>
  );
});

export default WorkshopCardDeleteDialogContent;