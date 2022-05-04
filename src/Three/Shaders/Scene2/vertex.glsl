precision mediump float;
varying vec2 vUv; 
varying vec4 vPosition;

uniform float uTime; 

void main()
{
  vUv = uv;
  vPosition = vec4(position, 1.0);

  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}