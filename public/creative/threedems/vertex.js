export default /*glsl*/ `

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float uTime;
uniform float offsetFace;
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
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    float noiseMultiplier = vPosition.x;
    // float noiseMultiplier = vPosition.y > 0.0 ? (vPosition.z > 0.0 ? (vPosition.x+vPosition.y+vPosition.z) : 0.0) : 0.0;
    // float noise = pnoise(vPosition*0.5 + 10.0*cos(uTime*0.1));
    float noise = sin(vPosition.x*0.1 + vPosition.y*0.3 + vPosition.z*0.1 + 10.0*cos(uTime*0.1));
    float displacement = noise * noiseMultiplier*deformFactor;
    vec3 newPosition = vPosition + vNormal * (displacement+offsetFace*3.0); 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;
