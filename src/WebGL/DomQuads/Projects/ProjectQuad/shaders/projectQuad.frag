precision highp float;

uniform sampler2D _Image;
uniform float _AlphaPhase;
uniform float _Alpha;

varying vec2 vUv;
varying vec3 vMvPos;
varying vec3 mPos;

void main() {

    vec2 uv = vUv;

    vec3 img = texture2D(_Image, uv).xyz;
    float len = (vMvPos.z * vMvPos.z);

    float alpha = _Alpha * smoothstep(0.25, 0.5, len);


    gl_FragColor = vec4(img, alpha);

}