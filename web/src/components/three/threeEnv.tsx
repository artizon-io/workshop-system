import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { styled } from "@styleProvider";
import { motion } from "framer-motion";
import React, { ReactNode, useMemo, useRef } from "react";


const StyledThreeEnv = styled('div', {
  height: '500px',
  width: '500px'
});


export const ThreeEnv : React.FC<{
  readonly useOrbitControls: boolean;

} & React.ComponentProps<typeof StyledThreeEnv>> = ({ children, useOrbitControls, ...props }) => {
  return (
    <StyledThreeEnv {...props}>
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        {children}
        <axesHelper />
        {useOrbitControls &&
        <OrbitControls />
        }
      </Canvas>
    </StyledThreeEnv>
  );
};

export default ThreeEnv;
