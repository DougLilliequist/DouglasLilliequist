precision highp float;

uniform sampler2D _Image;
uniform sampler2D _FlowMap;
uniform float _FlowMapPhase;

uniform float _AlphaPhase; //rename to scroll mode phase
uniform float _Alpha;
uniform float _RevealPhase;
uniform float _RevealDirection;
uniform float _ScrollPhase;

varying vec2 vUv;
varying vec3 vMvPos;
varying vec2 vClipPos;
varying float vDist;

#define OFFSETAMOUNTX 0.015
#define OFFSETAMOUNTY 0.0015

#define MINVIEWDIST 0.2
#define MAXVIEWDIST 0.5
#define ALPHAFALLOFFDIST 20.0

void main() {

    vec2 uv = vUv;
    uv -= 0.5;
    uv *= mix(1.0, 0.85, _AlphaPhase); //rename uniform
    uv += 0.5;

    vec2 flow = texture2D(_FlowMap, vClipPos).xy * _FlowMapPhase;

    vec3 img = texture2D(_Image, uv).xyz;
    float inputPhase = ((_ScrollPhase * 3.0));
    vec2 offsetX = (vec2(inputPhase, 0.0)) * OFFSETAMOUNTX;
    vec2 offsetY = (vec2(0.0, inputPhase)) * OFFSETAMOUNTY;

    float r = texture2D(_Image, uv - offsetX - (flow * 0.01)).x;
    float g = texture2D(_Image, uv + offsetY + (flow * 0.001)).y;
    float b = texture2D(_Image, uv + offsetX + (flow * 0.01)).z;

    float len = (vMvPos.z * vMvPos.z);
    float idleAlpha = smoothstep(MINVIEWDIST, MAXVIEWDIST, len);
    float scrollAlpha = idleAlpha * 0.25 * smoothstep(ALPHAFALLOFFDIST, 0.0, len);
    float alpha = mix(idleAlpha, scrollAlpha, abs(_ScrollPhase));
    alpha *= _Alpha;

    //reveal phase
    // alpha *= step(abs((vUv.y * 0.99) * 2.0 - 1.0), _RevealPhase);
    // alpha *= step(vUv.x, _RevealPhase);
    alpha *= mix(step(vUv.y, _RevealPhase), step(1.0 - (vUv.x * 0.99), _RevealPhase), _RevealDirection);
  
    gl_FragColor = vec4(vec3(r,g,b), alpha);

}