precision highp float;

uniform sampler2D _Image;
uniform float _AlphaPhase; //rename to scroll mode phase
uniform float _Alpha;
uniform float _RevealPhase;
uniform float _RevealDirection;

varying vec2 vUv;
varying vec3 vMvPos;
varying vec3 mPos;

void main() {

    vec2 uv = vUv;
    uv -= 0.5;
    uv *= mix(1.0, 0.75, _AlphaPhase);
    uv += 0.5;

    vec3 img = texture2D(_Image, uv).xyz;
    float len = (vMvPos.z * vMvPos.z);
    float alpha = smoothstep(0.25, 0.5, len) * mix(1.0, smoothstep(20.0, 0.0, len), _AlphaPhase);
    // alpha *= step(abs((vUv.y * 0.99) * 2.0 - 1.0), _RevealPhase);
    alpha *= mix(step(vUv.y * 0.99, _RevealPhase), step(1.0 - (vUv.y * 0.99), _RevealPhase), _RevealDirection);
  
    gl_FragColor = vec4(img, alpha);

}