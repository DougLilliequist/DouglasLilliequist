import ProjectQuad from "../Projects/ProjectQuad/ProjectQuad";
import DomquadMediator from '../../extras/DomQuad/DomquadMediator';

import eventEmitter from '../../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../../utils/events.js';

import {gsap} from 'gsap';
import { Vec2 } from "../../../../vendors/ogl/src/math/Vec2";

/**
 * Not sure what happened, but somewhere when
 * I replaced the looping with emitting an event for telling
 * quads to change to scroll mode or not...
 * 
 * The last quad visible in front of camera remains when going between different pages
 * which was not the case as the quads would always start on the first project.
 * 
 * I would say it should be the intended effect but at the same time, do you want to start from the begning always...?
 */

export default class ProjectQuadMediator extends DomquadMediator {
  constructor(gl, scene, camera) {
    super(gl, scene, camera);

    this.gl = gl;

    this.quadCount = 5;
    
    this.position.z = 1.0;

    this.inputForce = new Vec2(0.0, 0.0);

    this.inputForceInertia = 0.93;

    this.inScrollMode = false;

  }

  initEvents() {

    emitter.on(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.on(events.EXIT_SCROLL_MODE, this.exitScrollMode);
    emitter.on(events.PREPARE_UNMOUNT, this.hideQuads);

  }

  removeEvents() {

    emitter.off(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.off(events.EXIT_SCROLL_MODE, this.exitScrollMode);
    emitter.off(events.PREPARE_UNMOUNT, this.hideQuads);

  }

  initQuads = ({referenceElement, media, getFirstQuad}) => {

    this.setParent(this.scene);

    if (referenceElement === null) {
      console.error("reference dom elements not available");
      return;
    }

    this.media = media;

    this.referenceElement = referenceElement;

    if(this.quadsLoaded === false) {

      let i = 0;
      while (i < this.quadCount) {
  
        let phase = i / (this.quadCount - 1.0)
  
        const quad = new ProjectQuad(
          this.gl,
          this.media, {
            widthSegments: 16.0,
            heightSegments: 16.0,
            posOffset: i, //rename or make new prop for index?
            phase: phase
          }
        );

        quad.setParent(this);
        i++;

        this.quadsLoaded = true;

    }
    
  }

  this.children.map((quad) => {

      quad.visible = true;
              
      quad.updateDimensions({
        domElement: this.referenceElement,
        camera: this.camera
      });

      quad.calcDomToWebGLPos({
        domElement: this.referenceElement,
      });

  })

  if(getFirstQuad) {
    this.getQuadInView().playVideo();
  }

    this.revealQuads();

  }

  enterScrollMode = () => {

    this.inScrollMode = true;
    emitter.emit(events.PAUSE_VIDEO);
    emitter.emit(events.APPLY_SCROLL_MODE_ANIM);

  }

  exitScrollMode = () => {

    this.inScrollMode = false;
    this.captureLastPosition();
    this.getQuadInView();
    emitter.emit(events.PLAY_VIDEO);
    emitter.emit(events.REMOVE_SCROLL_MODE_ANIM);
    
  }

  revealQuads = () => {

      gsap.to(this.getQuadInView().program.uniforms._Alpha, {
        duration: 0.85,
        value: 1.0,
        ease: "sine.in"
      });
      
  }

  hideQuads = () => {

    gsap.to(this.getQuadInView().program.uniforms._Alpha, {
      duration: 0.75,
      value: 0.0,
      ease: "sine.in"
    });

  }

  updateInputForce({inputDelta, dt = 14.0}) {

    this.inputForce.y += inputDelta.y * 0.01 / dt;

  }

  update({dt, inputPos, inputDelta, flowMap}) {

        if(this.inScrollMode) {
          this.updateInputForce({inputDelta, dt});
        }
        
        this.children.map((quad, i) => {
          
          quad.update({index: i, force: this.inputForce.y, isInteracting: this.inScrollMode});
          quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(this.inputForce.y * 1.0));
          quad.program.uniforms._Time.value += dt;
          quad.program.uniforms._FlowMap.value = flowMap;
          
        });

        this.inputForce.y *= this.inputForceInertia;
  }

  //get the quad whose position equals to the camera's position along Z
  //and offsetted by the parents transform. That way I'll get the quad
  //that is in view of the camera (or simply in front)
  getQuadInView() {
      
      let quadInView;

      this.children.map((quad) => {  
        if(quad.inView({inViewPosZ: 0 - this.position.z})) {
          quadInView = quad;
          emitter.emit(events.LOAD_PROJECT_CONTENT, quadInView.index);
        }
      });

      return quadInView;
      
  }

  captureLastPosition() {
      this.children.map((quad) => {
          quad.targetPos = Math.round(quad.position.z);
      })
  }

}