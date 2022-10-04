import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Link } from '@components/link';
import ThreeEnv from '@components/three/threeEnv';
import DisplacementSphere from '@components/three/displacementSphere';
import Nav from './nav';

type StyledLandingVariants = Stitches.VariantProps<typeof StyledLanding>

// https://stackoverflow.com/questions/37241183/css-pixel-density-independent-design-css-pixel-50-larger-on-desktop

const StyledLanding = styled(motion.main, {
  width: '90vw',
  height: '90vh',
  position: 'relative',

  borderRadius: '50px',
  backgroundColor: '$gray1000',

  display: 'grid',
  '@imac': {
    padding: '8vw 2vw 8vw 8vw',  // less padding to the right
    
    gridTemplateAreas: `
    '... right'
    'left right'
    'bottom right'
    `,
    // https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
    gridTemplateRows: 'repeat(3, minmax(0px, 1fr))',
    gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
    gap: '50px',
  },
  '@ipad': {
    padding: '5vh 8vw 10vh 12vw',  // less padding to top and right

    gridTemplateAreas: `
      'right'
      'left'
      'bottom'
    `,
    gridTemplateColumns: 'minmax(0px, 1fr)',
    gridTemplateRows: 'minmax(0px, 2fr) minmax(0px, 2fr) minmax(0px, 1fr)',
    gap: '20px',
  },
});

const StyledHeader = styled(motion.h1, {
  '& > b': {
    fontFamily: '$firacode',
    color: '$gray100',
    fontStyle: 'normal',
    display: 'block',
    '@imac': {
      fontSize: '80px'
    },
    '@macbook': {
      fontSize: '70px',
    },
    '@ipad': {
      fontSize: '60px',
    },
    '@iphone': {
      fontSize: '50px',
    },
  },
  '& > em': {
    fontFamily: '$firacode',
    color: '$gray100',
    display: 'block',
    fontStyle: 'normal',
    '@imac': {
      fontSize: '40px'
    },
    '@macbook': {
      fontSize: '35px',
    },
    '@ipad': {
      fontSize: '35px',
    },
    '@iphone': {
      fontSize: '30px',
    },
  },
  '& > em > small': {
    color: '$gray750',
    fontWeight: 300,
    '@imac': {
      fontSize: '20px'
    },
    '@macbook': {
      fontSize: '18px',
    },
    '@ipad': {
      fontSize: '18px',
    },
    '@iphone': {
      fontSize: '16px',
    },
  }
});

const StyledLeft = styled(motion.div, {
  gridArea: 'left',
  flexbox: 'column',
  gap: '30px',
  alignItems: 'flex-start',
});

const StyledSubheader = styled(motion.h2, {
  fontFamily: '$ibmplexmono',
  color: '$gray600',
  fontWeight: 400,
  fontStyle: 'italic',
  display: 'block',
  '@imac': {
    fontSize: '18px',
    lineHeight: 2,
  },
  '@macbook': {
    fontSize: '18px',
    lineHeight: 1.8,
  },
  '@ipad': {
    fontSize: '20px',
    lineHeight: 1.6,
  },
  '@iphone': {
    fontSize: '18px',
    lineHeight: 1.5,
  },
})

const StyledFooter = styled(motion.div, {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  // transform: 'translate(-50%, -50%)',

  fontFamily: '$firacode',
  '@imac': {
    fontSize: '16px',
  },
  '@macbook': {
    fontSize: '17px',
  },
  '@ipad': {
    fontSize: '18px',
  },
  '@iphone': {
    fontSize: '16px',
  },
  fontWeight: 300,
})

const StyledRight = styled(motion.div, {
  gridArea: 'right',
  position: 'relative',
  aspectRatio: '1 / 1',
  margin: 'auto',
  '@imac': {
    width: '100%',
    maxHeight: '100%',  // constraining the height in case width > height of the bounding box
    padding: '25px 0px 0px 0px',  // padding top
  },
  '@ipad': {
    height: '100%',
    maxWidth: '100%',
    padding: '0px',
  }
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
      delay: 1,
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
          <em>System <small>(A Work-In-Progress)</small></em>
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