import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@artizon/design-system';
import type * as Stitches from '@stitches/react';
import { IoSettingsSharp } from "react-icons/io5";
import { motion, useAnimationControls, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, Variants } from 'framer-motion';

type StyledLogoVariants = Stitches.VariantProps<typeof StyledLogo>

const spinning = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const StyledLogo = styled(motion.a, {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '26px',
  padding: '12px 26px',
  backgroundColor: '$gray1000',
  $$shadowColor: 'rgba(0, 0, 0, 10%)',
  boxShadow: '0 0 30px 1px $$shadowColor',
  transition: 'color 0.2s, background-color 0.2s',
  '& > h1': {
    fontFamily: '$ibmplexmono',
    fontSize: '25px',
    fontWeight: 400,
    color:'$gray050',
  },
  '& > div': {
    display: 'flex',
    alignItems: 'center',
  },
  '& > div > svg': {
    height: '22px',
    width: '22px',
    color: '$gray800',
  },
  '&:hover': {
    backgroundColor: '$gray200',
    color: '$gray900'
  },
  '&:hover > h1': {
    color:'$gray900',
  },
});

interface Props extends React.ComponentProps<typeof StyledLogo> {

};

const variants : Variants = {
  whileHover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      bounce: 0.7,
    }
  }
}

const wheelVariants : Variants = {
};

const Logo: React.FC<Props> = ({ ...props }) => {

  // Nice try but unfortunately buggy
  // const controls = useAnimationControls();
  // const startSpin = () => {
  //   controls.start({
  //     rotate: 720,
  //     transition: {
  //       repeat: Infinity,
  //       repeatType: 'loop',
  //       // duration: 0.1,
  //       // ease: 'linear',
  //     }
  //   })
  // }
  // const stopSpin = () => {
  //   controls.stop();
  // }

  const { scrollY } = useScroll();
  const scrollYVelocity = useSpring(useVelocity(scrollY), {
    damping: 100,  // control the speed drop-off
    stiffness: 200,  // control the degree of the "shakiness"
    mass: 1  // control the momentum
  });
  const rotateFactor = useTransform(scrollYVelocity, val => val/5);
  const rotate = useMotionValue(0);

  const prevFrame = useRef<number>(0);
  useAnimationFrame(frame => {
    // For making rotation factor consistent across computers
    const dt = frame - prevFrame.current;
    prevFrame.current = frame;

    rotate.set(rotate.get() + rotateFactor.get() * dt/1000);
  });

  return (
    <StyledLogo {...props} href="#"
      // onHoverStart={startSpin}
      // onHoverEnd={stopSpin}

      variants={variants}
      whileHover="whileHover"
    >
      <h1>Workshop</h1>
      <motion.div
        // animate={controls}
        variants={wheelVariants}
        style={{
          rotate
        }}
      >
        <IoSettingsSharp/>
      </motion.div>
    </StyledLogo>
  );
};

export default Logo;