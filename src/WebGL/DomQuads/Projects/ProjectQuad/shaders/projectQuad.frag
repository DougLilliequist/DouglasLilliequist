precision highp float;

uniform sampler2D _Image;
uniform sampler2D _FlowMap;
uniform float _FlowMapPhase;

uniform float _ScalePhase;
uniform float _Alpha;
uniform float _RevealPhase;
uniform float _RevealDirection;
uniform float _ScrollPhase;

varying vec2 vUv;
varying vec3 vMvPos;
// varying vec2 vClipPos;
// varying float vDist;
varying vec3 vDistort;
varying float vPhase;

#define OFFSETAMOUNTX 0.008
#define OFFSETAMOUNTY 0.001

// #define MINVIEWDIST 0.18
#define MINVIEWDIST 0.24
// #define MAXVIEWDIST 0.4
#define MAXVIEWDIST 0.5
// #define MAXVIEWDIST 0.5
// #define ALPHAFALLOFFDIST 20.0
#define ALPHAFALLOFFDIST 30.0

void main() {

    vec2 uv = vUv;
    uv -= 0.5;
    uv *= mix(1.0, 0.85, _ScalePhase); //rename uniform
    uv += 0.5;

    vec2 flow = vDistort.xy * _FlowMapPhase;
    // vec2 flow = texture2D(_FlowMap, vClipPos).xy * _FlowMapPhase;

    float inputPhase = _ScrollPhase * 3.0;
    vec2 offsetX = (vec2(inputPhase, 0.0)) * OFFSETAMOUNTX;
    vec2 offsetY = (vec2(0.0, inputPhase)) * OFFSETAMOUNTY;

    float r = texture2D(_Image, uv - offsetX - (flow * 0.02)).x;
    float g = texture2D(_Image, uv + offsetY + (flow * 0.002)).y;
    float b = texture2D(_Image, uv + offsetX + (flow * 0.02)).z;

    float len = (vMvPos.z * vMvPos.z);
    float idleAlpha = smoothstep(MINVIEWDIST, MAXVIEWDIST, len);
    float scrollAlpha = idleAlpha * mix(1.0, 0.5, abs(_ScrollPhase)) * (smoothstep(ALPHAFALLOFFDIST, 0.0, len));
    float alpha = mix(idleAlpha, scrollAlpha, abs(_ScrollPhase));
    alpha *= _Alpha;

    //reveal phase
    // alpha *= step(abs((vUv.y * 0.99) * 2.0 - 1.0), _RevealPhase);
    // alpha *= step(vUv.x, _RevealPhase);
    // alpha *= mix(step(vUv.y, _RevealPhase), step(1.0 - (vUv.x * 0.99), _RevealPhase), _RevealDirection);
    alpha *= mix(step(vUv.y, _RevealPhase), 1.0 - step((vUv.y * 0.99), 1.0 - _RevealPhase), _RevealDirection);
  
    gl_FragColor = vec4(vec3(r,g,b), alpha);
    // gl_FragColor = vec4(vPhase, vPhase, vPhase, alpha);

}