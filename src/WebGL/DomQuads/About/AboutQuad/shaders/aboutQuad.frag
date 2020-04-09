precision highp float;

// uniform sampler2D _Image;
uniform float _Alpha;
uniform float _Aspect;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    // uv -= 0.5;
    // uv.x *= _Aspect;
    // uv += 0.5;

    // vec3 img = texture2D(_Image, uv).xyz;

    // gl_FragColor = vec4(img, _Alpha);
    gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), _Alpha);

}