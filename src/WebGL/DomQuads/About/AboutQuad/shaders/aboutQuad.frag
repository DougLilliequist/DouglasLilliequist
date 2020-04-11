precision highp float;

uniform sampler2D _Image;
uniform sampler2D _FlowMap;
uniform float _Alpha;
uniform float _Aspect;

varying vec2 vUv;
varying vec2 vClipPos;

void main() {

    vec2 uv = vUv;

    uv -= 0.5;
    uv.x *= _Aspect;
    uv += 0.5;

    vec3 flow = texture2D(_FlowMap, vClipPos).xyz;
    vec2 offSet = flow.xy;

    // float r = texture2D(_Image, uv - vec2(offSet.x, 0.0) * 0.01).x;
    // float g = texture2D(_Image, uv + offSet * 0.005).y;
    // float b = texture2D(_Image, uv + vec2(offSet.x, 0.0) * 0.01).z;

    float r = texture2D(_Image, uv + offSet * 0.01).x;
    float g = texture2D(_Image, uv + offSet * 0.001).y;
    float b = texture2D(_Image, uv - offSet * 0.01).z;
    // vec3 img = texture2D(_Image, uv).xyz;

    vec3 outPutCol = vec3(r,g,b);

    gl_FragColor = vec4(outPutCol, _Alpha);
    // gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), _Alpha);

}