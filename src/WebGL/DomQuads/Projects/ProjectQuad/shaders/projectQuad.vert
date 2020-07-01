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

uniform float _SpatialF;
uniform float _TemporalF;
uniform float _Amp;
uniform float _HeightAmp;

#define DISTORTSTR 1.2
#define SCROLLDISTORTSTR 0.6
#define DISPLACEMENTSTR 0.4
#define HEIGHTMAPSTR 0.33
#define lumaK 0.33333333333333333
#define PI 3.14159265359

// #define RIPPLE_SPATIALF 3.0
#define RIPPLE_SPATIALF 3.5
#define RIPPLE_TEMPORALF 4.21
// #define RIPPLE_TEMPORALF 6.21
#define RIPPLE_AMP 0.125
// #define HEIGHTMAP_AMP 0.53
// #define HEIGHTMAP_AMP 0.33
#define HEIGHTMAP_AMP 0.8


void main() {

    vec3 pos = position;
    pos.xy *= _ViewplaneSize * mix(0.85, 1.0, _Scale) * mix(1.0, 1.535, _ViewModePhase);

    vec3 col = texture2D(_Image, uv).xyz;
    // float heightMapDistort = (col.x + col.y + col.z) * lumaK;
    float heightMapDistort = dot(col, vec3(0.333, 0.333, 0.333));
    heightMapDistort = mix(heightMapDistort, 1.0 - heightMapDistort, _FlipFlowMapForce);

    vec2 phasePos = position.xy;
    phasePos.xy *= 0.7; //makes quads look better but I dont think this is correct (could have just used any constant)
    float phase = 1.0 - (dot(phasePos, phasePos));
    vPhase = phase;
    pos.z += (phase * DISPLACEMENTSTR + (heightMapDistort * HEIGHTMAPSTR)) * _ScrollPhase * SCROLLDISTORTSTR;
    
    float viewmodePhase = _ViewModePhase * 4.0 * (1.0 - _ViewModePhase);

    float ripplePhase = (1.0 - (cos(RIPPLE_TEMPORALF * _ViewModePhase + (phase * RIPPLE_SPATIALF)))) * RIPPLE_AMP;
    ripplePhase *= viewmodePhase;
    pos.z += ripplePhase;
    pos.z += (phase * heightMapDistort * HEIGHTMAP_AMP) * viewmodePhase;

    mat4 modelViewProjection = projectionMatrix * modelViewMatrix;
    vDistort = vec3(0.0, 0.0, 0.0);

    if(_InView) {

        vec4 clipPos = modelViewProjection * vec4(pos, 1.0);
        clipPos.xyz /= clipPos.w;
        clipPos.xy = clipPos.xy * 0.5 + 0.5;

        vec3 distort = texture2D(_FlowMap, clipPos.xy).xyz * DISTORTSTR;
        vDistort = distort;
        pos += distort * max(0.2, heightMapDistort) * _FlowMapPhase * distort.z;

    }

    gl_Position = modelViewProjection * vec4(pos, 1.0);
    vUv = uv;
    vMvPos = (modelViewMatrix * vec4(position, 1.0)).xyz;

}