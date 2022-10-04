import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@styleProvider';
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Root as DialogRoot } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { Button } from '@components/button';
import Dialog from '@components/dialog';
import DialogHeader from '@components/dialog/dialogHeader';
import DialogFooter from '@components/dialog/dialogFooter';


const StyledBodyText = styled('p', {
  fontFamily: '$inter',
  color: '$gray650',
  fontSize: '15px',
});

const StyledDeleteDialog = styled(Dialog, {

});

interface Props extends React.ComponentProps<typeof StyledDeleteDialog> {
  close: () => void;
};

const DeleteDialog: React.FC<Props> = React.forwardRef(({ close, ...props }, ref) => {
  return (
    <StyledDeleteDialog>
      <DialogHeader>Delete Workshop</DialogHeader>
      <StyledBodyText>You sure you want to delete this workshop?</StyledBodyText>
      <DialogFooter>
        <Button onClick={() => close()} size="s">Cancel</Button>
        <Button size="s" style={'red'}>Confirm</Button>
      </DialogFooter>
    </StyledDeleteDialog>
  );
});

export default DeleteDialog;