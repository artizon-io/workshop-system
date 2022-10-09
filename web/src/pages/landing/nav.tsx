import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Link } from '@components/link';
import { Button } from '@components/button';
import { DialogContent, DialogPortal, DialogTrigger, Root as DialogRoot } from '@radix-ui/react-dialog'
import { TbCircleDashed, TbHandClick } from 'react-icons/tb';
import ThreeEnv from '@components/three/threeEnv';
import DisplacementSphere from '@components/three/displacementSphere';
import { BiGitBranch } from 'react-icons/bi';
import { MdCircle, MdOutlineCircle, MdOutlineClose } from 'react-icons/md';
import Overlay from '@components/dialog/overlay';


const StyledBottom = styled(motion.div, {
  flexbox: 'row',
  gap: '20px',
  '@bp4': {
    justifyContent: 'flex-start',
  },
  '@bp1': {
    justifyContent: 'flex-end',
  }
});

const StyledDialog = styled(motion.div, {
  zIndex: 20000,
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: '$gray000',
  variants: {
    type: {
      'nav': {
        flexbox: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '40px 50px 30px 40px',
        [`& > li > ${Link}`]: {
          flexbox: 'row',
          gap: '5px'
        },
      },
      'timeline': {
        flexbox: 'column',
        justifyContent: 'normal',
        margin: 'auto',
        // https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
        alignItems: 'stretch',
        padding: '40px 50px 30px 40px',
        overflow: 'scroll',
        '@bp4': {
          width: '50vw',
          maxHeight: '80vh',
        },
        '@bp3': {
          width: '75vw',
          maxHeight: '85vh',
        },
        '@bp2': {
          width: '90vw',
          maxHeight: '90vh',
        }
      }
    }
  },
});

const StyledTimelineHeader = styled('h2', {
  alignSelf: 'center',
  color: '$gray950',
  fontFamily: '$ibmplexmono',
  fontSize: '25px',
  margin: '10px 0'
});

const StyledTimelineItem = styled('div', {
  borderLeft: '2px solid transparent',
  position: 'relative',
  padding: '30px',
  borderColor: '$gray800',
  flexbox:'column',
  alignItems: 'flex-start',
  gap: '7px'
});

const StyledTimelineItemHeader = styled('h3', {
  fontFamily: '$firacode',
  fontWeight: 400,
  fontSize: '15px',
  variants: {
    type: {
      'complete': {
        color: '$gray900',
      },
      'incomplete': {
        color: '$gray700',
      }
    }
  },
  defaultVariants: {
    type: 'complete'
  }
});

const StyledTimelineItemBody = styled('p', {
  fontFamily: '$ibmplexmono',
  fontSize: '14px',
  lineHeight: 2,
  variants: {
    type: {
      'complete': {
        color: '$gray650',
      },
      'incomplete': {
        color: '$gray500',
      }
    }
  },
  defaultVariants: {
    type: 'complete'
  }
});

const StyledTimelineDot = styled('div', {
  position: 'absolute',
  left: '-8.5px',
  top: '30px',
  variants: {
    type: {
      'complete': {
        color: '$gray1000',
      },
      'incomplete': {
        color: '$gray700',
      }
    }
  },
});

const StyledNavHeader = styled('h2', {
  alignSelf: 'center',
  color: '$gray950',
  fontFamily: '$ibmplexmono',
  fontSize: '20px',
  margin: '10px 0'
});

const StyledCloseButton = styled('button', {
  position: 'fixed',
  top: '30px',
  right:'30px',
  color: '$gray600',
  backgroundColor: 'inherit',
  '&:hover': {
    cursor: 'pointer',
    color: '$gray700',
  }
})

const TimelineDot : React.FC<React.ComponentProps<typeof StyledTimelineDot>> = ({ type = 'complete', ...props }) => {
  return (
    <StyledTimelineDot type={type}>
      {/* {type === 'complete'
        ? <MdCircle style={{ fontSize: '15px' }}/>
        : <TbCircleDashed style={{ fontSize: '15px' }}/>
      } */}
      <MdCircle style={{ fontSize: '15px' }}/>
    </StyledTimelineDot>
  );
}

const triggerVariants : Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
      opacity: {
        duration: 0.2
      }
    }
  },
  exit: {
    opacity: 0,
  }
};

const DialogVariants : Variants = {
  close: {  // initial & exit
    clipPath: "inset(50% 50% 50% 50% round 8px)",
    translateX: '-50%',
    translateY: '-50%',
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3
    }
  },
  open: {  // animate
    clipPath: "inset(0% 0% 0% 0% round 8px)",
    translateX: '-50%',
    translateY: '-50%',
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    }
  },
};

const Bottom: React.FC<React.ComponentProps<typeof StyledBottom>> = ({ ...props }) => {
  const [showNavDialog, setShowNavDialog] = useState(false);
  const [showTimelineDialog, setShowTimelineDialog] = useState(false);
  // const isLeaving = useRef(false);

  return (
    <StyledBottom>
      <DialogRoot>
        <DialogTrigger asChild={true}>
          <Button
            // onHoverStart={() => { if (!isLeaving.current) setShowNavDialog(true); }}
            onClick={() => setShowNavDialog(true)}
            size={'round'}
            variants={triggerVariants}
            position={'relative'}
          >
            <TbHandClick style={{ fontSize: '20px' }}/>
          </Button>
        </DialogTrigger>
        <AnimatePresence>
          {showNavDialog && <>
          <DialogPortal forceMount={true}>
            <Overlay/>
            <DialogContent asChild={true} forceMount={true}
              onInteractOutside={() => setShowNavDialog(false)}
              onEscapeKeyDown={() => setShowNavDialog(false)}
            >
              <StyledDialog
                initial="close"
                animate="open"
                exit="close"
                variants={DialogVariants}
                type={'nav'}
              >
                <StyledNavHeader>Take me to...</StyledNavHeader>
                <Link to="/workshop" style={'white'} onClick={e => { setShowNavDialog(false); }}>User panel</Link>
                <Link to="/admin" style={'white'} onClick={e => { setShowNavDialog(false); }}>Admin panel</Link>
                <Link to="/loading" style={'white'} onClick={e => { setShowNavDialog(false); }}>Loading page</Link>
                <Link to="/login" style={'white'} onClick={e => { setShowNavDialog(false); }}>Login page</Link>
                <Link to="/404" style={'white'} onClick={e => { setShowNavDialog(false); }}>404 page</Link>
                <StyledCloseButton
                  onClick={() => setShowNavDialog(false)}
                >
                  <MdOutlineClose style={{ fontSize: '18px' }}/>
                </StyledCloseButton>
              </StyledDialog>      
            </DialogContent>
          </DialogPortal>
          </>}
        </AnimatePresence>
      </DialogRoot>
      <DialogRoot>
        <DialogTrigger asChild={true}>
          <Button
            onClick={() => setShowTimelineDialog(state => !state)}
            size={'round'}
            variants={triggerVariants}
          >
            <BiGitBranch style={{ fontSize: '20px' }}/>
          </Button>
        </DialogTrigger>
        <AnimatePresence>
          {showTimelineDialog && <>
          <DialogPortal forceMount={true}>
            <Overlay/>
            <DialogContent asChild={true} forceMount={true}
              onInteractOutside={() => setShowTimelineDialog(false)}
              onEscapeKeyDown={() => setShowTimelineDialog(false)}
            >
              <StyledDialog
                initial="close"
                animate="open"
                exit="close"
                variants={DialogVariants}
                type={'timeline'}
              >
                <StyledTimelineHeader>Timeline</StyledTimelineHeader>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader>Application Backend</StyledTimelineItemHeader>
                  <StyledTimelineItemBody>Web endpoints, database, authentication, ...</StyledTimelineItemBody>
                  <TimelineDot/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader>Login UI</StyledTimelineItemHeader>
                  <StyledTimelineItemBody>Phone login with OTP, validation logic, form state management, ...</StyledTimelineItemBody>
                  <TimelineDot/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader>User panel UI</StyledTimelineItemHeader>
                  <StyledTimelineItemBody>Workshop card display, nav bar, footer, ...</StyledTimelineItemBody>
                  <TimelineDot/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader>Admin panel UI</StyledTimelineItemHeader>
                  <StyledTimelineItemBody>Profile icon Dialog, add/edit workshop dialog, delete workshop dialog, ...</StyledTimelineItemBody>
                  <TimelineDot/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader>Error, 404, loading page</StyledTimelineItemHeader>
                  <TimelineDot/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader>Landing page</StyledTimelineItemHeader>
                  <StyledTimelineItemBody>Typography, 3D element, timeline, ...</StyledTimelineItemBody>
                  <TimelineDot/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader>Responsive UI</StyledTimelineItemHeader>
                  <TimelineDot/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader>Performance Optimisation</StyledTimelineItemHeader>
                  <StyledTimelineItemBody>Code-splitting, reduce initial page load time</StyledTimelineItemBody>
                  <TimelineDot/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader type='incomplete'>Optimisation for Mobile</StyledTimelineItemHeader>
                  <TimelineDot type='incomplete'/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader type='incomplete'>Payment, register page</StyledTimelineItemHeader>
                  <TimelineDot type={'incomplete'}/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader type='incomplete'>User management page</StyledTimelineItemHeader>
                  <TimelineDot type={'incomplete'}/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader type='incomplete'>Integration with backend</StyledTimelineItemHeader>
                  <TimelineDot type={'incomplete'}/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader type='incomplete'>Deployment</StyledTimelineItemHeader>
                  <TimelineDot type={'incomplete'}/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader type='incomplete'>SEO Optimisation</StyledTimelineItemHeader>
                  <StyledTimelineItemBody type='incomplete'>SSG for landing page</StyledTimelineItemBody>
                  <TimelineDot type='incomplete'/>
                </StyledTimelineItem>
                <StyledTimelineItem>
                  <StyledTimelineItemHeader type='incomplete'>Workshop Info Datatable</StyledTimelineItemHeader>
                  <StyledTimelineItemBody type='incomplete'>Autocomplete-search, filtering, sorting</StyledTimelineItemBody>
                  <TimelineDot type='incomplete'/>
                </StyledTimelineItem>
                <StyledCloseButton
                  onClick={() => setShowTimelineDialog(false)}
                >
                  <MdOutlineClose style={{ fontSize: '25px' }}/>
                </StyledCloseButton>
              </StyledDialog>      
            </DialogContent>
          </DialogPortal>
          </>}
        </AnimatePresence>
      </DialogRoot>
    </StyledBottom>
  );
};

export default Bottom;