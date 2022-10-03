import React, { useState, useEffect, useRef, HTMLProps } from "react";
import { styled, keyframes } from "@styleProvider";
import type * as Stitches from "@stitches/react";
import { IoSettingsSharp } from "react-icons/io5";
import {
  motion,
  MotionProps,
  useAnimationControls,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  Variants,
} from "framer-motion";
import { Link } from "react-router-dom";
import SettingsIcon from "@components/settingsIcon";

type StyledLogoVariants = Stitches.VariantProps<typeof StyledLogo>;

const StyledLogo = styled(motion(Link), {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderRadius: "26px",
  padding: "12px 26px",
  backgroundColor: "$gray1000",
  $$shadowColor: "rgba(0, 0, 0, 10%)",
  boxShadow: "0 0 30px 1px $$shadowColor",
  transition: "color 0.2s, background-color 0.2s",
  "&:hover": {
    backgroundColor: "$gray200",
    color: "$gray900",
  },
});

const StyledHeader = styled('h1', {
  fontFamily: "$ibmplexmono",
  fontSize: "25px",
  fontWeight: 400,
  variants: {
    state: {
      'normal': {
        color: "$gray050",
      },
      'hovered': {
        color: "$gray900",
      }
    }
  }
});

interface Props extends React.ComponentProps<typeof StyledLogo> {}

const variants: Variants = {
  whileHover: {
    scale: 1.05,
    transition: {
      type: "spring",
      bounce: 0.7,
    },
  },
};

const Logo: React.FC<Props> = ({ ...props }) => {
  const [isHover, setIsHover] = useState(false);

  const { scrollY } = useScroll();
  const scrollYVelocity = useSpring(useVelocity(scrollY), {
    damping: 100, // control the speed drop-off
    stiffness: 200, // control the degree of the "shakiness"
    mass: 1, // control the momentum
  });
  const rotateFactor = useTransform(scrollYVelocity, (val) => val / 5);
  const rotate = useMotionValue(0);

  const prevFrame = useRef<number>(0);
  useAnimationFrame((frame) => {
    // For making rotation factor consistent across computers
    const dt = frame - prevFrame.current;
    prevFrame.current = frame;

    rotate.set(rotate.get() + (rotateFactor.get() * dt) / 1000);
  });

  return (
    <StyledLogo
      variants={variants}
      // whileHover="whileHover"
      // TODO: fix when hovered nav goes crazy (because of layout?)
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      layout
      {...props}
    >
      <StyledHeader
        state={isHover ? 'hovered' : 'normal'}
      >Workshop</StyledHeader>
      <SettingsIcon
        style={{
          rotate,
        }}
      />
    </StyledLogo>
  );
};

export default Logo;
