import {
    Transform
} from "../../../vendors/ogl/src/core/Transform";
import {
    Triangle
} from "../../../vendors/ogl/src/extras/Triangle";
import {
    Mesh
} from "../../../vendors/ogl/src/core/Mesh";
import {
    Program
} from "../../../vendors/ogl/src/core/Program";
import {
    Vec2
} from "../../../vendors/ogl/src/math/Vec2";
import {
    RenderTarget
} from "../../../vendors/ogl/src/core/RenderTarget";

const vert = require('./shaders/triangle.vert');
const frag = require('./shaders/feedback.frag');

export default class Feedback {

    constructor(gl, {
        resolution
    }) {

        this.gl = gl;

        this.scene = new Transform;

        this.initFBO(resolution);

        this.initProgram();

    }

    initFBO(size) {

        this.capturedScene = this.createRenderTexture(size);
        this.read = this.createRenderTexture(size);
        this.write = this.createRenderTexture(size);

    }

    swap() {

        const tmp = this.read;
        this.read = this.write;
        this.write = tmp;

    }

    createRenderTexture(s) {

        const params = {
            width: s.x,
            height: s.y,
            type: this.gl.HALF_FLOAT || this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES,
            format: this.gl.RGBA,
            internalFormat: this.gl.RGBA16F,
            depth: false
        }
        return new RenderTarget(this.gl, params);
    }

    initProgram() {

        const geometry = new Triangle(this.gl);

        const u = {

            _PrevFrame: {
                value: this.read.texture
            },
            _CurrentFrame: {
                value: this.capturedScene.texture
            },
            _InputPos: {
                value: new Vec2(0.0, 0.0)
            },
            _Time: {
                value: 0
            }

        }

        const program = new Program(this.gl, {
            vertex: vert,
            fragment: frag,
            uniforms: u,
            depthTest: false,
            depthWrite: false,
        });

        this.feedback = new Mesh(this.gl, {
            geometry,
            program
        });
        this.feedback.setParent(this.scene);

    }

    render({
        dt = 0.0,
        scene,
        camera
    }) {

        this.gl.renderer.render({
            scene,
            camera,
            target: this.capturedScene,
            clear: true
        });

        this.feedback.program.uniforms._PrevFrame.value = this.read.texture;
        this.feedback.program.uniforms._CurrentFrame.value = this.capturedScene.texture;
        this.feedback.program.uniforms._Time.value += dt;

        this.gl.renderer.render({
            scene: this.scene,
            target: this.write,
        });

        this.swap();

    }

    onResize() {

        let size = new Vec2(this.gl.renderer.width, this.gl.renderer.height);
        this.capturedScene = this.createRenderTexture(size);
        this.read = this.createRenderTexture(size);
        this.write = this.createRenderTexture(size);

    }

    get Texture() {
        return this.read.texture;
    }

}