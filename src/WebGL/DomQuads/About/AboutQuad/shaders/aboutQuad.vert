precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform vec2 _ViewplaneSize;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;

void main() {

    vec3 pos = position;

    pos.xy *= _ViewplaneSize;
    pos.z = 0.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;

}