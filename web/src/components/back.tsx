import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { IoArrowBack } from "react-icons/io5";
import { motion, useAnimation, Variants } from 'framer-motion';

type StyledBackVariants = Stitches.VariantProps<typeof StyledBack>

const variants : Variants = {
  whileHover: {
    x: -3,
    transition: {
      ease: 'easeOut',
      duration: '.2',
    }
  }
};

const StyledArrowIcon = styled(motion.span, {

});

const ArrowIcon : React.FC = ({ ...props }) => {
  return (
    <StyledArrowIcon className='arrow'
      variants={variants}
    >
      <IoArrowBack/> 
    </StyledArrowIcon>
  )
}

ArrowIcon.toString = () => '.arrow';

const StyledBack = styled(motion.a, {
  flexbox: 'row',
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

export const Back: React.FC<Props> = ({ ...props }) => {
  const [isHover, setIsHover] = useState(false);
  
  return (
    <StyledBack {...props} whileHover="whileHover" className='back'>
      <ArrowIcon/>
      Back
    </StyledBack>
  );
};

Back.toString = () => '.back'