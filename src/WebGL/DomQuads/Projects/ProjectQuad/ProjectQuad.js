import DomQuad from "../../../extras/DomQuad/DomQuad.js";
import {
  Program
} from "../../../../../vendors/ogl/src/core/Program.js";
import {
  Texture
} from "../../../../../vendors/ogl/src/core/Texture.js";
import {
  Plane
} from "../../../../../vendors/ogl/src/extras/Plane.js";

const vert = require("./shaders/projectQuad.vert");
const frag = require("./shaders/projectQuad.frag");

import bNoise from '../../../../../static/data/*.png';

import {
  makeid
} from "../../../../../utils/Math.js";
import eventEmitter from "../../../../EventEmitter.js";
const emitter = eventEmitter.emitter;
import events from "../../../../../utils/events.js";

import {
  gsap
} from "gsap";
import {
  Vec2
} from "../../../../../vendors/ogl/src/math/Vec2.js";

export default class ProjectQuad extends DomQuad {
  constructor(gl, {
    media,
    posOffset = 0
  }) {
    super(gl);

    this.gl = gl;

    this.id = makeid({
      length: 9
    });

    this.index = posOffset; //rename argument

    this.media = media;

    this.video = this.media.video;

    this.loopLimit = 6; //hardcoded for now

    this.initPos = this.position.z = 0 - posOffset;

    this.targetPos = this.position.z;

    this.inScrollMode = false;

    this.scrollPhase = 0;

    this.isInView = false;

    this.positionRestored = false;

    this.restoreDelta = 1;

    this.restorePhase = 0;

    this.restoreEase = 0;

    this.initProgram();

    this.initEvents();
  }

  initEvents() {
    emitter.on(events.PLAY_VIDEO, this.playVideo);
    emitter.on(events.PAUSE_VIDEO, this.pauseVideo);

    emitter.on(events.APPLY_SCROLL_MODE_ANIM, this.applyScrollMode);
    emitter.on(events.REMOVE_SCROLL_MODE_ANIM, this.removeScrollMode);
  }

  initProgram = () => {
    this.geometry = new Plane(this.gl, {
      width: 2,
      height: 2,
      widthSegments: 32.0,
      heightSegments: 32.0
    });

    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
      width: 256,
      height: 256,
      minFilter: this.gl.LINEAR,
      magFilter: this.gl.LINEAR
    });

    const blueNoise = new Texture(this.gl, {
      generateMipmaps: false,
      width: 470,
      height: 470,
      minFilter: this.gl.NEAREST,
      magFilter: this.gl.NEAREST,
      wrapS: this.gl.REPEAT,
      wrapT: this.gl.REPEAT
    });

    const bluenoiseImg = new Image();
    bluenoiseImg.crossOrigin = "*";
    bluenoiseImg.src = bNoise.BlueNoise64Tiled;
    bluenoiseImg.onload = () => blueNoise.image = bluenoiseImg;

    if (this.media.videoSrc !== null && window.isMobile === false)
      this.loadVideo();
    if (this.media.imageSrc !== null && window.isMobile) this.loadImage();

    const u = {
      _ViewplaneSize: {
        value: this.viewPlaneSize
      },
      _Time: {
        value: 0
      },
      _Image: {
        value: this.texture
      },
      _FlowMap: {
        value: new Texture(this.gl)
      },
      _BlueNoise: {
        value: blueNoise
      },
      _Resolution: {
        value: new Vec2(this.gl.canvas.width, this.gl.canvas.height)
      },
      _FlowMapPhase: {
        value: 1.0
      },
      _ScrollPhase: {
        value: 0
      },
      _RestorePhase: {
        value: 0
      },
      _InputForce: {
        value: 0.0
      },
      _FlipFlowMapForce: {
        value: this.media.brightVal
      },
      _ScalePhase: {
        value: 0.0
      },
      _RevealPhase: {
        value: 0.0
      },
      _ClipRevealPhase: {
        value: 0.0
      },
      _UvScalePhase: {
        value: 0.0
      },
      _ViewModePhase: {
        value: 0.0
      },
      _Entering: {
        value: 0.0
      },
      _RevealDirection: {
        value: 0.0
      },
      _InView: {
        value: 0.0
      },
      _Alpha: {
        value: 0.0
      },
      _Scale: {
        value: 1.0
      }
    };

    this.program = new Program(this.gl, {
      vertex: vert,
      fragment: frag,
      uniforms: u,
      transparent: false
    });
  };

  //consider making the animation faster
  applyScrollMode = () => {
    this.inScrollMode = true;
    this.animateScrollModeUniforms({
      scale: 0.0,
      alpha: 1.0,
      alphaPhase: 1.0,
      flowMapPhase: 0.0
    });
  };

  removeScrollMode = () => {
    this.inScrollMode = false;
    this.animateScrollModeUniforms({
      scale: 1.0,
      alpha: this.isInView ? 1.0 : 0.0,
      alphaPhase: 0.0,
      flowMapPhase: this.isInView ? 1.0 : 0.0
    });
    this.targetPos = Math.round(this.position.z);
    const delta = this.targetPos - this.position.z;
    this.restoreDelta = Math.abs(delta) > 0 ? delta : 1.0;
  };

  update({
    force
  }) {
    if (this.inScrollMode) {
      this.position.z += force;
      this.scrollPhase += force;

      this.loopPosition();
    } else {
      this.restorePosition();
    }

    this.updateScrollPhase();
    this.visible = this.inBounds();

    // if (this.video === null || this.inScrollMode || this.visible === false) return;
    if (this.video === null || this.video === undefined || this.inScrollMode)
      return;
    this.updateVideoTexture();
  }

  loopPosition() {
    if (this.position.z < -this.loopLimit) {
      this.position.z += this.loopLimit + 1;
    } else if (this.position.z > 1.0) {
      this.position.z -= this.loopLimit + 1;
    }
  }

  updateScrollPhase() {
    this.scrollPhase = Math.max(-1.0, Math.min(1.0, this.scrollPhase));
    this.program.uniforms._ScrollPhase.value = this.scrollPhase;
    this.scrollPhase *= Math.abs(this.scrollPhase) < 0.001 ? 0.0 : 0.94;
  }

  // restorePosition() {
  //   let delta = this.targetPos - this.position.z;
  //   this.restoreEase = delta * 0.1;
  //   this.position.z += this.restoreEase;

  //   if (Math.abs(delta) < 0.0001) {
  //     this.position.z = Math.round(this.position.z);
  //     this.restoreEase = 0;
  //     // this.positionRestored = true;
  //   } else {
  //     this.restorePhase = delta / this.restoreDelta;
  //     let fallOff = 1.0 - ((1.0 - this.restorePhase) * (1.0 - this.restorePhase));
  //     this.restoreEase *= 0.5 + (1.0 - 0.5) * fallOff;
  //     this.program.uniforms._RestorePhase.value = this.restorePhase;
  //   }
  // }

  restorePosition() {
    let delta = this.targetPos - this.position.z;

    this.restorePhase = 1.0 - (delta / this.restoreDelta);
    let fallOff = 1.0 - ((1.0 - this.restorePhase) * (1.0 - this.restorePhase));

    // this.restoreEase = delta * (0.04 + (0.08 - 0.04) * fallOff);
    this.restoreEase = delta / (20.0 + ((10.0 - 20.0) * fallOff));
    this.position.z += this.restoreEase;

    if (Math.abs(delta) < 0.001) {
      this.position.z = Math.round(this.position.z);
      this.restoreEase = 0;
      // this.positionRestored = true;
    }

    this.program.uniforms._RestorePhase.value = this.restorePhase;
  }

  animateScrollModeUniforms({
    scale,
    alpha,
    alphaPhase,
    flowMapPhase
  }) {
    if (this.scrollModeTl) this.scrollModeTl.kill();
    this.scrollModeTl = gsap.timeline({});
    this.scrollModeTl.to(
      this.program.uniforms._Alpha, {
        value: alpha,
        duration: 0.5,
        ease: "power1.out"
      },
      "<"
    );

    this.scrollModeTl.to(
      this.program.uniforms._Scale, {
        value: scale,
        duration: 0.35,
        ease: "power1.out"
      },
      "<"
    );

    this.scrollModeTl.to(
      this.program.uniforms._ScalePhase, {
        value: alphaPhase,
        duration: 0.35,
        ease: "power1.out"
      },
      "<"
    );

    this.scrollModeTl.to(
      this.program.uniforms._FlowMapPhase, {
        value: flowMapPhase,
        duration: 0.3,
        ease: "power1.out"
      },
      "<"
    );
  }

  updateVideoTexture() {
    if (this.isInView === false || this.inScrollMode) return;
    if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
      this.texture.image = this.video;
      this.texture.needsUpdate = true;
    }
  }

  playVideo = () => {
    if (this.video === null || this.video === undefined) return;
    if (
      this.inView({
        inViewPosZ: 0
      })
    )
      this.video.play();
  };

  pauseVideo = () => {
    if (this.video === null || this.video === undefined) return;
    this.video.pause();
  };

  loadVideo() {
    this.video = document.createElement("video");

    this.video.crossOrigin = "*";

    this.video.addEventListener("loadeddata", () => {
      if (this.video.readyState >= this.video.HAVE_CURRENT_DATA) {
        this.texture.image = this.video;
        this.texture.needsUpdate = true;
        emitter.emit(events.TEXTURE_LOADED);
      }
    });

    this.video.src = this.media.videoSrc;

    this.video.load();

    this.video.muted = true;

    this.video.loop = true;

    this.video.currentTime = 0.1;

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

  inBounds() {
    const roundPosZ = Math.round(this.position.z);
    return roundPosZ > -4.0 && roundPosZ < 1.0;
    // return (this.position.z > -5.0 && this.position.z < 1.0);
  }

  inView({
    inViewPosZ
  }) {
    this.isInView =
      Math.round(this.position.z) === inViewPosZ ? true : false;
    this.program.uniforms._InView.value = this.isInView ? 1.0 : 0.0;
    return this.isInView;
  }
}