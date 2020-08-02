precision highp float;

uniform sampler2D _Image;
uniform sampler2D _FlowMap;
uniform float _Alpha;
uniform float _Aspect;
uniform vec2 _ViewplaneSize;

uniform float _RevealDirection;

varying vec2 vUv;
varying vec2 vClipPos;

float hash12(vec2 p)
{
	vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

void main() {

    vec2 uv = vUv;

    // float planeAspect = _ViewplaneSize.x / _ViewplaneSize.y;
    // float imageAspect = 683.0 / 1024.0;

    // float aspect = planeAspect / imageAspect;

    uv -= 0.5;
    // uv.x *= aspect;
    uv*= mix(0.5, 1.0, _Alpha);
    uv += 0.5;

    vec3 flow = texture2D(_FlowMap, vClipPos).xyz;

    uv -= flow.xy * 1.1;

    vec2 offSet = flow.xy;

    float r = texture2D(_Image, uv + offSet * 0.05).x;
    float g = texture2D(_Image, uv + offSet * 0.008).y;
    float b = texture2D(_Image, uv - offSet * 0.05).z;

    vec3 outPutCol = vec3(r,g,b);
    // outPutCol += hash12(vUv * 1000.0) * 0.1;


    gl_FragColor = vec4(outPutCol, mix(step(vUv.y, _Alpha), 1.0 - step(vUv.y, 1.0 - _Alpha), _RevealDirection));

}