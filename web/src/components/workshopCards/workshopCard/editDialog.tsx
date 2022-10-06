import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@styleProvider';
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Root as DialogRoot } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { Button } from '@components/button';
import Dialog from '@components/dialog';
import DialogHeader from '@components/dialog/dialogHeader';
import DialogFooter from '@components/dialog/dialogFooter';
import { useFormik } from 'formik';
import { WorkshopSchema } from '@mingsumsze/common';
import Logger from 'js-logger';
import { Input } from '@components/input';


// TODO: refactor add/edit dialog

const StyledEditDialog = styled(Dialog, {

});

const StyledEditDialogForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '25px',
  backgroundColor: 'inherit',
});

interface Props extends React.ComponentProps<typeof StyledEditDialog> {
  close: () => void;
};

const EditDialog: React.FC<{
  close: () => void;
} & React.ComponentProps<typeof StyledEditDialog>> = React.forwardRef(({ close, ...props }, ref) => {
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

      setTimeout(() => setStatus('success'), 2000);

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

    if (!formik.dirty)
    // if ((Object.keys(formik.values) as Array<keyof typeof formik.values>).some(field => formik.values[field] === formik.initialValues[field]))
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
    <StyledEditDialog {...props} ref={ref} spacing={'compact'}>
      <DialogHeader>Edit Workshop Details</DialogHeader>
      <StyledEditDialogForm autoComplete={'off'} onSubmit={formik.handleSubmit}>
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
        >I am aware that I would not be able to modify the workshop details <em>AGAIN</em> once someone paid for it</Input>
        <DialogFooter>
          <Button type="button" onClick={() => close()} size="s">Cancel</Button>
          <Button type="submit"
            size="s" style={'blue'} state={formik.status}
          >
            Apply
          </Button>
        </DialogFooter>
      </StyledEditDialogForm>
    </StyledEditDialog>
  )
});

export default EditDialog;