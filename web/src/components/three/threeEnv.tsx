import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { styled } from "@styleProvider";
import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";


const StyledThreeEnv = styled(Canvas, {

});


export const ThreeEnv : React.FC<{
  readonly useOrbitControls: boolean;

} & React.ComponentProps<typeof StyledThreeEnv>> = ({ children, useOrbitControls, ...props }) => {
  return (
    <StyledThreeEnv camera={{ position: [0.0, 0.0, 8.0] }} {...props}>
      {children}
      <axesHelper />
      {useOrbitControls &&
      <OrbitControls />
      }
    </StyledThreeEnv>
  );
};

export default ThreeEnv;
