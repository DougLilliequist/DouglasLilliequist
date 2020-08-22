precision highp float;

uniform sampler2D _Image;
uniform sampler2D _FlowMap;
uniform float _FlowMapPhase;

uniform float _ScalePhase;
uniform float _Scale;
uniform float _Alpha;
uniform float _RevealPhase;
uniform float _RevealDirection;
uniform float _ClipRevealPhase;
uniform float _UvScalePhase;
uniform float _ScrollPhase;
uniform float _ViewModePhase;
uniform float _Time;

varying vec2 vUv;
varying vec3 vMvPos;
varying vec3 vDistort;
varying float vPhase;
varying float vDamp;

#define OFFSETAMOUNTX 0.004
#define OFFSETAMOUNTY 0.001
#define MINVIEWDIST 0.24
#define MAXVIEWDIST 0.5
#define ALPHAFALLOFFDIST 30.0

float hash12(vec2 p)
{
	vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

void main() {

    vec2 uv = vUv;
    uv -= 0.5;
    uv *= mix(1.0, 0.85, _ScalePhase); //rename uniform
    uv *= mix(0.5, 1.0, _UvScalePhase);
    uv += 0.5;

    vec2 flow = vDistort.xy * _FlowMapPhase;
    // vec2 flow = texture2D(_FlowMap, vClipPos).xy * _FlowMapPhase;

    float inputPhase = _ScrollPhase * 3.0;
    vec2 offsetX = (vec2(1.0 + inputPhase, 0.0)) * OFFSETAMOUNTX;
    vec2 offsetY = (vec2(0.0, 1.0 + inputPhase)) * OFFSETAMOUNTY;

    float viewModePhase = (1.0 - abs(_ViewModePhase * 2.0 - 1.0));
    vec2 transitionOffsetX = vec2(0.01, 0.0) * viewModePhase * 0.0;
    vec2 transitionOffsetY = vec2(0.0, 0.001) * viewModePhase * 0.0;

    // float r = texture2D(_Image, uv - transitionOffsetX - offsetX - (flow * 0.02)).x;
    // float g = texture2D(_Image, uv + transitionOffsetY + offsetY + (flow * 0.002)).y;
    // float b = texture2D(_Image, uv + transitionOffsetX + offsetX + (flow * 0.02)).z;

    float r = texture2D(_Image, uv - transitionOffsetX - offsetX - (flow * 0.02)).x;
    float g = texture2D(_Image, uv + transitionOffsetY + offsetY + (flow * 0.002)).y;
    float b = texture2D(_Image, uv + transitionOffsetX + offsetX + (flow * 0.02)).z;
    // vec3 col = mix(vec3(r,g,b), vec3(1.0,1.0,1.0), 0.05);
    vec3 col = vec3(r,g,b);
    col += hash12(vUv * 1000.0 + _Time) * 0.2;

    float len = (vMvPos.z * vMvPos.z);
    float idleAlpha = smoothstep(MINVIEWDIST, MAXVIEWDIST, len);
    float scrollAlpha = idleAlpha * mix(1.0, 0.5, abs(_ScrollPhase)) * (smoothstep(ALPHAFALLOFFDIST, 0.0, len));
    float alpha = mix(idleAlpha, scrollAlpha, abs(_ScrollPhase));
    alpha *= _Alpha;

    //reveal phase
    // alpha *= step(abs((vUv.y * 0.99) * 2.0 - 1.0), _RevealPhase);
    // alpha *= step(vUv.x, _RevealPhase);
    // alpha *= mix(step(vUv.y, _RevealPhase), step(1.0 - (vUv.x * 0.99), _RevealPhase), _RevealDirection);
    alpha *= mix(step(vUv.y, _ClipRevealPhase), 1.0 - step((vUv.y * 0.99), 1.0 - _ClipRevealPhase), _RevealDirection);
    if(alpha <= 0.01) discard;
    gl_FragColor = vec4(col, alpha);
    // gl_FragColor = vec4(vDamp, vDamp, vDamp, alpha);
    // gl_FragColor = vec4(vPhase, vPhase, vPhase, 1.0);

}