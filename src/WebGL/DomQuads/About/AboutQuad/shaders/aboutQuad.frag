precision highp float;

uniform sampler2D _Image;
uniform sampler2D _FlowMap;
uniform float _Alpha;
uniform float _Aspect;

uniform float _RevealDirection;

varying vec2 vUv;
varying vec2 vClipPos;

void main() {

    vec2 uv = vUv;

    uv -= 0.5;
    uv.x *= _Aspect;
    uv += 0.5;

    vec3 flow = texture2D(_FlowMap, vClipPos).xyz;

    uv -= flow.xy * 0.8;

    vec2 offSet = flow.xy;

    float r = texture2D(_Image, uv + offSet * 0.01).x;
    float g = texture2D(_Image, uv + offSet * 0.001).y;
    float b = texture2D(_Image, uv - offSet * 0.01).z;

    vec3 outPutCol = vec3(r,g,b);

    gl_FragColor = vec4(outPutCol, mix(step(vUv.y, _Alpha), 1.0 - step(vUv.y, 1.0 - _Alpha), _RevealDirection));

}