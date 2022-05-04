import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

export default function CanvasContainer(props) {
  return (
    <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
      <Suspense fallback={null}>{props.children}</Suspense>
    </Canvas>
  );
}
