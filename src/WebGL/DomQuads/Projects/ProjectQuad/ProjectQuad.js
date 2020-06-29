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

import {
  loopNegativeNumber,
  makeid
} from "../../../../../utils/Math.js";
import eventEmitter from "../../../../EventEmitter.js";
const emitter = eventEmitter.emitter;
import events from "../../../../../utils/events.js";

import {
  gsap
} from "gsap";

export default class ProjectQuad extends DomQuad {
  constructor(
    gl,
    media,
    domElement,{
      posOffset = 0.0
    }
  ) {
    super(gl,
      domElement);

    this.gl = gl;

    this.id = makeid({
      length: 9
    });

    this.index = posOffset; //rename argument

    // this.videos = media;
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
      width: 512,
      height: 512,
      minFilter: this.gl.LINEAR,
      magFilter: this.gl.LINEAR
    });

    this.updateTexture = false;
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
        value: 0.0
      },
      _ScalePhase: {
        value: 0.0
      },
      _RevealPhase: {
        value: 0.0
      },
      _ViewModePhase: {
        value: 0.0
      },
      _RevealDirection: {
        value: 0.0
      },
      _InView: {
        value: false
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
      transparent: true
    });
  };

  //consider making the animation faster
  applyScrollMode = () => {
    this.inScrollMode = true;
    this.animteUniforms({
      scale: 0.0,
      alpha: 1.0,
      alphaPhase: 1.0,
      flowMapPhase: 0.0
    });
  };

  removeScrollMode = () => {
    this.inScrollMode = false;
    this.animteUniforms({
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
      // this.positionRestored = false;
      this.position.z += force;
      this.scrollPhase += force;

      this.loopPosition();
    } else {
      // if (this.positionRestored === false) {
      this.restorePosition();
      // }
    }

    this.updateScrollPhase();
    this.visible = this.inBounds();

    // if (this.video === null || this.inScrollMode || this.visible === false) return;
    if (this.video === null || this.video === undefined || this.inScrollMode) return;
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

  restorePosition() {
    let delta = this.targetPos - this.position.z;
    this.restoreEase = delta * 0.1;
    this.position.z += this.restoreEase;
    if (Math.abs(delta) < 0.0001) {
      this.position.z = Math.round(this.position.z);
      this.restoreEase = 0;
      // this.positionRestored = true;
    } else {
      this.restorePhase = this.program.uniforms._RestorePhase.value = delta / this.restoreDelta;
      let fallOff = 1.0 - (1.0 - this.restorePhase) * (1.0 - this.restorePhase);
      this.restoreEase *= 0.1 + (1.0 - 0.1) * fallOff;
    }
  }

  animteUniforms({
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
    // this.video = this.videos[this.index].vid;
    this.program.uniforms._FlipFlowMapForce.value = this.media.brightVal;

    // if (this.isInView && this.visible) {
    //   if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
    //     this.texture.image = this.video;
    //     // this.updateTexture = !this.updateTexture;
    //     this.texture.needsUpdate = true;
    //   }
    // }

    // if (this.visible) {
    if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
      this.texture.image = this.video;
      if (this.isInView) {
        this.updateTexture = !this.updateTexture;
        this.texture.needsUpdate = this.updateTexture;
      }
    }
    // }
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

  inBounds() {
    const roundPosZ = Math.round(this.position.z);
    return roundPosZ > -4.0 && roundPosZ < 1.0;
    // return (this.position.z > -5.0 && this.position.z < 1.0);
  }

  inView({
    inViewPosZ
  }) {
    this.program.uniforms._InView.value = this.isInView =
      Math.round(this.position.z) === inViewPosZ ? true : false;
    return this.isInView;
  }
}