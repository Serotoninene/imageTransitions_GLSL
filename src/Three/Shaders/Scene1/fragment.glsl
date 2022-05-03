precision mediump float;

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uUVAspect;
uniform float uTime;
uniform float uProgress;


varying vec2 vUv;

mat2 rotate(float a) {
	float s = sin(a);
	float c = cos(a);
  return	mat2(c, -s, s, c);
}

void main()
{ 
  vec2 uvDivided = fract(vUv*vec2(30.,1.));
  vec2 uvDisplaced1 = vUv + rotate(3.14)*uvDivided*vec2(uProgress*vUv.x/4., 0. ) * 0.5;
  vec2 uvDisplaced2 = vUv + rotate(3.14)*uvDivided*vec2((1.- uProgress)*vUv.x/4., 0. ) * 0.5;
  vec4 img1 = texture2D(uTexture1, uvDisplaced1);
  vec4 img2 = texture2D(uTexture2, uvDisplaced2);
  gl_FragColor = mix(img1,img2, uProgress);

}