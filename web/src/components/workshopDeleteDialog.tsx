import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';

type StyledWorkshopDeleteDialogVariants = Stitches.VariantProps<typeof StyledWorkshopDeleteDialog>

const StyledWorkshopDeleteDialog = styled(AlertDialogRoot, {
  
});

interface Props extends React.ComponentProps<typeof StyledWorkshopDeleteDialog> {
  
};

const WorkshopDeleteDialog: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWorkshopDeleteDialog {...props}>
      <AlertDialogTrigger />
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle />
          <AlertDialogDescription />
          <AlertDialogCancel />
          <AlertDialogAction />
        </AlertDialogContent>
      </AlertDialogPortal>
    </StyledWorkshopDeleteDialog>
  );
};

export default WorkshopDeleteDialog;