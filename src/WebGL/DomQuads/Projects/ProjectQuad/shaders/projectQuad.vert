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

uniform float _ViewModePhase;

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

// #define DISTORTSTR 0.9
#define DISTORTSTR 0.7
#define SCROLLDISTORTSTR 0.5
#define DISPLACEMENTSTR 0.4
// #define HEIGHTMAPSTR 0.83
#define HEIGHTMAPSTR 0.33
#define lumaK 0.33333333333333333
#define PI 3.14159265359

// #define DISTORTSTR 0.7
// #define SCROLLDISTORTSTR 0.5
// #define DISPLACEMENTSTR 0.2
// #define HEIGHTMAPSTR 0.4
// #define lumaK 0.33333333333333333

// #define DISTORTSTR 0.8
// #define SCROLLDISTORTSTR 0.5
// #define DISPLACEMENTSTR 0.3
// #define HEIGHTMAPSTR 1.4


void main() {

    vec3 pos = position;
    // pos.xy *= _ViewplaneSize * mix(0.8, 1.0, cos(_Time*2.0)*.5+.5);
    pos.xy *= _ViewplaneSize * mix(0.85, 1.0, _Scale);

    vec3 col = texture2D(_Image, uv).xyz;
    float heightMapDistort = (col.x + col.y + col.z) * lumaK;
    heightMapDistort = mix(heightMapDistort, 1.0 - heightMapDistort, _FlipFlowMapForce);

    vec2 phasePos = position.xy;
    phasePos.xy *= 0.7; //makes quads look better but I dont think this is correct (could have just used any constant)
    float phase = 1.0 - (dot(phasePos, phasePos));
    vPhase = phase;

    pos.z += (phase * DISPLACEMENTSTR + (heightMapDistort * HEIGHTMAPSTR)) * _ScrollPhase * SCROLLDISTORTSTR;
    pos.z += mix(0.0, 0.125, _ViewModePhase);
    // pos.z += mix(0.0, 0.125, 1.0);
    // pos.z += (1.0 - cos(3.0 * _ViewModePhase + (phase * 3.0))) * (0.08 + (heightMapDistort * 0.1)) * (1.0 - abs(_ViewModePhase * 2.0 - 1.0));
    
    
    pos.z += (1.0 - (cos(8.0 * _ViewModePhase + (phase * 4.0)) * 0.5 + 0.5)) * (0.15 + (heightMapDistort * 0.4)) * (1.0 - abs(_ViewModePhase * 2.0 - 1.0));
    // pos.z += (1.0 - (cos(8.0 * _ViewModePhase + (phase * 4.0)))) * (0.08 + (heightMapDistort * 0.4)) * (1.0 - abs(_ViewModePhase * 2.0 - 1.0));


    // pos.z += (1.0 - cos(20.0 * _ViewModePhase + (phase * 5.0))) * (0.08 + (heightMapDistort * 0.1)) * (1.0 - abs(_ViewModePhase * 2.0 - 1.0));

    mat4 modelViewProjection = projectionMatrix * modelViewMatrix;

    vec4 clipPos = modelViewProjection * vec4(pos, 1.0);
    clipPos.xyz /= clipPos.w;
    clipPos.xy = clipPos.xy * 0.5 + 0.5;

    vec3 distort = texture2D(_FlowMap, clipPos.xy).xyz * DISTORTSTR;
    vDistort = distort;
    pos += distort * max(0.2, heightMapDistort) * _FlowMapPhase * distort.z * mix(0.0, 1.0, _InView ? 1.0 : 0.0);
    // vClipPos = clipPos.xy;

    gl_Position = modelViewProjection * vec4(pos, 1.0);
    vUv = uv;
    vMvPos = (modelViewMatrix * vec4(position, 1.0)).xyz;

}