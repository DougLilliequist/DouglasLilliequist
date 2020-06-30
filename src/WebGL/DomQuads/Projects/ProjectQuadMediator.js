import ProjectQuad from "../Projects/ProjectQuad/ProjectQuad";
import DomquadMediator from '../../extras/DomQuad/DomquadMediator';

import eventEmitter from '../../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../../utils/events.js';

import {
  gsap
} from 'gsap';
import {
  Vec2
} from "../../../../vendors/ogl/src/math/Vec2";

const Tweakpane = require('tweakpane');

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

  initQuads = ({
    referenceElement,
    media,
    getFirstQuad
  }) => {

    this.setParent(this.scene);

    if (referenceElement === null) {
      console.error("reference dom elements not available");
      return;
    }

    this.media = media;

    if (this.quadsLoaded === false) {

      //create quads for each project video
      for (let i = 0; i < this.media.length; i++) {

        const video = this.media[i].media;

        const quad = new ProjectQuad(
          this.gl,
          video,
          referenceElement,{
            posOffset: i, //rename or make new prop for index?
            // phase: phase
          }
        );

        quad.setParent(this);

      }

      this.quadsLoaded = true;

    }

    this.children.forEach((quad) => {
      quad.visible = true;
      quad.domElement = referenceElement;
      quad.updateRelations({camera:this.camera});
      this.calculateDomTransforms({quad});
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

    const {uniforms} = this.quadInView.program;
    const {inViewMode} = this;
    const duration = 1.0;
    // const ease = "power1.inOut"
    const ease = "sine.inOut"

    this.inViewMode = !this.inViewMode;

    gsap.to(this.quadInView.scaleOffset, {
      x: this.inViewMode ? 1.535 : 1.0,
      y: this.inViewMode ? 1.535 : 1.0,
      duration,
      ease
    });

    gsap.to(uniforms._ViewModePhase, {
      value: this.inViewMode ? 1.0 : 0.0,
      duration,
      ease
    });

  }

  resetQuads = () => {

    this.inViewMode = false;

    this.children.forEach((quad) => {

      quad.scaleOffset.set(1.0, 1.0);
      const {uniforms} = quad.program;
      uniforms._ViewModePhase.value = 0.0

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

    const {uniforms} = this.quadInView.program;

    this.revealQuadAnim.set(uniforms._RevealDirection, {
      value: 0.0
    }, "<");

    this.revealQuadAnim.to(uniforms._Alpha, {
      duration: 0.1,
      value: 1.0,
      ease: "sine.in"
    }, "<");

    this.revealQuadAnim.to(uniforms._RevealPhase, {
      duration: 0.85,
      value: 1.0,
      ease: "circ.inOut",
    }, "<");

  }

  hideQuads = () => {

    this.children.forEach((quad) => {
      gsap.set(quad.program.uniforms._RevealDirection, {
        value: 1.0
      });

      gsap.to(quad.program.uniforms._RevealPhase, {
        duration: 0.9,
        value: 0.0,
        ease: "circ.inOut",
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

    this.inputForce.y += this.inScrollMode ? inputDelta.y * 0.008 / dt : 0.0;
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