import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { IoArrowBack } from "react-icons/io5";
import { motion, useAnimation, Variants } from 'framer-motion';

type StyledBackVariants = Stitches.VariantProps<typeof StyledBack>

const StyledBack = styled(motion.a, {
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  color: '$gray700',
  transition: 'color 0.2s',
  fontWeight: 300,
  fontFamily: '$firacode',
  '&:hover': {
    cursor: 'pointer',
    color: '$gray500'
  },
  '& > .arrow': {
    display: 'flex',
    alignItems: 'center'
  }
});

interface Props extends React.ComponentProps<typeof StyledBack> {

};

const variants : Variants = {
  whileHover: {
    x: -3,
    transition: {
      ease: 'easeOut',
      duration: '.2',
    }
  }
};

export const Back: React.FC<Props> = ({ ...props }) => {
  const [isHover, setIsHover] = useState(false);
  
  // Nice attempt but doesn't work
  // const controls = useAnimation();
  // useEffect(() => {
  //   switch(isHover) {
  //     case true:
  //       controls.start({
  //         x: -15,
  //         transition: {
  //           duration: 0.3
  //         },
  //       })
  //       break;
  //   }
  // }, [isHover]);

  return (
    <StyledBack {...props} whileHover="whileHover" className='back'>
      <motion.span className='arrow'
        variants={variants}
      >
        <IoArrowBack/>
      </motion.span>
      Back
    </StyledBack>
  );
};

Back.toString = () => '.back'