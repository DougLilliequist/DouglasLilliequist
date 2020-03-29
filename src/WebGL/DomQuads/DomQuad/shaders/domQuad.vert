precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;

uniform float _Time;

uniform vec2 _ViewplaneSize;
// uniform vec2 _CameraViewportSize;
// uniform vec2 _ViewportScale;
varying vec3 vMvPos;
varying vec3 mPos;

varying vec2 vUv;

//GET CLIP POSITIONS AND COMPARE WITH MOUSE TO DISPLACE VERTICES

void main() {

    vec3 pos = vec3(position.x * _ViewplaneSize.x, position.y * _ViewplaneSize.y, 0.0);
    // vec3 pos = vec3(position.x, position.y, 0.0);
    // pos.xy *= _CameraViewportSize;
    float phase = length(pos.xy);
    // phase = phase;
    // pos.xyz += (0.5 + sin(14.0 * phase + _Time) * 0.5) * .04 * (1.0 - phase);

    // pos.xy *= mix(0.5, 1.0, (cos(_Time) * 0.5 + 0.5));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
    vMvPos = (modelViewMatrix * vec4(pos, 1.0)).xyz;
    mPos = (modelMatrix * vec4(pos, 1.0)).xyz;

}