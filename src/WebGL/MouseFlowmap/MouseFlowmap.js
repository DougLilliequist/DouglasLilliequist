import { Transform } from "../../../vendors/ogl/src/core/Transform";
import {Triangle} from "../../../vendors/ogl/src/extras/Triangle";
import {Mesh} from "../../../vendors/ogl/src/core/Mesh";
import {Program} from "../../../vendors/ogl/src/core/Program";
import { Vec2 } from "../../../vendors/ogl/src/math/Vec2";
import { RenderTarget } from "../../../vendors/ogl/src/core/RenderTarget";

const vert = require('./shaders/mouseFlowmap.vert');
const frag = require('./shaders/mouseFlowmap.frag');

export default class MouseFlowmap {

    constructor(gl, {
        size
    }) {

        this.gl = gl;

        this.scene = new Transform;

        this.initFBO(size);

        this.initProgram();

    }

    initFBO(size) {

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
            width: s,
            height: s,
            type: this.gl.HALF_FLOAT,
            format: this.gl.RGBA,
            internalFormat: this.gl.RGBA16F,
            depth: false
        }
        return new RenderTarget(this.gl, params);
    }

    initProgram() {

        const geo = new Triangle(this.gl);

        const u = {

            _PrevFrame: {
                value: this.read.texture
            },
            _InputPos: {
                value: new Vec2(0.0, 0.0)
            },
            _InputVel: {
                value: new Vec2(0.0, 0.0)
            },
            _Force: {
                value: 1.5
            },
            _Radius: {
                value: 0.5
            },
            _FadeRate: {
                value: 0.97
            },
            _Aspect: {
                value: this.gl.canvas.width / this.gl.canvas.height
            }

        }

        const program = new Program(this.gl, {
            vertex: vert,
            fragment: frag,
            uniforms: u,
            depthTest: false,
            depthWrite: false,
        });

        this.flowMap = new Mesh(this.gl, {geometry: geo, program: program});
        this.flowMap.setParent(this.scene);

    }

    update(renderer, {dt = 1.0, inputPos, inputDelta}) {

        this.flowMap.program.uniforms._InputPos.value.copy(inputPos);

        const velX = inputDelta.x / dt;
        const velY = inputDelta.y / dt;

        this.flowMap.program.uniforms._InputVel.value.set(velX, velY);

        this.flowMap.program.uniforms._PrevFrame.value = this.read.texture;

        renderer.render({scene: this.scene, target: this.write, clear: false});

        this.swap();

    }

    get Texture() {
        return this.read.texture;
    }

    get Aspect() {
        return this.flowMap.program.uniforms._Aspect.value;
    }

    set Aspect(a) {

        this.flowMap.program.uniforms._Aspect.value = a;

    }

}