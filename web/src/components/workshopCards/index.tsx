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
import { Form, Formik, useFormik } from 'formik';
import { WorkshopSchema } from '@mingsumsze/common';
import { toFormikValidationSchema } from '@artizon/zod-formik-adapter';
import { Input } from '@components/input';
import Logger from 'js-logger';

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

const StyledAddDialogForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '25px',
  backgroundColor: 'inherit',
})

const StyledAddDialog = styled(Dialog, {
  minWidth: '80%',
});

const AddDialog: React.FC<{
  close: () => void;
} & React.ComponentProps<typeof StyledAddDialog>> = React.forwardRef(({ close, ...props }, ref) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      venue: '',
      fee: '',
      duration: '',
      language: '',
      capacity: '',
      date: '',
      time: '',
      consent: false
    },
    initialStatus: 'waiting',
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (data, { setStatus, setFieldError, resetForm, setErrors }) => {
      setStatus('loading');

      // await submitOtp(Object.values(data).join(''))
      //   .then(() => {
      //     setStatus('success');
      //   })
      //   .catch(err => {
      //     Logger.error(err);
      //     setErrors({otp: 'Invalid'});
      //   });
    },
    validate: ({
      capacity, consent, date, description, duration, fee, language, time, title, venue
    }) => {
      let errors : {[key: string]: string} = {};
      if (!consent)
        errors.consent = 'Invalid'

      const data = WorkshopSchema.safeParse({
        title,
        capacity,
        description,
        duration,
        fee,
        language,
        venue
      });
      if (!data.success) {
        // TODO: make error message better
        Object.keys(data.error.format).forEach(field => errors[field] = "Invalid");
      }
      return errors;
    },
  });

  useEffect(() : any => {
    formik.setErrors({});

    // if (!formik.dirty)
    if ((Object.keys(formik.values) as Array<keyof typeof formik.values>).some(field => formik.values[field] === formik.initialValues[field]))
      formik.setStatus('waiting');

    else
      formik.setStatus('normal');

  }, [formik.values]);

  useEffect(() => {
    if (Object.keys(formik.errors).length > 0) {  // note that {} is truthy
      Logger.debug(formik.errors);
      formik.setStatus('error');
    }
  }, [formik.errors]);

  return (
    <StyledAddDialog {...props} ref={ref} spacing="compact">
      <DialogHeader>Create Workshop</DialogHeader>
      <StyledAddDialogForm autoComplete={'off'} onSubmit={formik.handleSubmit}>
        <Input
          type="text" name={'title'}
          // required={formik.}
          onChange={formik.handleChange} value={formik.values.title}
          state={formik.status} thickness={'thin'}
        >Workshop Title</Input>
        <Input
          type="textarea" name={'description'}
          onChange={formik.handleChange} value={formik.values.description}
          state={formik.status} thickness={'thin'}
        >Description</Input>
        <Input
          type="text" name={'venue'}
          onChange={formik.handleChange} value={formik.values.venue}
          state={formik.status} thickness={'thin'}
        >Venue/Location</Input>
        <Input
          type="number" name={'fee'} placeholder="Enroll fee, in HKD"
          onChange={formik.handleChange} value={formik.values.fee}
          state={formik.status} thickness={'thin'}
        >Fee</Input>
        <Input
          type="number" name={'duration'}
          onChange={formik.handleChange} value={formik.values.duration}
          state={formik.status} thickness={'thin'}
        >Duration</Input>
        <Input
          type="text" name={'language'}
          onChange={formik.handleChange} value={formik.values.language}
          state={formik.status} thickness={'thin'}
        >Language</Input>
        <Input
          type="number" name={'capacity'} placeholder="Maximum allowance of the number of participants"
          onChange={formik.handleChange} value={formik.values.capacity}
          state={formik.status} thickness={'thin'}
        >Capacity</Input>
        <Input
          type="date" name={'date'}
          onChange={formik.handleChange} value={formik.values.date}
          state={formik.status} thickness={'thin'}
        >Date</Input>
        <Input
          type="time" name={'time'}
          onChange={formik.handleChange} value={formik.values.time}
          state={formik.status} thickness={'thin'}
        >Time</Input>
        <Input
          type="checkbox" name={'consent'}
          onChange={formik.handleChange} value={formik.values.time}
          state={formik.status} thickness={'thin'} size={'fit'}
        >I am aware that I would not be able to modify the workshop details once someone paid for it</Input>
        <DialogFooter>
          <Button type="button" onClick={() => close()} size="s">Cancel</Button>
          <Button type="submit"
            size="s" style={'blue'} state={formik.status}
          >
            Create
          </Button>
        </DialogFooter>
      </StyledAddDialogForm>
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