import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

export default function CanvasContainer(props) {
  return (
    <Canvas>
      <Suspense fallback={null}>{props.children}</Suspense>
    </Canvas>
  );
}
