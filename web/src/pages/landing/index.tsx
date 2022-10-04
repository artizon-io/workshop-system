import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Link } from '@components/link';
import ThreeEnv from '@components/three/threeEnv';
import DisplacementSphere from '@components/three/displacementSphere';
import Nav from './nav';

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
  gridTemplateRows: 'repeat(3, minmax(0px, 1fr))',
  gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
  rowGap: '50px',

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

const StyledRight = styled(motion.div, {
  gridArea: 'right',
  // TODO: fix canvas not sizing to 100% of container
  position: 'relative',
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
      <StyledRight
        variants={threeVariants}
      >
        <ThreeEnv useOrbitControls={false}>
          <DisplacementSphere/>
        </ThreeEnv>
      </StyledRight>
      <Nav/>
      <StyledFooter
        variants={footerVariants}
      >
        <Link as='a' to='https://artizon.io' inline style={'gray'}>@Artizon</Link>
      </StyledFooter>
    </StyledLanding>
  );
};

export default Landing;