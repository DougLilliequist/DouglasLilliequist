precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform vec2 _ViewplaneSize;
uniform sampler2D _FlowMap;
uniform sampler2D _Image;

uniform float _Aspect;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;
varying vec2 vClipPos;

void main() {

    vec3 pos = position;
    pos.xy *= _ViewplaneSize;

    vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    clipPos.xyz /= clipPos.w;
    clipPos.xy = clipPos.xy * 0.5 + 0.5;

    vec3 distort = texture2D(_FlowMap, clipPos.xy).xyz * 0.2;

    vec2 imgCoord = uv;
    // imgCoord.x *= _Aspect;

    vec3 col = texture2D(_Image, imgCoord).xyz;
    float heightMap = (col.x + col.y + col.z) / 3.0;
    pos += distort * max(0.1, heightMap);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
    vClipPos = clipPos.xy;

}