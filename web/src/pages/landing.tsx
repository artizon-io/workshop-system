import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Link } from '@components/link';
import { Button } from '@components/button';
import { PopoverContent, PopoverPortal, PopoverTrigger, Root as PopoverRoot } from '@radix-ui/react-popover'
import { TbHandClick } from 'react-icons/tb';
import ThreeEnv from '@components/three/threeEnv';
import DisplacementSphere from '@components/three/displacementSphere';

type StyledLandingVariants = Stitches.VariantProps<typeof StyledLanding>

const StyledLanding = styled(motion.main, {
  width: '90vw',
  height: '90vh',
  position: 'relative',

  display: 'grid',
  gridTemplateAreas: `
    '...  right'
    'left right'
    'bottom right'
  `,
  gridTemplateRows: 'repeat(3, 1fr)',
  gridTemplateColumns: '1fr 1fr',
  gap: '50px',

  borderRadius: '50px',
  backgroundColor: '$gray1000',
  padding: '100px',
});

const StyledHeader = styled(motion.h1, {
  alignSelf: 'flex-start',

  '& > b': {
    fontFamily: '$firacode',
    color: '$gray100',
    fontSize: '80px',
    fontStyle: 'normal',
    display: 'block'
  },
  '& > em': {
    fontFamily: '$firacode',
    color: '$gray100',
    fontSize: '40px',
    display: 'block',
    fontStyle: 'normal',

    marginBottom: '30px'
  },
});

const StyledLeft = styled(motion.div, {
  gridArea: 'left',
  alignSelf: 'center',
});

const StyledSubheader = styled(motion.h2, {
  fontFamily: '$ibmplexmono',
  color: '$gray600',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: 2,
  fontStyle: 'italic',
  display: 'block'
})

const StyledFooter = styled(motion.div, {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  // transform: 'translate(-50%, -50%)',

  fontFamily: '$firacode',
  fontSize: '15px',
  fontWeight: 300,
})

const StyledNav = styled(motion.nav, {
  gridArea: 'bottom',
});

const POPOVER_HEIGHT = 220;

const StyledPopover = styled(motion.div, {
  zIndex: 5000,
  height: `${POPOVER_HEIGHT}px`,  // TODO: calc width dynamically
  flexbox: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  backgroundColor: '$gray000',
  margin: '0 30px',  // collision padding
  padding: '30px',
  [`& > li > ${Link}`]: {
    flexbox: 'row',
    gap: '5px'
  }
});

const StyledRight = styled(motion.div, {
  gridArea: 'right',
  alignSelf: 'center'
});

interface Props extends React.ComponentProps<typeof StyledLanding> {
  
};

// TODO: refactor framer motion variants

const variants : Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      when: 'afterChildren'
    }
  },
}

const headerVariants : Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  },
  exit: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0.1
    }
  },
}

const headingVariants : Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        duration: 0.2
      }
    }
  },
  exit: {
    opacity: 0,
  }
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
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3
    }
  },
  open: {  // animate
    clipPath: "inset(0% 0% 0% 0% round 8px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    }
  },
};

const footerVariants : Variants = {
  initial: {
    opacity: 0,
    translateX: '-50%',
    translateY: '-50%'
  },
  animate: {
    opacity: 1,
    translateX: '-50%',
    translateY: '-50%',
    transition: {
      delay: 2,
      opacity: {
        duration: 0.3,
      },
    }
  },
  whlieHover: {

  },
  exit: {
    opacity: 0,
    translateX: '-50%',
    translateY: '-50%'
  }
}

const threeVariants : Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
      opacity: {
        duration: 0.5,
      },
    }
  },
  exit: {
    opacity: 0,
  }
}

const Landing: React.FC<Props> = ({ ...props }) => {
  const [showPopover, setShowPopover] = useState(false);
  const isLeaving = useRef(false);

  return (
    <StyledLanding {...props}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      <StyledLeft
        variants={headerVariants}
      >
        <StyledHeader
          variants={headingVariants} 
        >
          <b>Workshop</b>
          <em>System</em>
        </StyledHeader>
        <StyledSubheader
          variants={headingVariants} 
        >
          A scaffold for vending your services on the web
        </StyledSubheader>
      </StyledLeft>
      <StyledFooter
        variants={footerVariants}
      >
        <Link as='a' to='https://artizon.io' inline style={'gray'}>@Artizon</Link>
      </StyledFooter>
      <StyledNav>
        <PopoverRoot>
          <PopoverTrigger asChild={true}>
            <Button
              onHoverStart={() => { if (!isLeaving.current) setShowPopover(true); }}
              size={'round'}
              variants={triggerVariants}
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
            </Button>
          </PopoverTrigger>
          <AnimatePresence>
            {showPopover &&
            <PopoverPortal forceMount={true}>
              <PopoverContent asChild={true} forceMount={true} side='top' sideOffset={-POPOVER_HEIGHT/2-25}>
                <StyledPopover
                  initial="close"
                  animate="open"
                  exit="close"
                  variants={popoverVariants}
                  onHoverEnd={() => setShowPopover(false)}
                >
                  <Link to="/workshop" style={'white'} onClick={e => { setShowPopover(false); isLeaving.current = true; }}>User panel</Link>
                  <Link to="/admin" style={'white'} onClick={e => { setShowPopover(false); isLeaving.current = true; }}>Admin panel</Link>
                  <Link to="/loading" style={'white'} onClick={e => { setShowPopover(false); isLeaving.current = true; }}>Loading page</Link>
                  <Link to="/login" style={'white'} onClick={e => { setShowPopover(false); isLeaving.current = true; }}>Login page</Link>
                  <Link to="/404" style={'white'} onClick={e => { setShowPopover(false); isLeaving.current = true; }}>404 page</Link>
                </StyledPopover>      
              </PopoverContent>
            </PopoverPortal>
            }
          </AnimatePresence>
        </PopoverRoot>
      </StyledNav>
      <StyledRight
        variants={threeVariants}
      >
        <ThreeEnv useOrbitControls={false}>
          <DisplacementSphere/>
        </ThreeEnv>
      </StyledRight>
    </StyledLanding>
  );
};

export default Landing;