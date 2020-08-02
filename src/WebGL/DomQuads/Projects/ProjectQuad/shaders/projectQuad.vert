precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;

uniform sampler2D _FlowMap;
uniform float _FlowMapPhase;
uniform float _FlipFlowMapForce;
uniform float _RestorePhase;
uniform float _ScrollPhase;
uniform float _RevealPhase;

uniform float _ViewModePhase;
uniform float _Entering;

uniform sampler2D _Image;
uniform float _Scale;
uniform bool _InView;

uniform float _Time;

uniform vec2 _ViewplaneSize;
varying vec3 vMvPos;

varying vec2 vUv;
// varying vec2 vClipPos;
varying vec3 vDistort;
varying float vPhase;

uniform float _SpatialF;
uniform float _TemporalF;
uniform float _Amp;
uniform float _HeightAmp;

varying float vDamp;

#define DISTORTSTR 1.2
#define SCROLLDISTORTSTR 0.6
#define DISPLACEMENTSTR 0.4
#define HEIGHTMAPSTR 0.5
#define lumaK 0.33333333333333333
#define PI 3.14159265359

// #define RIPPLE_SPATIALF 3.0
#define RIPPLE_SPATIALF 3.0
#define RIPPLE_TEMPORALF 8.2
// #define RIPPLE_TEMPORALF 7.21
// #define RIPPLE_TEMPORALF 6.21
#define RIPPLE_AMP 0.1
// #define HEIGHTMAP_AMP 0.53
// #define HEIGHTMAP_AMP 0.33
#define HEIGHTMAP_AMP 3.0


void main() {

    vec3 pos = position;

    vec2 texCoord = uv;
    texCoord -= 0.5;
    texCoord *= mix(0.5, 1.0, _RevealPhase);
    texCoord += 0.5;

    vec3 col = texture2D(_Image, texCoord).xyz;
    // float heightMapDistort = (col.x + col.y + col.z) * lumaK;
    float heightMapDistort = dot(col, vec3(0.299, 0.587, 0.114));
    heightMapDistort = mix(heightMapDistort, 1.0 - heightMapDistort, _FlipFlowMapForce);
    // float dampen = 1.0 - (smoothstep(0.3, 1.0, heightMapDistort));
    float dampen = 1.0 - (smoothstep(0.3, 1.0, heightMapDistort));
    // float dampen = 1.0;
    vDamp = dampen;

    //PROJECT VIEW MODE SCALE
    pos.xy *= _ViewplaneSize * mix(0.85, 1.0, _Scale) * mix(1.0, 1.535, _ViewModePhase * _ViewModePhase);

    //SCROLL FORCE
    vec2 phasePos = position.xy;
    // phasePos.xy *= 0.7; //makes quads look better but I dont think this is correct (could have just used any constant)
    // float phase = 1.0 - (dot(phasePos, phasePos));
    float dist = length(phasePos);
    // float phase = 1.0 - dist;
    pos.z += ((1.0 - dist) * DISPLACEMENTSTR + (heightMapDistort * HEIGHTMAPSTR)) * _ScrollPhase * SCROLLDISTORTSTR;

    //PAGE REVEAL
    // float target = _RevealPhase - uv.y;
    // target = 1.0 - abs(target);
    // target = target;
    // float scanPhase = smoothstep(0.0, sin(uv.y * PI) * 0.5 + 0.5, target) * (_RevealPhase * 4.0 * (1.0 - _RevealPhase));
    // pos.z += heightMapDistort * dampen * 1.1 * scanPhase;

    vec2 toTarget = vec2(0.5, 0.0) - uv;
    float targetDist = length(toTarget) * 0.6;
    float distPhase = abs((_RevealPhase * _RevealPhase * _RevealPhase) - targetDist);
    // distPhase *= distPhase;

    float ripple = (1.0 - distPhase) * ((_RevealPhase) * 9.0 * (1.0 - (_RevealPhase)));
    vPhase = ripple;
    pos.z += heightMapDistort * dampen * 1.1 * ripple;


    // pos.z += heightMapDistort * dampen * 1.1 * ((_RevealPhase * _RevealPhase) * 8.0 * (1.0 - (_RevealPhase * _RevealPhase)));

    //PROJECT VIEW MODE RIPPLE
    float viewmodePhase = _ViewModePhase * 4.0 * (1.0 - _ViewModePhase);
    float ripplePhase = (1.0 - (cos((RIPPLE_TEMPORALF * _ViewModePhase) + ((1.0 - dist) * RIPPLE_SPATIALF * mix(-1.0, 1.0, _Entering))))) * RIPPLE_AMP;
    ripplePhase *= viewmodePhase;
    pos.z += ripplePhase;
    pos.z += heightMapDistort * HEIGHTMAP_AMP * dampen * ripplePhase;

    mat4 modelViewProjection = projectionMatrix * modelViewMatrix;
    
    vDistort = vec3(0.0, 0.0, 0.0);
    vec4 clipPos = modelViewProjection * vec4(pos, 1.0);
    clipPos.xyz /= clipPos.w;
    clipPos.xy = clipPos.xy * 0.5 + 0.5;

    vec3 distort = texture2D(_FlowMap, clipPos.xy).xyz * DISTORTSTR;
    vDistort = distort;
    pos += distort * max(0.2, heightMapDistort) * _FlowMapPhase * distort.z * (_InView ? 1.0 : 0.0);

    gl_Position = modelViewProjection * vec4(pos, 1.0);
    vUv = uv;
    vMvPos = (modelViewMatrix * vec4(position, 1.0)).xyz;

}