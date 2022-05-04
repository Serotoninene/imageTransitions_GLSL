precision mediump float; 
varying vec2 vUv;
varying vec4 vPosition;

uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D displacement;
uniform float uRadius;
uniform float uWidth;

float parabola( float x, float k ) {
  return pow( 4. * x * ( 1. - x ), k );
}

void main(){
  vec2 newUV = (vUv - vec2(0.5)) + vec2(0.5);
  vec2 start = vec2(0.5,0.5);

  vec2 uv = newUV;
  float dt = parabola(uProgress, 1.0);
  vec4 noise = texture2D(displacement, fract(vUv));
  float prog = uProgress*0.66 + noise.g * 0.04;

  // float circ = 1. - smoothstep(-width, 0.0, radius * distance(start*aspect, uv*aspect) - prog*(1.+width));
  float circ = 1. - smoothstep(-uWidth, 0.0, uRadius * distance(start, uv) - prog*(1.+uWidth));
  float intpl = pow(abs(circ), 1.);
  vec4 image1 = texture2D(uTexture1,(uv - 0.5) * (1.0 - intpl) + 0.5);
  // vec4 image2 = texture2D(uTexture2,(uv - 0.5) * intpl + 0.5 );
  vec4 image2 = texture2D(uTexture1,(uv - 0.5) * intpl + 0.5) + vec4(1.0,0.0,0.0,0.2);
  
  gl_FragColor = mix(image1, image2, intpl);
}