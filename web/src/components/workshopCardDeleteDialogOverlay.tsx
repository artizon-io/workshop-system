import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AlertDialogOverlay } from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';

type StyledWorkshopCardDeleteDialogOverlayVariants = Stitches.VariantProps<typeof StyledWorkshopCardDeleteDialogOverlay>

// keyframes(

// );

const StyledWorkshopCardDeleteDialogOverlay = styled(AlertDialogOverlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  zIndex: 2000,
  backdropFilter: 'blur(3px)',
  position: 'fixed',
  inset: 0
});

interface Props extends React.ComponentProps<typeof StyledWorkshopCardDeleteDialogOverlay> {
  close: () => void;
};

const WorkshopCardDeleteDialogOverlay: React.FC<Props> = React.forwardRef(({ ...props }, ref) => {
  return (
    <StyledWorkshopCardDeleteDialogOverlay {...props} asChild={true} ref={ref}>
      <motion.div
        // onClick={close}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{

        }}
        exit={{
          opacity: 0
        }}
      />
    </StyledWorkshopCardDeleteDialogOverlay>
  );
});

export default WorkshopCardDeleteDialogOverlay;