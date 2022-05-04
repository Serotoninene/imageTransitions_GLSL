import React, { useLayoutEffect, useMemo, useState, useRef } from "react";
// Gsap
import gsap from "gsap";
// R3F
import { useThree, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
// Shaders
import vertexShader from "../Shaders/Scene2/vertex.glsl";
import fragmentShader from "../Shaders/Scene2/fragment.glsl";
// Assets
import cakes from "../../Assets/Images/cakes.jpg";
import canap from "../../Assets/Images/canap.jpg";
import eliott from "../../Assets/Images/eliott.jpg";
import displacementMap from "../../Assets/Images/disp3.jpg";

export default function Scene2() {
  const [toggleImg, setToggleImg] = useState(true);
  const meshRef = useRef();
  const shaderMaterialRef = useRef();
  console.log(vertexShader);

  const [cakesTexture, eliottTexture, displacement] = useTexture([
    cakes,
    canap,
    displacementMap,
  ]);
  const { viewport } = useThree();

  // Data used for the shader
  const data = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uTexture1: { value: cakesTexture },
      uTexture2: { value: eliottTexture },
      displacement: { value: displacement },
      uRadius: { value: 0.9, type: "f", min: 0.1, max: 2 },
      uWidth: { value: 0.15, type: "f", min: 0, max: 1 },
      uProgress: { value: 0.5 },
    },
    vertexShader,
    fragmentShader,
  }));

  useFrame(({ mouse, clock }) => {
    shaderMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    if (mouse.x < 0) {
      gsap.to(shaderMaterialRef.current.uniforms.uProgress, {
        value: 0.5,
        duration: 1,
      });
    } else {
      gsap.to(shaderMaterialRef.current.uniforms.uProgress, {
        value: 1,
        duration: 1,
      });
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        scale={[viewport.width / 1.7, viewport.width / 1.7, 0]}
        position={[0, 0, 0]}
        onClick={() => {
          console.log("clc");
        }}
      >
        <planeBufferGeometry />
        <shaderMaterial ref={shaderMaterialRef} {...data} />
      </mesh>
    </>
  );
}
