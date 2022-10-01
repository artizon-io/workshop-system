import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import WorkshopCard from './workshopCard';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, StyledButtonVariants } from '@components/button';
import { AlertDialogContent, AlertDialogPortal, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';  // TODO: use dialog instead of alertdialog?
import { MdAdd } from 'react-icons/md';
import Overlay from '@components/dialog/overlay';
import Dialog from '@components/dialog';
import DialogHeader from '@components/dialog/dialogHeader';
import DialogFooter from '@components/dialog/dialogFooter';
import { Form, Formik } from 'formik';
import { WorkshopSchema } from '@mingsumsze/common';
import { toFormikValidationSchema } from '@artizon/zod-formik-adapter';
import { Input } from '@components/input';

type StyledWorkshopCardsVariants = Stitches.VariantProps<typeof StyledWorkshopCards>

const StyledAddTrigger = styled(AlertDialogTrigger, {
  
});

const AddTrigger: React.FC<{
  open: () => void;
} & React.ComponentProps<typeof StyledAddTrigger>> = React.forwardRef(({ open, ...props }, ref) => {
  return (
    <StyledAddTrigger {...props} asChild={true}>
      <Button style={'lightgray'} size={'round'} ref={ref}  // FIXME: button style not working
        onClick={() => open()}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: {
            scale: {
              type: 'spring',
              damping: 20,
              restSpeed: 0.1,  // somehow set to a high default
            }
          }
        }}
        exit={{
          opacity: 0,
          scale: 0,
          transition: {
            opacity: {
              duration: 0.2
            }
          }
        }}
      >
        <MdAdd style={{ fontSize: '20px' }}/>
      </Button>
    </StyledAddTrigger>
  )
});

const StyledAddDialogForm = styled(Form, {
  display: 'flex',
  flexDirection: 'column',
  gap: '25px'
})

const StyledAddDialog = styled(Dialog, {
  
});

const AddDialog: React.FC<{
  close: () => void;
} & React.ComponentProps<typeof StyledAddDialog>> = React.forwardRef(({ close, ...props }, ref) => {
  const [buttonState, setButtonState] = useState<StyledButtonVariants['state']>('disabled');

  return (
    <StyledAddDialog {...props} ref={ref}>
      <DialogHeader>Create Workshop</DialogHeader>
      <Formik
        initialValues={{
          title: '',
          description: '',
          venue: '',
          fee: '',
          duration: '',
          language: '',
          capacity: '',
          date: '',
          time: '',
        }}
        onSubmit={async data => {
          setButtonState('loading');
        }}
        validationSchema={toFormikValidationSchema(WorkshopSchema)}
      >
        {/* {props => {
          const formikHandleChange = props.handleChange;
          props.handleChange = (e: React.ChangeEvent<any>) => {
            phoneInputOnChange(e);
            formikHandleChange(e);
          };
          return (
            <StyledAddDialogForm autoComplete="off">
              <Input type="tel" name={'phone'} placeholder="Phone" ref={phoneInputRef} onChange={props.handleChange} value={props.values.phone} state={phoneInputState}></Input>
              <button type="submit" style={{ display: 'none' }}/>
            </StyledAddDialogForm>
          );
        }} */}
      </Formik>
      <DialogFooter>
        <Button onClick={() => close()} size="s">Cancel</Button>
        <Button size="s" style={'blue'} state={buttonState}>Create</Button>
      </DialogFooter>
    </StyledAddDialog>
  )
});

const StyledWorkshopCards = styled('div', {
  flexbox: 'column',
  gap: '40px',
});

interface Props extends React.ComponentProps<typeof StyledWorkshopCards> {
  adminMode?: boolean;
};

const WorkshopCards: React.FC<Props> = ({ adminMode = false, ...props }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <StyledWorkshopCards {...props}>
      <WorkshopCard workshopId={"someId"} adminMode={adminMode}/>
      <WorkshopCard workshopId={"someId"} adminMode={adminMode}/>
      <WorkshopCard workshopId={"someId"} adminMode={adminMode}/>
      {adminMode &&
      <AlertDialogRoot>
        <AddTrigger open={() => setDialogOpen(true)}/>
        <AnimatePresence>
          {dialogOpen &&
          <AlertDialogPortal forceMount={true}>
            <Overlay/>
            <AlertDialogContent asChild={true} forceMount={true}>
              <AddDialog close={() => setDialogOpen(false)}/>
            </AlertDialogContent>
          </AlertDialogPortal>
          }
        </AnimatePresence>
      </AlertDialogRoot>
      }
    </StyledWorkshopCards>
  );
};

export default WorkshopCards;