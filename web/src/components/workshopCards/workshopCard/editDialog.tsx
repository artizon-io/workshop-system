import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@styleProvider';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import { Button } from '@components/button';
import Dialog from '@components/dialog';
import DialogHeader from '@components/dialog/dialogHeader';
import DialogFooter from '@components/dialog/dialogFooter';


const StyledEditDialog = styled(Dialog, {

});

interface Props extends React.ComponentProps<typeof StyledEditDialog> {
  close: () => void;
};

const EditDialog: React.FC<Props> = React.forwardRef(({ close, ...props }, ref) => {
  return (
    <StyledEditDialog>
      <DialogHeader>Edit Workshop Details</DialogHeader>
      <DialogFooter>
        <Button onClick={() => close()} size="s">Cancel</Button>
        <Button size="s" style={'blue'}>Apply</Button>
      </DialogFooter>
    </StyledEditDialog>
  );
});

export default EditDialog;