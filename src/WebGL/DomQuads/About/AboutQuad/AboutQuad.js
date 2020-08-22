import {
  Program
} from '../../../../../vendors/ogl/src/core/Program';
import {
  Texture
} from '../../../../../vendors/ogl/src/core/Texture';
import {
  Plane
} from '../../../../../vendors/ogl/src/extras/Plane';
import DomQuad from "../../../extras/DomQuad/DomQuad";

const vert = require('./shaders/aboutQuad.vert');
const frag = require('./shaders/aboutQuad.frag');

import eventEmitter from '../../../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../../../utils/events.js';

import {
  gsap
} from 'gsap';


export default class AboutQuad extends DomQuad {

  constructor(
    gl, {
      media
    }
  ) {

    super(gl);

    this.gl = gl;

    this.media = media[0];

    this.initProgram();

  }

  initProgram() {

    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
      minFilter: this.gl.LINEAR,
      magFilter: this.gl.LINEAR,
      width: 1024,
      height: 1024
    });

    if (this.media.imageSrc) this.loadImage();

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
      _ClipRevealPhase: {
        value: 0.0
      },
      _UvScalePhase: {
        value: 0.0
      },
      _Alpha: {
        value: 0.0
      },
      _RevealDirection: {
        value: 0.0
      },
      _Aspect: {
        value: this.viewPlaneSize.x / this.viewPlaneSize.y
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

    gsap.set(this.program.uniforms._RevealDirection, {
      value: 0.0
    });

    gsap.to(this.program.uniforms._ClipRevealPhase, {
      duration: 2.0,
      value: 1.0,
      ease: "power2.inOut"
    });

    gsap.to(this.program.uniforms._UvScalePhase, {
      duration: 2.0,
      value: 1.0,
      ease: "power2.inOut"
    });

  }

  hide() {

    gsap.set(this.program.uniforms._RevealDirection, {
      value: 1.0
    });

    gsap.to(this.program.uniforms._ClipRevealPhase, {
      duration: 1.0,
      value: 0.0,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(this.program.uniforms._UvScalePhase, {
          value: 0.0
        })
      }
    });

  }

  update(flowMap) {

    // this.program.uniforms._Aspect.value = this.aspect;
    this.program.uniforms._FlowMap.value = flowMap;

  }

  loadImage() {
    const img = new Image();

    img.crossOrigin = "*";

    img.src = this.media.imageSrc;

    img.onload = () => {
      this.texture.image = img;
      emitter.emit(events.TEXTURE_LOADED);
    };

  }


}