import ProjectQuad from "../Projects/ProjectQuad/ProjectQuad.js";
import DomquadMediator from '../../extras/DomQuad/DomquadMediator.js';
import {
  ProjectContent
} from '../../../../static/ProjectContent.js';

import eventEmitter from '../../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../../utils/events.js';

import {
  gsap
} from 'gsap';
import {
  Vec2
} from "../../../../vendors/ogl/src/math/Vec2";

export default class ProjectQuadMediator extends DomquadMediator {
  constructor(gl, scene, camera) {
    super(gl, scene, camera);

    this.gl = gl;

    this.quads = [];

    this.quadCount = 5;

    this.quadInView;

    this.quadSwapped = false;

    this.position.z = 0.0;

    this.inputForce = new Vec2(0.0, 0.0);

    this.inputForceInertia = 0.93;

    this.inScrollMode = false;

    this.minBounds = -5.0;

    this.maxBounds = 0.0;

    this.inViewMode = false;

    this.initQuads();

  }

  initEvents() {

    emitter.on(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.on(events.EXIT_SCROLL_MODE, this.exitScrollMode);
    emitter.on(events.SHOW_PROJECT, this.updateViewMode);
    emitter.on(events.CLOSE_PROJECT, this.updateViewMode);
    emitter.on(events.REVEAL_QUADS, this.revealQuads);
    emitter.on(events.RESET_QUADS, this.resetQuads);
    emitter.on(events.PREPARE_UNMOUNT, this.hideQuads);

  }

  removeEvents() {

    emitter.off(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.off(events.EXIT_SCROLL_MODE, this.exitScrollMode);
    emitter.off(events.SHOW_PROJECT, this.updateViewMode);
    emitter.off(events.CLOSE_PROJECT, this.updateViewMode);
    emitter.off(events.REVEAL_QUADS, this.revealQuads);
    emitter.off(events.RESET_QUADS, this.resetQuads);
    emitter.off(events.PREPARE_UNMOUNT, this.hideQuads);

  }

  initQuads() {

    const media = ProjectContent.map((content) => {
      return content.media;
    });

    emitter.emit(events.UPDATE_CONTENT_COUNT, media.length);

    media.forEach((media, i) => {

      const quad = new ProjectQuad(
        this.gl, {
          media,
          posOffset: i, //rename or make new prop for index?
        }
      );

      quad.setParent(this);

    });

  }

  bindToDom = ({
    referenceElement,
    getFirstQuad
  }) => {

    if (referenceElement === null) {
      console.error("reference dom elements not available");
      return;
    }

    this.children.forEach((quad) => {
      quad.visible = true;
      quad.domElement = referenceElement;
      quad.updateRelations({
        camera: this.camera
      });
      this.calculateDomTransforms({
        quad
      });
    });

    if (getFirstQuad) {
      this.quadInView = this.getQuadInView();
      this.quadInView.playVideo();
    }

  }

  enterScrollMode = () => {

    this.inScrollMode = true;
    emitter.emit(events.PAUSE_VIDEO);
    emitter.emit(events.APPLY_SCROLL_MODE_ANIM);

  }

  exitScrollMode = () => {

    this.inScrollMode = false;
    this.quadInView = this.getQuadInView();
    this.quadInView.playVideo();
    emitter.emit(events.REMOVE_SCROLL_MODE_ANIM);

  }

  //toggle values
  updateViewMode = () => {

    // const ease = "sine.inOut"

    this.inViewMode = !this.inViewMode;

    const {
      uniforms
    } = this.quadInView.program;
    // const duration = this.inViewMode ? 2.0 : 3.0;
    const duration = 1.8;
    // const ease = this.inViewMode ? "power2.out" : "sine.in";
    // const ease = this.inViewMode ? "power2.out" : "sine.inOut";
    const ease = "sine.inOut";

    uniforms._Entering.value = this.inViewMode ? 1.0 : 0.0;

    gsap.to(uniforms._ViewModePhase, {
      value: this.inViewMode ? 1.0 : 0.0,
      duration,
      ease,
      // delay: 0.1
    });

  }

  resetQuads = () => {

    this.inViewMode = false;

    this.children.forEach((quad) => {

      quad.scaleOffset.set(1.0, 1.0);
      const {
        uniforms
      } = quad.program;
      uniforms._ViewModePhase.value = 0.0
      uniforms._Entering.value = 0.0;

    });

  }

  revealQuads = () => {
    if (this.revealQuadAnim) this.revealQuadAnim.kill();

    this.revealQuadAnim = gsap.timeline({
      onComplete: () => {
        this.children.forEach((quad) => {
          quad.program.uniforms._RevealPhase.value = 1.0
        });
      }
    })

    const {
      uniforms
    } = this.quadInView.program;

    this.revealQuadAnim.set(uniforms._RevealDirection, {
      value: 0.0
    }, "<");

    this.revealQuadAnim.to(uniforms._Alpha, {
      duration: 0.1,
      value: 1.0,
      ease: "power2.in"
    }, "<");

    this.revealQuadAnim.to(uniforms._RevealPhase, {
      duration: 1.0,
      value: 1.0,
      ease: "power2.inOut",
    }, "<");

  }

  hideQuads = () => {

    this.children.forEach((quad) => {
      gsap.set(quad.program.uniforms._RevealDirection, {
        value: 1.0
      });

      gsap.to(quad.program.uniforms._RevealPhase, {
        duration: 1.0,
        value: 0.0,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(quad.program.uniforms._Alpha, {
            value: 0.0
          });
        }
      });
    });

  }

  update({
    dt,
    inputDelta,
    flowMap
  }) {

    // this.inputForce.y += this.inScrollMode ? inputDelta.y * 0.008 / dt : 0.0;
    this.inputForce.y += this.inScrollMode ? inputDelta.y * 0.005 / dt : 0.0;
    this.inputForce.y *= (Math.abs(this.inputForce.y) < 0.001) ? 0.0 : this.inputForceInertia;

    let i = 0;
    while (i < this.children.length) {
      let quad = this.children[i];
      quad.update({
        force: this.inputForce.y,
        deltaTime: dt
      });
      quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(this.inputForce.y * 1.0));
      quad.program.uniforms._Time.value += dt;
      quad.program.uniforms._FlowMap.value = flowMap;
      i++;
    }

  }

  //get the quad whose position equals to the camera's position along Z
  //and offsetted by the parents transform. That way I'll get the quad
  //that is in view of the camera (or simply in front)

  getQuadInView() {

    let quadInView;
    let i = 0;
    while (i < this.children.length) {
      const quad = this.children[i];
      if (quad.inView({
          inViewPosZ: 0
        })) {
        quadInView = quad;
        emitter.emit(events.LOAD_PROJECT_CONTENT, quadInView.index);

      }
      i++;
    }

    return quadInView;

  }

  calculateDomTransforms({
    quad
  }) {

    quad.updateDimensions();
    quad.calcDomToWebGLPos();

  }

}