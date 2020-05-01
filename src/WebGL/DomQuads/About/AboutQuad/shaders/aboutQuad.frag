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
    vec2 offSet = flow.xy;

    float r = texture2D(_Image, uv + offSet * 0.008).x;
    float g = texture2D(_Image, uv + offSet * 0.001).y;
    float b = texture2D(_Image, uv - offSet * 0.008).z;

    vec3 outPutCol = vec3(r,g,b);

    gl_FragColor = vec4(outPutCol, mix(step(vUv.y, _Alpha), 1.0 - step(_Alpha, vUv.x * 0.99), _RevealDirection));

}