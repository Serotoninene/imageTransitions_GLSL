import { useRef, useMemo } from "react";
// R3F + Drei
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, useAspect } from "@react-three/drei";
// GSap
import gsap from "gsap";
// Assets
import cakes from "../../Assets/Images/cakes.jpg";
import canap from "../../Assets/Images/canap.jpg";
import eliott from "../../Assets/Images/eliott.jpg";
// Shaders
import vertexShader from "../Shaders/Scene1/vertex.glsl";
import fragmentShader from "../Shaders/Scene1/fragment.glsl";

export default function Scene1() {
  const spriteRef = useRef();
  const shaderMaterialRef = useRef();
  const [cakesTexture, canapTexture, eliottTexture] = useTexture([
    cakes,
    canap,
    eliott,
  ]);

  const { viewport } = useThree();
  const winAspect = viewport.width / viewport.height;
  const imgAspect =
    cakesTexture.source.data.width / cakesTexture.source.data.height;
  let uvAspect = {};
  if (winAspect > imgAspect) {
    uvAspect = { x: 1.0, y: imgAspect / winAspect };
  } else {
    uvAspect = { x: imgAspect / winAspect, y: 1 };
  }
  const scale = useAspect(
    624, // Pixel-width
    624, // Pixel-height
    1 // Optional scaling factor
  );

  const data = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uTexture1: { value: cakesTexture },
      uTexture2: { value: canapTexture },
      uUVAspect: { value: uvAspect },
      uProgress: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  }));

  useFrame(({ clock, mouse }) => {
    shaderMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    if (mouse.x < -0.3333) {
      gsap.to(shaderMaterialRef.current.uniforms.uProgress, {
        value: 0,
        onStart: () => {
          shaderMaterialRef.current.uniforms.uTexture1.value = cakesTexture;
        },
      });
    } else if (mouse.x < 0.3333) {
      gsap.to(shaderMaterialRef.current.uniforms.uProgress, {
        value: 1,
        onComplete: () => {
          shaderMaterialRef.current.uniforms.uTexture1.value = eliottTexture;
        },
      });
    } else if (mouse.x > 0.3333) {
      gsap.to(shaderMaterialRef.current.uniforms.uProgress, {
        value: 0,
      });
    }
  });

  return (
    <sprite
      ref={spriteRef}
      scale={[viewport.width / 2, viewport.width / 2, 0]}
      position={[0, 0, 0]}
    >
      <shaderMaterial ref={shaderMaterialRef} {...data} />
    </sprite>
  );
}
