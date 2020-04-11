precision highp float;

uniform sampler2D _PrevFrame;

uniform vec2 _InputPos;
uniform vec2 _InputVel;

uniform float _FadeRate;
uniform float _Force;
uniform float _Radius;
uniform float _Aspect;

varying vec2 vUv;

void main() {


    vec2 uv = vUv;
    uv = 2.0 * uv - 1.0;
    vec2 toInput = _InputPos - uv;
    toInput.x *= _Aspect;

    float phase = smoothstep(0.3, 0.0, length(toInput));
    vec3 vel = vec3(_InputVel,1.0 - pow(1.0 - min(1.0, length(_InputVel)), 2.0)) * phase * _Force;
    vec3 prev = texture2D(_PrevFrame, vUv).xyz;
    vec3 outputPhase = mix(vel, prev, _FadeRate);

    gl_FragColor = vec4(outputPhase, 1.0);

}