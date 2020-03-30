import {
  Mesh,
  Program,
  Vec2,
  Texture,
  Plane
} from "ogl";

import {
  getCameraViewplaneSize
} from "../../utils/getCameraViewplaneSize";

const vert = require("./shaders/domQuad.vert");
const frag = require("./shaders/domQuad.frag");

import {loopNegativeNumber} from '../../../../utils/Math';
import eventEmitter from '../../../EventEmitter.js'
const emitter = eventEmitter.emitter;
import events from '../../../../utils/events.js';

import {gsap} from 'gsap';

export default class DomQuad extends Mesh {
  constructor(
    gl,
    camera,
    domElement, {
      widthSegments = 1.0,
      heightSegments = 1.0,
      posOffset = 0.0,
      phase = 0.0
    }
  ) {
    super(gl);

    this.name = `PROJECT ${posOffset}`

    this.phase = phase; //rename later

    this.position.z = -posOffset;

    this.resetPosition = false;

    this.prevPosition = this.targetPos = this.position.z; //remove prev position

    this.inScrollMode = false;

    // this.inView = false;

    this.geometry = new Plane(gl, {
      width: 1,
      height: 1,
      widthSegments: widthSegments,
      heightSegments: heightSegments
    });

    this.initProgram({el: domElement, alphaPhase: phase});

    this.updateDimensions({
      domElement,
      camera
    });

    this.calcDomToWebGLPos({
      domElement: domElement,
      camera: camera
    });

    emitter.on(events.PLAY_VIDEO, this.playVideo);
    emitter.on(events.PAUSE_VIDEO, this.pauseVideo);

  }

  initProgram({el, alphaPhase}) {
    const elementHasImage = el.children[0] instanceof HTMLImageElement || el.children[0] instanceof HTMLVideoElement;

    this.video = null;

    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
      width: 512,
      height: 512
    });
    let imageAspect;

    if (elementHasImage) {

      if(el.children[0] instanceof HTMLVideoElement) this.video = el.children[0];
      
      this.video.muted = true;
      this.video.loop = true;


      imageAspect = this.texture.width / this.texture.height;
    } else {
      imageAspect = 1.0;
    }

    this.cameraViewplaneSize = new Vec2(1.0, 1.0);
    this.viewportScalePhase = new Vec2(1.0, 1.0);

    const rect = el.getBoundingClientRect();

    const u = {
      _ViewplaneSize: {
        value: new Vec2(1.0, 1.0)
      },
      _Time: {
        value: 0
      },
      _Image: {
        value: this.texture
      },
      _InputForce: {
        value: 0.0
      },
      _AlphaPhase: {
        value: 0.0
      },
      _Alpha: {
        value: 1.0
      },
      _Scale: {
        value: 1.0
      },
      _ImageAspect: {
        value: 1.0 //hard coded based on proved image
      },
      _Aspect: {
        value: rect.height / rect.width
      }
    };

    this.program = new Program(this.gl, {
      vertex: vert,
      fragment: frag,
      uniforms: u,
      transparent: true
    });
  }

  //make animations into timeline anims
  applyScrollMode() {

    this.inScrollMode = true;

    // if(this.video) {
    //   this.video.pause();
    // }

    gsap.to(this.program.uniforms._Alpha, {
      value: 0.65,
      duration: 0.5,
      ease: "power2.inOut"
    })

    gsap.to(this.program.uniforms._Scale, {
      value: 0.85,
      duration: 0.5,
      ease: "power2.inOut"
    })

    // gsap.to(this.program.uniforms._AlphaPhase, {
    //   value: 1.0,
    //   duration: 0.5,
    //   ease: "power2.inOut"
    // })

  }

  removeScrollMode() {

    this.inScrollMode = false;

    // if(this.inView({inViewPosZ: 0 - this.parent.position.z})) {
    //   this.video.play();
    // }

    gsap.to(this.program.uniforms._Alpha, {
      value: 1.0,
      duration: 0.5,
      ease: "power2.inOut"
    })

    
    gsap.to(this.program.uniforms._Scale, {
      value: 1.0,
      duration: 0.5,
      ease: "power2.inOut"
    })

    // gsap.to(this.program.uniforms._AlphaPhase, {
    //   value: 0.0,
    //   duration: 0.5,
    //   ease: "power2.inOut"
    // })

  }

  update(force, interacting) {

    if(this.video !== null) {
      this.updateVideoTexture();
    }

    if(interacting) {
      this.position.z += force;
    } else {
      this.position.z += (this.targetPos - this.position.z) * 0.05;
    }

    this.position.z = loopNegativeNumber({a: this.position.z, b: -5.0});

  }

  inView({inViewPosZ = 0}) {

    if(Math.round(this.position.z) === inViewPosZ) {
      return true;
    } else {
      return false;
    }

  }

  updateVideoTexture() {

      if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
        this.texture.image = this.video;
        this.texture.needsUpdate = true;
      }

  }

  playVideo = () => {

    if(this.video === null) return;
    if(this.inView({inViewPosZ: 0 - this.parent.position.z})) this.video.play();

  }

  pauseVideo = () => {

    if(this.video === null) return;
    this.video.pause();

  }

  //get camera's current viewplane dimensions as well as the reference dom's scale phase
  //based on the viewport's current size to determine final width and height
  //relative to the camera's view plane
  updateDimensions({
    domElement,
    camera
  }) {
    //get current viewplane size based on perspective camera's fov and desired plane distance
    this.cameraViewplaneSize = getCameraViewplaneSize(camera); //make this globally available

    this.viewportScalePhase = this.calcViewportScalePhase(domElement);

    const w = this.cameraViewplaneSize.x * this.viewportScalePhase.x;
    const h = this.cameraViewplaneSize.y * this.viewportScalePhase.y;
    this.program.uniforms._ViewplaneSize.value.set(w, h);
  }

  calcViewportScalePhase(domElement) {
    const rect = domElement.getBoundingClientRect();
    const viewportScaleX = rect.width / window.innerWidth;
    const viewportScaleY = rect.height / window.innerHeight;

    //should not be here anymore
    if (this.program) {
      this.program.uniforms._Aspect.value = rect.height / rect.width;
    }

    return new Vec2(viewportScaleX, viewportScaleY);
  }

  //tranlate the dom elements position in "dom space" to a position relative
  //to the calculted view plane's dimensions
  calcDomToWebGLPos({
    domElement
  }) {
    
    const rect = domElement.getBoundingClientRect();

    const posPhaseX =
      2.0 * ((rect.left + rect.width * 0.5) / window.innerWidth) - 1.0;
    const posPhaseY =
      2.0 * ((rect.top + rect.height * 0.5) / window.innerHeight) - 1.0;

    const posX = posPhaseX * this.cameraViewplaneSize.x;
    const posY = posPhaseY * this.cameraViewplaneSize.y * -1.0;

    //set position of quad
    this.position.x = posX;
    this.position.y = posY;
  }
}