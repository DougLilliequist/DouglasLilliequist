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
uniform float _InView;

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
#define HALFPI 3.14159265359 * 0.5

#define RIPPLE_SPATIALF 3.0
#define RIPPLE_TEMPORALF 8.2

// #define RIPPLE_SPATIALF 7.0 
// #define RIPPLE_TEMPORALF 8.0

#define RIPPLE_AMP 0.25
// #define RIPPLE_AMP 0.1

// #define HEIGHTMAP_AMP 0.53
// #define HEIGHTMAP_AMP 0.33
#define HEIGHTMAP_AMP 1.5


void main() {

    vec3 pos = position;

    vec2 texCoord = uv;
    texCoord -= 0.5;
    texCoord *= mix(0.5, 1.0, _RevealPhase);
    texCoord += 0.5;

    vec3 col = texture2D(_Image, texCoord).xyz;
    float heightMapDistort = dot(col, vec3(0.299, 0.587, 0.114));
    heightMapDistort = mix(heightMapDistort, 1.0 - heightMapDistort, _FlipFlowMapForce);
    float dampen = (smoothstep(0.8, 1.0, heightMapDistort));
    vDamp = dampen;

    //PROJECT VIEW MODE SCALE
    // pos.xy *= _ViewplaneSize * mix(0.85, 1.0, _Scale) * mix(1.0, 1.535, _ViewModePhase * _ViewModePhase);
    // pos.xy *= _ViewplaneSize * mix(0.85, 1.0, _Scale) * mix(1.0, 1.3528, 1.0);
    pos.xy *= _ViewplaneSize * mix(0.85, 1.0, _Scale) * mix(1.0, 1.3528, _ViewModePhase * _ViewModePhase);

    //SCROLL FORCE
    vec2 phasePos = position.xy;
    vec2 scrollPhasePos = phasePos;
    float dist = length(phasePos);
    pos.z += (1.0 - dist) * DISPLACEMENTSTR * _ScrollPhase * SCROLLDISTORTSTR;
    pos.z += heightMapDistort * dampen * 0.2 * _ScrollPhase;

    //PROJECT VIEW MODE RIPPLE
    vec2 viewModePhasePos = phasePos;
    float viewmodePhase = _ViewModePhase * 4.0 * (1.0 - _ViewModePhase);    
    float phaseDist = 1.0 - abs((_ViewModePhase * 2.1) - dist);
    phaseDist = smoothstep(0.0, 1.0, phaseDist);
    float ripplePhase = phaseDist * RIPPLE_AMP * viewmodePhase;
    vPhase = phaseDist * viewmodePhase;

    pos.z += ripplePhase;
    pos.z += heightMapDistort * HEIGHTMAP_AMP * ripplePhase;

    mat4 modelViewProjection = projectionMatrix * modelViewMatrix;
    
    vDistort = vec3(0.0, 0.0, 0.0);

    // if(_InView == 1.0) {
    vec4 clipPos = modelViewProjection * vec4(pos, 1.0);
    clipPos.xyz /= clipPos.w;
    clipPos.xy = clipPos.xy * 0.5 + 0.5;

    vec3 distort = texture2D(_FlowMap, clipPos.xy).xyz * DISTORTSTR;
    vDistort = distort;
    pos += distort * max(0.2, heightMapDistort) * _FlowMapPhase * distort.z * _InView;
    // }

    gl_Position = modelViewProjection * vec4(pos, 1.0);
    vUv = uv;
    vMvPos = (modelViewMatrix * vec4(position, 1.0)).xyz;

}