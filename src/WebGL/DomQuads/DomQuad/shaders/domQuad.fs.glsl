precision highp float;

uniform sampler2D _Image;
uniform float _ImageAspect;
uniform float _Aspect;
uniform float _Time;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    float aspect = _ImageAspect / _Aspect;

    uv -= 0.5;
    // uv.x /= _ImageAspect;
    uv.x *= aspect;
    // uv /= aspect;
    uv += 0.5;

    float slitscanPhase = floor(uv.x * 84.0) / 84.0;
    // uv.y += (0.5 + sin(_Time + slitscanPhase * 16.0) * 0.5) * .07;
    // uv.y += (0.5 + sin(_Time + uv.x * 5.0) * 0.5) * .05;
    // uv.x += (0.5 + sin(_Time + (2.0 * uv.x - 1.0) * 2.0) * 0.5);

    vec4 img = texture2D(_Image, uv);

    gl_FragColor = img;

}