precision highp float;

uniform sampler2D _CurrentFrame;
uniform sampler2D _PrevFrame;
uniform float _Time;

varying vec2 vUv;

//  1 out, 2 in...
float hash12(vec2 p)
{
	vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

void main() {

    vec3 currentFrame = texture2D(_CurrentFrame, vUv).xyz;
    
    vec3 prevFrame = texture2D(_PrevFrame, vUv).xyz;

    vec3 outPut = mix(currentFrame, prevFrame, 0.94);

    gl_FragColor = vec4(outPut, 1.0);

}