import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiTime, BiStopwatch } from 'react-icons/bi';
import { MdPersonAdd, MdDateRange, MdAttachMoney, MdPerson, MdInfoOutline } from 'react-icons/md';
import { IoLanguage, IoLocationSharp, IoClose } from 'react-icons/io5';
import { ImPen } from 'react-icons/im';
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Root as DialogRoot } from '@radix-ui/react-dialog';
import { Button } from '@components/button';
import Overlay from '@components/dialog/overlay';
import EditDialog from './editDialog';
import InfoDialog from './infoDialog';


const EditTrigger : React.FC<{
  open: () => void;
}> = ({ open, ...props }) => {
  return (
    <Button size={'s'} onClick={() => open()}>
      Edit
      <ImPen style={{ fontSize: '12px', transform: 'translate(0px, -1px)' }}/>
    </Button>
  );
}

const InfoTrigger : React.FC<{
  open: () => void;
}> = ({ open, ...props }) => {
  return (
    <Button size={'s'} style={'blue'} onClick={() => open()}>
      Info
      <MdInfoOutline style={{ fontSize: '15px', transform: 'translate(0px, -1px)' }}/>
    </Button>
  );
}

const StyledBottom = styled('div', {
  gridArea: 'bottom',

  display: 'grid',
  justifyContent: 'start',
  gap: '10px',
  // gridTemplateColumns: 'repeat(auto-fit, 1fr)',
  gridTemplateColumns: 'repeat(auto-fit, max(120px))',
});

const Bottom : React.FC<{
  adminMode: boolean;
} & React.ComponentProps<typeof StyledBottom>> = ({ adminMode, ...props }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  if (adminMode)
    return (
      <StyledBottom className='bottom' {...props}>
        <DialogRoot>
          <AnimatePresence>
            <EditTrigger open={() => setEditDialogOpen(true)}/>
          </AnimatePresence>
          <AnimatePresence>
            {editDialogOpen && <>
              {/* Portal seems to have less bug */}
              <DialogPortal forceMount={true}>
                <Overlay/>
                <DialogContent asChild={true} forceMount={true}>
                  <EditDialog close={() => setEditDialogOpen(false)}/>
                </DialogContent>
              </DialogPortal>
            </>}
          </AnimatePresence>
        </DialogRoot>
        <DialogRoot>
          <AnimatePresence>
            <InfoTrigger open={() => setInfoDialogOpen(true)}/>
          </AnimatePresence>
          <AnimatePresence>
            {infoDialogOpen && <>
              {/* Portal seems to have less bug */}
              <DialogPortal forceMount={true}>
                <Overlay/>
                <DialogContent asChild={true} forceMount={true}>
                  <InfoDialog close={() => setInfoDialogOpen(false)}/>
                </DialogContent>
              </DialogPortal>
            </>}
          </AnimatePresence>
        </DialogRoot>
      </StyledBottom>
    );

  else  // user
    return (
      <StyledBottom className='bottom'>
        <Button size={'s'} style={'blue'}>
          Enroll
          <MdPersonAdd style={{ fontSize: '15px', transform: 'translate(0px, -2px)' }}/>
        </Button>
      </StyledBottom>
    );
}

StyledBottom.toString = () => '.bottom';

export default Bottom;