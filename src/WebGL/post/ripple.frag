precision highp float;

uniform sampler2D tMap;
varying vec2 vUv;
uniform float _Aspect;
uniform vec2 _Target;
uniform float _TransitionPhase;

#define PI 3.14159

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    vec2 toTarget = _Target - uv;
    toTarget.x *= _Aspect;    
    float dist = dot(toTarget, toTarget) * 1.0;
    // float dist = length(toTarget);
    float radius = (dist - _TransitionPhase) / 0.15;
    float radPow = abs(radius);
    radPow = radPow * radPow;

    float p = 1.0 - radPow;

    float ripple = sin(PI * radius) * p;

    // float scalePhase = (dist + _TransitionPhase) * 0.1);
    ripple *= _TransitionPhase * 8.0 * (1.0 - _TransitionPhase);
    vec2 distort = normalize(toTarget) * ripple;

    float r = texture2D(tMap, uv + distort * 0.001).x;
    float g = texture2D(tMap, uv + distort * 0.0005).y;
    float b = texture2D(tMap, uv - distort * 0.001).z;
    vec3 col = vec3(r,g,b);
    gl_FragColor = vec4(col,1.0);
}