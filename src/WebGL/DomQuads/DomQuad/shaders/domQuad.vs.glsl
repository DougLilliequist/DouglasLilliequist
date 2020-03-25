precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float _Time;

uniform vec2 _ViewplaneSize;
// uniform vec2 _CameraViewportSize;
// uniform vec2 _ViewportScale;

varying vec2 vUv;

void main() {

    // vec3 pos = vec3(position.x * _CameraViewportSize.x, position.y * _CameraViewportSize.y, 0.0);
    vec3 pos = vec3(position.x * _ViewplaneSize.x, position.y * _ViewplaneSize.y, 0.0);
    // pos.xy *= _CameraViewportSize;
    float phase = length(pos.xy);
    // phase = phase;
    pos.xyz += (0.5 + sin(14.0 * phase + _Time) * 0.5) * .04 * (1.0 - phase);

    // pos.xy *= mix(0.5, 1.0, (cos(_Time) * 0.5 + 0.5));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;

}