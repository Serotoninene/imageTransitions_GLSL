import { Suspense, useRef } from "react";
// Three
import { TextureLoader } from "three";
// R3F + Drei
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// Assets
import cakes from "./Assets/Images/cakes.jpg";
import canap from "./Assets/Images/canap.jpg";
import eliott from "./Assets/Images/eliott.jpg";
// Styling
import "./Scss/style.scss";

function Scene() {
  const spriteRef = useRef();
  const texture = useLoader(TextureLoader, cakes);
  console.log(spriteRef.current);
  useFrame((state, delta) => {});
  return (
    <sprite ref={spriteRef} scale={[5, 5]}>
      <spriteMaterial map={texture} />
    </sprite>
  );
}

function App() {
  return (
    <div className="App">
      <Canvas>
        <OrbitControls />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
