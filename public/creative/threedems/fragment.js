export default /*glsl*/ `

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPattern;

uniform float uTime;
uniform float deformFactor;


#define PI 3.14159265358979
#define MOD3 vec3(.1031,.11369,.13787)

vec3 hash33(vec3 p3) {
	p3 = fract(p3 * MOD3);
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

// ? Perlin noise
float pnoise(vec3 p) {
  vec3 pi = floor(p);
  vec3 pf = p - pi;
  vec3 w = pf * pf * (3. - 2.0 * pf);
  return 	mix(
          mix(
                mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                      dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                       w.x),
                mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                      dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                       w.x),
                w.z),
          mix(
                  mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                      dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                       w.x),
                   mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                      dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                       w.x),
                w.z),
        w.y);
}

void main() {
  float noisecolor = pnoise(vPosition);
  float noisecolora = pnoise(vec3(vUv,0.0)*4.0 + sin(uTime));
  noisecolora += pnoise(1.0 + 0.3 * vec3(vUv,0.0)*4.0 + sin(uTime*0.2));
  float noisecolorb = pnoise(vec3(vUv,0.0)*4.0 * 0.05 + sin(uTime));
  noisecolorb += pnoise(0.5 * vec3(vUv,0.0)*4.0 + cos(uTime*0.1)+ cos(uTime*0.01)+ cos(uTime*0.15)+ cos(uTime*0.02));
  float noisecolorc = pnoise(vec3(vUv,0.0)*4.0 * 0.35 + sin(uTime*0.001) + sin(uTime*0.01) + sin(uTime*0.1));
  noisecolorc += pnoise(0.9 * vec3(vUv,0.0)*4.0);
  vec3 color = vec3(0.7,0,0.5);
  // color -= vec3(noisecolora) * deformFactor * vec3(0.4,0,0.7) * 100.4;
  color += vec3(noisecolorb)* deformFactor * vec3(0.6,0,0.4);
  color += vec3(noisecolorc)* deformFactor * vec3(0.1,0,0.8) * 10.0;
  gl_FragColor = vec4(color, 1.0);
}
`;

