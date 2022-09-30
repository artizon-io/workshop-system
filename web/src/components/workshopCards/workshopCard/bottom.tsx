import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiTime, BiStopwatch } from 'react-icons/bi';
import { MdPersonAdd, MdDateRange, MdAttachMoney, MdPerson, MdInfoOutline } from 'react-icons/md';
import { IoLanguage, IoLocationSharp, IoClose } from 'react-icons/io5';
import { ImPen } from 'react-icons/im';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';
import { Button } from '@components/button';


const StyledBottom = styled('div', {
  gridArea: 'bottom',

  display: 'grid',
  gap: '10px',
  // gridTemplateColumns: 'repeat(auto-fit, max(120px))',  // FIXME
  gridTemplateColumns: 'repeat(auto-fit, 1fr)',
});

const Bottom : React.FC<{
  adminMode: boolean;
} & React.ComponentProps<typeof StyledBottom>> = ({ adminMode, ...props }) => {
  if (adminMode)
    return (
      <StyledBottom className='bottom' {...props}>
        <Button size={'s'}>
          Edit
          <ImPen style={{ fontSize: '12px', transform: 'translate(0px, -1px)' }}/>
        </Button>
        <Button size={'s'}>
          Info
          <MdInfoOutline style={{ fontSize: '15px', transform: 'translate(0px, -1px)' }}/>
        </Button>
      </StyledBottom>
    );

  else  // user
    return (
      <StyledBottom className='bottom'>
        <Button>
          Enroll
          <MdPersonAdd style={{ fontSize: '15px', transform: 'translate(0px, -2px)' }}/>
        </Button>
      </StyledBottom>
    );
}

StyledBottom.toString = () => '.bottom';

export default Bottom;