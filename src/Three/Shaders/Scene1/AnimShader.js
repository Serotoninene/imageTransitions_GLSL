import * as THREE from "three";
// React Three Fiber
import {
  extend
} from "@react-three/fiber";
import {
  shaderMaterial
} from "@react-three/drei";
import glsl from "glslify";
// Shaders
import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";
const AnimShader = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uUVAspect: 1,
  },
  glsl `
    precision mediump float;

    varying vec2 vUv;
    uniform float uTime; 

    void main()
    {
      vUv = uv;

      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition += uTime;
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
    }
  `,
  glsl `
    precision mediump float;

    uniform sampler2D uTexture;
    uniform vec2 uUVAspect;
    uniform float uTime;

    varying vec2 vUv;

    void main()
    { 

      // vec2 uvDisplaced = vUv + vec2(time*vUv.x/4., 0. );
      gl_FragColor = vec4(1.0,0.0,uTime,1.0);
    }
  `
);
extend({
  AnimShader
});

export default AnimShader;