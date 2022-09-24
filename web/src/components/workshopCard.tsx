import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiTime, BiStopwatch } from 'react-icons/bi';
import { MdPersonAdd, MdDateRange, MdAttachMoney, MdPerson, MdInfoOutline } from 'react-icons/md';
import { IoLanguage, IoLocationSharp, IoClose } from 'react-icons/io5';
import { ImPen } from 'react-icons/im';
import WorkshopDeleteDialog from './workshopCardDeleteDialogContent';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Root as AlertDialogRoot } from '@radix-ui/react-alert-dialog';
import WorkshopCardDeleteDialogOverlay from './workshopCardDeleteDialogOverlay';
import WorkshopCardDeleteDialogContent from './workshopCardDeleteDialogContent';

type StyledWorkshopCardVariants = Stitches.VariantProps<typeof StyledWorkshopCard>

const StyledWorkshopCard = styled(motion.div, {
  position: 'relative',
  borderRadius: '30px',
  padding: '50px',
  backgroundColor: '$gray950',
  display: 'grid',
  rowGap: '30px',
  gridTemplateAreas: `
    'top top top'
    'left empty right'
    'bottom bottom bottom'
  `,
  gridTemplateRows: '0px 1fr auto',
  gridTemplateColumns: 'max(75%) 1fr auto',
  '& > .left': {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    gridArea: 'left'
  },
  '& > .right': {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    gridArea: 'right'
  },
  '& > .top': {
    gridArea: 'top'
  },
  '& > .right > .field': {
    color: '$gray650',
    fontFamily: '$ibmplexmono',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  '& > .left > .title': {
    fontFamily: '$ibmplexmono',
    color: '$gray100',
    fontSize: '22px',
    fontWeight: 400
  },
  '& > .left > .subtitle': {
    fontFamily: '$inter',
    color: '$gray650',
    fontSize: '15px',
    fontWeight: 300,
    lineHeight: 1.8,
  },
  '& > .left > .body': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    justifyContent: 'space-between'
  },
  '& > .left > .body > .field': {
    fontFamily: '$ibmplexmono',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: '$gray650'
  },
  '& > .bottom': {
    gridArea: 'bottom',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, max(120px))',
    gap: '10px'
  },
  '& > .bottom > .btn': {
    background: '$blue300',
    fontFamily: '$firacode',
    color: '$gray900',
    padding: '12px 20px',
    borderRadius: '15px',
    fontSize: '14px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px'
  },
  variants: {
    role: {
      'admin': {
        '& .deletebtn': {
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
        '& > .bottom > .editbtn': {
          background: '$gray300',
        },
      },
      'user': {
        '& > .bottom > .enrollbtn': {
          background: '$blue300',
        },
      }
    }
  }
});

interface Props extends React.ComponentProps<typeof StyledWorkshopCard> {
  workshopId: string;
  role: 'admin' | 'user';
};

const WorkshopCard: React.FC<Props> = ({ workshopId, role, ...props }) => {
  const [onHover, setOnHover] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <StyledWorkshopCard {...props} role={role}
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
      // whileHover={{
      //   scale: 1.03
      // }}
      viewport={{
        margin: '-50px 0px 0px 0px'
      }}
      onHoverStart={() => setOnHover(true)}
      onHoverEnd={() => setOnHover(false)}
    >
      <div className="top">

      </div>
      <div className="left">
        <h1 className='title'>Workshop</h1>
        <h2 className='subtitle'>A fantastic workshop hosted in Hong Kong. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h2>
        <div className="body">
          <span></span>
          <span className='location field'>
            <IoLocationSharp style={{ fontSize: '20px' }}/>
            <span>Tsim Sha Tsui, Hong Kong</span>
          </span>
        </div>
      </div>
      <div className="right">
        <span className='date field'>
          <MdDateRange style={{ fontSize: '17px' }}/>
          <span>21/Jul</span>
        </span>
        <span className='time field'>
          <BiTime style={{ fontSize: '18px' }}/>
          <span>09:00am</span>
        </span>
        <span className='lang field'>
          <IoLanguage style={{ fontSize: '18px' }}/>
          <span>EN/CH</span>
        </span>
        <span className='lang field'>
          <BiStopwatch style={{ fontSize: '20px' }}/>
          <span>2hr</span>
        </span>
        <span className='fee field'>
          <MdAttachMoney style={{ fontSize: '20px' }}/>
          <span>HKD 200</span>
        </span>
      </div>
      <div className="bottom">
        {role === 'user' &&
        <motion.a href="#" className="btn enrollbtn"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95
          }}
        >
          <span>Enroll</span>
          <MdPersonAdd style={{ fontSize: '15px', transform: 'translate(0px, -2px)' }}/>
        </motion.a>
        }
        {role === 'admin' && <>
        <motion.a href="#" className="btn editbtn"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95
          }}
        >
          <span>Edit</span>
          <ImPen style={{ fontSize: '12px', transform: 'translate(0px, -1px)' }}/>
        </motion.a>
        <motion.a href="#" className="btn viewinfobtn"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95
          }}
        >
          <span>Info</span>
          <MdInfoOutline style={{ fontSize: '15px', transform: 'translate(0px, -1px)' }}/>
        </motion.a>
        </>}
      </div>
      {role === 'admin' &&
      <AlertDialogRoot>
        <AnimatePresence>
          {onHover &&
          <AlertDialogTrigger asChild={true}>
            <motion.button className='deletebtn'
              onClick={() => setDialogOpen(true)}
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
          </AlertDialogTrigger>
          }
        </AnimatePresence>
        <AnimatePresence>
          {dialogOpen &&
          <AlertDialogPortal forceMount={true}>
            <WorkshopCardDeleteDialogOverlay close={() => setDialogOpen(false)}/>
            <AlertDialogContent asChild={true}>
              <WorkshopCardDeleteDialogContent close={() => setDialogOpen(false)}/>
            </AlertDialogContent>
          </AlertDialogPortal>
          }
        </AnimatePresence>
      </AlertDialogRoot>
      }
    </StyledWorkshopCard>
  );
};

export default WorkshopCard;