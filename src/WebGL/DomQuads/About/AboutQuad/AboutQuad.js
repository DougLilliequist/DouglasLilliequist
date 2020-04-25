import {Program} from '../../../../../vendors/ogl/src/core/Program';
import {Vec2} from '../../../../../vendors/ogl/src/math/Vec2';
import {Texture} from '../../../../../vendors/ogl/src/core/Texture';
import {Plane} from '../../../../../vendors/ogl/src/extras/Plane';
import DomQuad from "../../../extras/DomQuad/DomQuad";

const vert = require('./shaders/aboutQuad.vert');
const frag = require('./shaders/aboutQuad.frag');

import {gsap} from 'gsap';


export default class AboutQuad extends DomQuad {

    constructor(
        gl,
        media, {
          widthSegments,
          heightSegments,
        } = {}
      ) {

        super(gl, {
            widthSegments,
            heightSegments
        });

        this.gl = gl;

        this.image = media;

        this.initProgram();

      }

      initProgram = () => {

        this.texture = new Texture(this.gl, {
            generateMipmaps: false,
            width: 1024,
            height: 1024
        });

        // const img = new Image();
        // img.src = 'assets/img/portrait.png';
        // img.onLoad = () => this.texture.image = img;
        this.texture.image = this.image;
        // this.image.onLoad = () => this.texture.image = this.image;

        this.geometry = new Plane(this.gl, {
            width: 2,
            height: 2,
            widthSegments: 32.0,
            heightSegments: 32.0
          });

        const u = {

            _ViewplaneSize: {
                value: this.viewPlaneSize
            },
            _Image: {
                value: this.texture
            },
            _FlowMap: {
                value: null
            },
            _Alpha: {
                value: 0.0
            },
            _Aspect: {
                value: this.aspect
            }

        }

        this.program = new Program(this.gl, {
            vertex: vert,
            fragment: frag,
            uniforms: u,
            transparent: true
        });

      }
      
      reveal() {

        gsap.to(this.program.uniforms._Alpha, {
            duration: 1.0,
            value: 1.0
        });

      }

      hide() {

        gsap.to(this.program.uniforms._Alpha, {
            duration: 0.75,
            value: 0.0,
            ease: "sine.inOut"
        });

      }

      update(flowMap) {
        
        this.program.uniforms._Aspect.value = this.aspect;
        this.program.uniforms._FlowMap.value = flowMap;

      }

}