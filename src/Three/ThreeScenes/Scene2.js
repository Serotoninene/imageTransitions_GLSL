import React from "react";
// R3F
import { useThree } from "@react-three/fiber";

export default function Scene2() {
  const { viewport } = useThree();
  return (
    <sprite
      scale={[viewport.width / 2, viewport.width / 2, 0]}
      position={[0, 0, 0]}
    >
      <meshBasicMaterial color="lightblue" />
    </sprite>
  );
}
