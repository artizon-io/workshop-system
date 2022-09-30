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
    scale: 1.1,
    transition: {
      type: "spring",
      bounce: 0.7,
    },
  },
};

const StyledSettingsIcon = styled(motion.span, {
  color: "$gray700",
  width: "23px",
  height: '23px',
});

const SettingsIcon : React.FC<MotionProps> = ({...props}) => {
  return (
    <StyledSettingsIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <title>Settings</title>
        <path
          d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="45"
        />
      </svg>
    </StyledSettingsIcon>
  );
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
      whileHover="whileHover"
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
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
