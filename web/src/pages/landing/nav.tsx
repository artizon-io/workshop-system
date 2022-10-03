import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Link } from '@components/link';
import { Button } from '@components/button';
import { PopoverAnchor, PopoverContent, PopoverPortal, PopoverTrigger, Root as PopoverRoot } from '@radix-ui/react-popover'
import { TbCircleDashed, TbHandClick } from 'react-icons/tb';
import ThreeEnv from '@components/three/threeEnv';
import DisplacementSphere from '@components/three/displacementSphere';
import { BiGitBranch } from 'react-icons/bi';
import { MdCircle, MdOutlineCircle } from 'react-icons/md';


const StyledBottom = styled(motion.div, {
  gridArea: 'bottom',
  flexbox: 'row',
  justifyContent: 'flex-start',
  gap: '20px',
});

const StyledPopoverAnchor = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%'
});

const StyledPopover = styled(motion.div, {
  zIndex: 5000,
  backgroundColor: '$gray000',
  variants: {
    type: {
      'nav': {
        flexbox: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '30px',
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
        padding: '30px',
        overflow: 'scroll',
        maxHeight: '80vh',
        maxWidth: '50vw'
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
      delay: 2,
      opacity: {
        duration: 0.2
      }
    }
  },
  exit: {
    opacity: 0,
  }
};

const popoverVariants : Variants = {
  close: {  // initial & exit
    clipPath: "inset(50% 50% 50% 50% round 8px)",
    translateY: '50%',
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3
    }
  },
  open: {  // animate
    clipPath: "inset(0% 0% 0% 0% round 8px)",
    translateY: '50%',
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
  const [showNavPopover, setShowNavPopover] = useState(false);
  const [showTimelinePopover, setShowTimelinePopover] = useState(false);
  const isLeaving = useRef(false);

  return (
    <StyledBottom>
      <PopoverRoot>
        <PopoverTrigger asChild={true}>
          <Button
            onHoverStart={() => { if (!isLeaving.current) setShowNavPopover(true); }}
            size={'round'}
            variants={triggerVariants}
            position={'relative'}
          >
          {/* An attempt */}
          {/* position: absolute to make it happen */}
          {/* <motion.div
            style={{
              backgroundColor: 'black',
              width: '300px',
              height: '300px'
            }}
            initial={false}
            animate={{
              clipPath: "inset(125px 125px 125px 125px round 50%)",
            }}
            whileHover={{
              clipPath: "inset(0px 0px 0px 0px round 30px)",
            }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.3
            }}
          > */}
            <TbHandClick style={{ fontSize: '20px' }}/>
          {/* </motion.div> */}
            <PopoverAnchor asChild={true}>
              <StyledPopoverAnchor/>
            </PopoverAnchor>
          </Button>
        </PopoverTrigger>
        <AnimatePresence>
          {showNavPopover &&
          <PopoverPortal forceMount={true}>
            <PopoverContent asChild={true} forceMount={true} side={'top'}>
              <StyledPopover
                initial="close"
                animate="open"
                exit="close"
                variants={popoverVariants}
                onHoverEnd={() => setShowNavPopover(false)}
                type={'nav'}
              >
                <Link to="/workshop" style={'white'} onClick={e => { setShowNavPopover(false); isLeaving.current = true; }}>User panel</Link>
                <Link to="/admin" style={'white'} onClick={e => { setShowNavPopover(false); isLeaving.current = true; }}>Admin panel</Link>
                <Link to="/loading" style={'white'} onClick={e => { setShowNavPopover(false); isLeaving.current = true; }}>Loading page</Link>
                <Link to="/login" style={'white'} onClick={e => { setShowNavPopover(false); isLeaving.current = true; }}>Login page</Link>
                <Link to="/404" style={'white'} onClick={e => { setShowNavPopover(false); isLeaving.current = true; }}>404 page</Link>
              </StyledPopover>      
            </PopoverContent>
          </PopoverPortal>
          }
        </AnimatePresence>
      </PopoverRoot>
      <PopoverRoot>
        <PopoverTrigger asChild={true}>
          <Button
            onClick={() => setShowTimelinePopover(state => !state)}
            size={'round'}
            variants={triggerVariants}
          >
            <BiGitBranch style={{ fontSize: '20px' }}/>
          </Button>
        </PopoverTrigger>
        <PopoverAnchor asChild={true}>
          <StyledPopoverAnchor/>
        </PopoverAnchor>
        <AnimatePresence>
          {showTimelinePopover &&
          <PopoverPortal forceMount={true}>
            <PopoverContent asChild={true} forceMount={true} side={'top'}>
              <StyledPopover
                initial="close"
                animate="open"
                exit="close"
                variants={popoverVariants}
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
                  <StyledTimelineItemBody>Profile icon popover, add/edit workshop dialog, delete workshop dialog, ...</StyledTimelineItemBody>
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
                  <StyledTimelineItemHeader type='incomplete'>Payment, register page</StyledTimelineItemHeader>
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
              </StyledPopover>      
            </PopoverContent>
          </PopoverPortal>
          }
        </AnimatePresence>
      </PopoverRoot>
    </StyledBottom>
  );
};

export default Bottom;