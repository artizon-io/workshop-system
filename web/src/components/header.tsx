import { styled } from "@styleProvider";
import { motion, Variants } from "framer-motion";
import React from "react";

const StyledHeader = styled(motion.h1, {
  color: '$gray200',
  fontFamily: '$firacode',
  fontSize: '50px',
  fontWeight: 600
});

const variants : Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.2
      }
    }
  },
  exit: {
    opacity: 0,
  },
};

const Header : React.FC<React.ComponentProps<typeof StyledHeader>> = ({ ...props }) => {
  return (
    <StyledHeader {...props}
      variants={variants}
    />
  );
};

export default Header;