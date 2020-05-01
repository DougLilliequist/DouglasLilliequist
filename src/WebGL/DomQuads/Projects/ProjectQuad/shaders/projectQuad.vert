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

uniform sampler2D _Image;
uniform float _Scale;
uniform bool _InView;

uniform vec2 _ViewplaneSize;
varying vec3 vMvPos;
varying vec3 mPos;

varying vec2 vUv;
varying vec2 vClipPos;

#define DISTORTSTR 0.8

void main() {

    vec3 pos = vec3(position.x * _ViewplaneSize.x, position.y * _ViewplaneSize.y, 0.0);
    pos *= _Scale;

    mat4 modelViewProjection = projectionMatrix * modelViewMatrix;

    if(_InView) {

        vec4 clipPos = modelViewProjection * vec4(pos, 1.0);
        clipPos.xyz /= clipPos.w;
        clipPos.xy = clipPos.xy * 0.5 + 0.5;

        vec3 distort = texture2D(_FlowMap, clipPos.xy).xyz * DISTORTSTR;
        vec3 col = texture2D(_Image, uv).xyz;
        float heightMapDistort = (col.x + col.y + col.z) / 3.0;
        heightMapDistort = mix(heightMapDistort, 1.0 - heightMapDistort, _FlipFlowMapForce);
        pos += distort * max(0.1, heightMapDistort) * _FlowMapPhase * distort.z;
        vClipPos = clipPos.xy;

    }

    gl_Position = modelViewProjection * vec4(pos, 1.0);
    vUv = uv;
    vMvPos = (modelViewMatrix * vec4(pos, 1.0)).xyz;

}