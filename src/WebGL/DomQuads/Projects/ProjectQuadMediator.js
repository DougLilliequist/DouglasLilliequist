import ProjectQuad from "../Projects/ProjectQuad/ProjectQuad";
import DomquadMediator from '../../extras/DomQuad/DomquadMediator';

import eventEmitter from '../../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../../utils/events.js';

import {gsap} from 'gsap';
import { Vec2 } from "../../../../vendors/ogl/src/math/Vec2";

export default class ProjectQuadMediator extends DomquadMediator {
  constructor(gl, scene, camera) {
    super(gl, scene, camera);

    this.gl = gl;

    this.quads = [];

    this.quadCount = 5;

    this.quadInView;

    this.quadSwapped = false;
    
    this.position.z = 1.0;

    this.inputForce = new Vec2(0.0, 0.0);

    this.inputForceInertia = 0.93;

    this.inScrollMode = false;

    this.minBounds = -5.0;

    this.maxBounds = 0.0;

  }

  initEvents() {

    emitter.on(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.on(events.EXIT_SCROLL_MODE, this.exitScrollMode);
    emitter.on(events.REVEAL_QUADS, this.revealQuads);
    emitter.on(events.SWAP_QUAD, this.swapQuad);
    emitter.on(events.PREPARE_UNMOUNT, this.hideQuads);

  }

  removeEvents() {

    emitter.off(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.off(events.EXIT_SCROLL_MODE, this.exitScrollMode);
    emitter.off(events.REVEAL_QUADS, this.revealQuads);
    emitter.off(events.SWAP_QUAD, this.swapQuad);
    emitter.off(events.PREPARE_UNMOUNT, this.hideQuads);

  }

  initQuads = ({referenceElement, media, getFirstQuad}) => {

    this.setParent(this.scene);

    if (referenceElement === null) {
      console.error("reference dom elements not available");
      return;
    }

    //videos
    this.media = media;

    //dom element that quads position's and scales will have it's
    //world position and scales be based on
    this.referenceElement = referenceElement;

    if(this.quadsLoaded === false) {
    
      //create quads for each project video
      for(let i = 0; i < this.media.length; i++) {

        const video = this.media[i].media;

        const quad = new ProjectQuad(
          this.gl,
          video, {
            widthSegments: 16.0,
            heightSegments: 16.0,
            posOffset: i, //rename or make new prop for index?
            // phase: phase
          }
        );

        this.calculateDomTransforms({quad});
        
        this.quads[i] = quad;
        
      }
      
      this.quadsLoaded = true;

      //only append the amount of quads based on quad count
      let i = 0;
      while(i < this.quadCount) {
        this.quads[i].setParent(this);
        i++;
      }
  
    }

  this.children.forEach((quad) => {

      quad.visible = true;

  })

  if(getFirstQuad) {
    this.quadInView = this.getQuadInView();
    this.quadInView.playVideo();
  }

    // this.revealQuads();

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

  revealQuads = () => {

    if(this.revealQuadAnim) this.revealQuadAnim.kill();

    this.revealQuadAnim = gsap.timeline({
      onComplete: () => {
        this.children.forEach((quad) => {
          quad.program.uniforms._RevealPhase.value = 1.0
        });
      }
    })

    this.revealQuadAnim.set(this.quadInView.program.uniforms._RevealDirection, {
      value: 0.0
    }, "<");

    this.revealQuadAnim.to(this.quadInView.program.uniforms._Alpha, {
      duration: 0.1,
      value: 1.0,
      ease: "sine.in"
    }, "<");

    this.revealQuadAnim.to(this.quadInView.program.uniforms._RevealPhase, {
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

  //add the quadratic inertia here as well
  updateInputForce({inputDelta, dt = 14.0}) {

    this.inputForce.y += inputDelta.y * 0.01 / dt;
    
  }

  update({dt, inputDelta, flowMap}) {

      if(this.inScrollMode) {
        this.updateInputForce({inputDelta, dt});
      }
        
      // this.children.map((quad) => {
      for(let i = 0; i < this.children.length; i++) {
        const quad = this.children[i];
        quad.update({force: this.inputForce.y, deltaTime: dt});
        quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(this.inputForce.y * 1.0));
        quad.program.uniforms._Time.value += dt;
        quad.program.uniforms._FlowMap.value = flowMap;
          
      };

      this.loopQuads();

      this.inputForce.y *= this.inputForceInertia;
      if(Math.abs(this.inputForce.y) < 0.001) this.inputForce.y = 0.0;
      
  }

  loopQuads() {

    for(let i = 0; i < this.children.length; i++) {
      const quad = this.children[i];
      if(quad.position.z < -5.0 || quad.position.z > 0.0) {
        this.swapQuad({quad, direction: quad.position.z < -5.0 ? -1 : 1});
        break;
      }
      // if(quad.position.z < -5.0) {
      //   this.swapQuad({quad, direction: -1});
      //   break;
      // } else if(quad.position.z > 0.0) {
      //   this.swapQuad({quad, direction: 1});
      //   break;
      // }

    };

  }


  //POTENTIAL REFACTOR?
  //Add every single quad into transforms
  //check if quad is inside bounds
  //if true, set quad to visible and update uniforms etc
  //if outside, set visibe to false and don't apply update
  swapQuad = ({quad, direction}) => {

    //current quad's position
    const pos = quad.position;
    
    //current quad's ID
    const id = quad.id;

    //current quad's index;
    let index = quad.index;

    //increase or decrease index based on active quad length which will be used
    //to tell which quad to append
    index = direction <= -1 ? index - this.quadCount : index + this.quadCount;

    //loop index
    //*NOTE* I have no idea how it makes sense, but after some pen & paper coding I noticed
    //that applying the delta between the video count and the quad count gives me the desired index
    index = (((index % this.quads.length) + this.quads.length) % this.quads.length);

    //remove quad
    for(let i = 0; i < this.quadCount; i++) {
      if(this.children[i].id === id) {
        const prevQuad = this.children[i];
        prevQuad.program.uniforms._RevealPhase.value = 0.0;
        if(prevQuad.visible) prevQuad.visible = false;
        this.removeChild(prevQuad); 
        break;
      }
    }
    
    //init new quad
    const newQuad = this.quads[index];
    newQuad.position = pos;

    //loop position
    if(newQuad.position.z < -5.0) {
      newQuad.position.z += 5.0;
      } else if(newQuad.position.z > 0.0) {
        newQuad.position.z -= 5.0;
    }
    newQuad.program.uniforms._RevealPhase.value = 1.0;
    if(newQuad.visible === false) newQuad.visible = true;

    //calculte position and scale based on reference dom element
    //and append to parent transform
    // this.calculateDomTransforms({quad: newQuad}); 
    
    newQuad.setParent(this);

  }

  //get the quad whose position equals to the camera's position along Z
  //and offsetted by the parents transform. That way I'll get the quad
  //that is in view of the camera (or simply in front)
  getQuadInView() {
      
      let quadInView;

      this.children.forEach((quad) => {  
        
        if(quad.inView({inViewPosZ: 0 - this.position.z})) {          
        // if(quad.inView({inViewPosZ: this.position.z})) {          
          quadInView = quad;
          emitter.emit(events.LOAD_PROJECT_CONTENT, quadInView.index);

        }
      
      });

      return quadInView;
      
  }

  calculateDomTransforms({quad}) {

    quad.updateDimensions({
      domElement: this.referenceElement,
      camera: this.camera
    });

    quad.calcDomToWebGLPos({
      domElement: this.referenceElement,
    });

  }

}