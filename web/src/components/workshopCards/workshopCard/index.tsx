import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoLanguage, IoLocationSharp, IoClose } from 'react-icons/io5';
import { ImPen } from 'react-icons/im';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';
import Left from './left';
import Right from './right';
import Bottom from './bottom';
import DeleteDialog from './deleteDialog';
import Top from './top';

type StyledWorkshopCardVariants = Stitches.VariantProps<typeof StyledWorkshopCard>

const StyledDeleteTrigger = styled(AlertDialogTrigger, {

});

const DeleteTrigger : React.FC<{
  open: () => void;
}> = ({ open, ...props }) => {
  return (
    <StyledDeleteTrigger asChild={true} className='delete-trigger' {...props}>
      <motion.button
        onClick={() => open()}
        initial={{
          opacity: 0,
          scale: 0
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          scale: {
            type: 'spring',
            stiffness: 100
          },
        }}
        exit={{
          opacity: 0,
          scale: 0
        }}
        whileHover={{
          scale: 1.2
        }}
        whileTap={{
          scale: 1.1
        }}
      >
        <IoClose style={{ fontSize: '20px' }}/>
      </motion.button>
    </StyledDeleteTrigger>
  );
}

DeleteTrigger.toString = () => '.delete-trigger';

const StyledDeleteOverlay = styled(AlertDialogOverlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  zIndex: 10000,
  backdropFilter: 'blur(3px)',
  position: 'fixed',
  inset: 0
});

const DeleteOverlay: React.FC = ({ ...props }) => {
  return (
    <StyledDeleteOverlay {...props} asChild={true}>
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
    </StyledDeleteOverlay>
  );
};

const StyledWorkshopCard = styled(motion.div, {
  position: 'relative',
  borderRadius: '30px',
  padding: '50px',
  backgroundColor: '$gray950',

  display: 'grid',
  rowGap: '30px',
  gridTemplateColumns: 'max(75%) 1fr auto',
  gridTemplateRows: '1fr auto',
  gridTemplateAreas: `
    'left . right'
    'bottom bottom bottom'
  `,
  // FIXME
  // [`& > ${Top}`]: {
  //   gridArea: 'top'
  // },
  // [`& > ${Left}`]: {
  //   gridArea: 'left'
  // },
  // [`& > ${Right}`]: {
  //   gridArea: 'right'
  // },
  // [`& > ${Bottom}`]: {
  //   gridArea: 'bottom',
  // },

  [`& > ${DeleteTrigger}`]: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    zIndex: 500,

    width: '30px',
    height: '30px',
    cursor: 'pointer',
    borderRadius: '50%',
    color: '$gray1000',
    // backgroundColor: '$red500sss',
    backgroundColor: '$gray700',
    $$shadowColor: 'rgba(233, 233, 233, 0.8)',
    boxShadow: '0 0 5px 1px $$shadowColor',
    padding: '5px',
  },
});

interface Props extends React.ComponentProps<typeof StyledWorkshopCard> {
  workshopId: string;
  adminMode: boolean
};

const WorkshopCard: React.FC<Props> = ({ workshopId, adminMode, ...props }) => {
  const [onHover, setOnHover] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <StyledWorkshopCard {...props}
      initial={{
        opacity: 0,
        scale: 0.8,
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
        scale: 0.8,
        transition: {
          opacity: {
            duration: 0.2
          }
        }
      }}
      // whileHover={{
      //   scale: 1.03
      // }}
      viewport={{  // for pairing with whileInView
        margin: '-50px 0px 0px 0px'
      }}
      onHoverStart={() => setOnHover(true)}
      onHoverEnd={() => setOnHover(false)}
    >
      <Left/>
      <Right/>
      <Bottom adminMode={adminMode}/>
      {adminMode &&
      <AlertDialogRoot>
        <AnimatePresence>
          {onHover &&
          <DeleteTrigger open={() => setDialogOpen(true)}/>
          // FIXME: need to toggle twice for dialog to showup
          }
        </AnimatePresence>
        <AnimatePresence>
          {dialogOpen && <>
            <DeleteOverlay/>
            <AlertDialogContent asChild={true}>
              <DeleteDialog close={() => setDialogOpen(false)}/>
            </AlertDialogContent>
          </>}
        </AnimatePresence>
      </AlertDialogRoot>
      }
    </StyledWorkshopCard>
  );
};

export default WorkshopCard;