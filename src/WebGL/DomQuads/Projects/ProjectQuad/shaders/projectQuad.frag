precision highp float;

uniform sampler2D _Image;
uniform float _AlphaPhase; //rename to scroll mode phase
uniform float _Alpha;
uniform float _RevealPhase;
uniform float _RevealDirection;
uniform float _ScrollExtrude;

varying vec2 vUv;
varying vec3 vMvPos;

void main() {

    vec2 uv = vUv;
    // uv -= 0.5;
    // uv *= mix(1.0, 0.95, _AlphaPhase);
    // uv += 0.5;

    vec3 img = texture2D(_Image, uv).xyz;
    float inputPhase = ((_ScrollExtrude * 3.0));
    float r = texture2D(_Image, uv - vec2(inputPhase, 0.0) * 0.05).x;
    float g = texture2D(_Image, uv + vec2(0.0, inputPhase) * 0.005).y;
    float b = texture2D(_Image, uv + vec2(inputPhase, 0.0) * 0.05).z;

    float len = (vMvPos.z * vMvPos.z);
    // float alpha = _Alpha * smoothstep(0.25, 0.5, len) * mix(1.0, smoothstep(20.0, 0.0, len), _AlphaPhase);
    // float alpha = (1.0 - abs(_ScrollExtrude * 3.0)) * smoothstep(0.25, 0.5, len) * mix(1.0, smoothstep(20.0, 0.0, len), _AlphaPhase);
    float alpha = (1.0 - abs(_ScrollExtrude * 3.0)) * smoothstep(0.25, 0.5, len) * mix(1.0, smoothstep(20.0, 0.0, len), _AlphaPhase);
    // alpha *= step(abs((vUv.y * 0.99) * 2.0 - 1.0), _RevealPhase);
    // alpha *= step(vUv.x, _RevealPhase);
    alpha *= mix(step(vUv.y, _RevealPhase), step(1.0 - (vUv.x * 0.99), _RevealPhase), _RevealDirection);
  
    gl_FragColor = vec4(vec3(r,g,b), alpha);

}