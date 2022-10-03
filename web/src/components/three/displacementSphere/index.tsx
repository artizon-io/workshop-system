// https://vitejs.dev/guide/assets.html
import vs from "./shader.vs?raw";
import fs from "./shader.fs?raw";
import { Canvas, MeshProps, ThreeElements, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { IcosahedronGeometry, MathUtils, Mesh, ShaderMaterial } from "three";

const DisplacementSphere : React.FC<{

}> = ({ ...props }) => {
  const mesh = useRef<Mesh<IcosahedronGeometry, ShaderMaterial>>(null);
  const isHover = useRef(false);

  const uniforms = useMemo(() => ({
    u_intensity: {
      value: 0.2,
    },
    u_time: {
      value: 0.0,
    },
  }), []);

  useFrame((state) => {
    if (!mesh.current) return;

    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime() * 0.5;

    const u_intensity_target = isHover.current ? 0.5 : 0.05;

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      u_intensity_target,
      0.02
    );
  });

  return (
    <mesh {...props}
      ref={mesh}
      position={[0, 0, 0]}
      scale={2}
      onPointerOver={() => (isHover.current = true)}
      onPointerOut={() => (isHover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      {/* https://threejs.org/docs/#api/en/materials/ShaderMaterial */}
      <shaderMaterial
        fragmentShader={fs}
        vertexShader={vs}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

export default DisplacementSphere;