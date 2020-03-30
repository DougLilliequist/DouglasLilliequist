import DomQuad from "./DomQuad/DomQuad.js";
import {
  Transform
} from "../../../vendors/ogl/src/core/Transform.js";
// const emitter = require("tiny-emitter/instance");
import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;

import events from '../../../utils/events';

/**
 * TODO: Provide a shader program as argument so
 * the appropriate shader is applied to the created quads
 *
 * Aspect ratio correction is a bit unclear right now.
 * Currently doing educted guess on which side(s) to use
 * for determining correction
 *
 */

export default class DomQuadManager {
  constructor(gl, scene, camera) {
    this.init(gl, scene, camera);
  }

  init(gl, scene, camera) {
    this.gl = gl;

    this.scene = scene;

    this.camera = camera;

    this.referenceElements = [];

    this.quadsLoaded = false;

    this.transform = new Transform();
    this.transform.position.z = 1.0;

    this.transform.setParent(this.scene);

    this.initEvents();
  }

  initEvents() {

    emitter.on(events.INIT_DOMGL, (data) => {
      this.initQuads({domElementContainer: data.el, getQuad: data.getFirstQuad});
    });

    emitter.on(events.REMOVE_DOMGL, this.disposeActiveQuads);

    emitter.on(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.on(events.EXIT_SCROLL_MODE, this.exitScrollMode);

  }

  //applies appropriate sizes and positions based on reference dom elements
  //bounding rects
  initQuads({domElementContainer, getQuad}) {

    this.quads = [];

    const domElements = domElementContainer.children;

    if (domElements === null || domElements.length === 0) {
      console.error("reference dom elements not available");
      return;
    }

    for (let i = 0; i < domElements.length; i++) {
      this.referenceElements[i] = domElements[i];
    }

    let i = 0;
    while (i < this.referenceElements.length) {

      let phase = i / (this.referenceElements.length - 1.0)

      const quad = new DomQuad(
        this.gl,
        this.camera,
        this.referenceElements[i], {
          widthSegments: 1.0,
          heightSegments: 1.0,
          // posOffset: i,
          posOffset: i,
          phase: phase
        }
      );

      // this.quads[i].setParent(this.scene); //??
      quad.calcDomToWebGLPos({
        domElement: this.referenceElements[i],
        camera: this.camera
      });

      quad.setParent(this.transform);

      if(quad.inView({inViewPosZ: 0 - this.transform.position.z})) {
        quad.playVideo();
      }

      this.quads[i] = quad;

      i++;
    }

    this.quadsLoaded = true;

    if(getQuad) {
      this.getQuadInView();
    }

  }

  enterScrollMode = () => {

    emitter.emit(events.PAUSE_VIDEO);
    this.quads.map((quad) => {
      quad.applyScrollMode();
    })

  }

  exitScrollMode = () => {

    emitter.emit(events.PLAY_VIDEO);
    this.quads.map((quad) => {
      quad.removeScrollMode();
    })
    
  }

  update(dt, force, interacting) {

    if(this.quadsLoaded) {

      if (this.quads.length > 0) {
        for (let i = 0; i < this.referenceElements.length; i++) {
          const quad = this.quads[i];
          const el = this.referenceElements[i];
          
          // quad.updateDimensions({
          //   domElement: el,
          //   camera: this.camera
          // });

          quad.calcDomToWebGLPos({
            domElement: el,
            camera: this.camera
          });
          
          quad.update(force, interacting);
          quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(force * 1.0));
          quad.program.uniforms._Time.value += dt;
          
        }

      }

    }

  }

  updateQuadDimensions() {

    for(let i = 0; i < this.referenceElements.length; i++) {

      const el = this.referenceElements[i];

      this.quads[i].updateDimensions({
        domElement: el,
        camera: this.camera
      });

  }

}

  //get the quad whose position equals to the camera's position along Z
  //and offsetted by the parents transform. That way you'll get the quad
  //that is in view of the camera (or simply in front)

  //rename to something that implies I'm emitting what quad is in front?
  getQuadInView() {

    if(this.quadsLoaded) {
      
      this.quads.map((quad) => {
  
        if(quad.inView({inViewPosZ: 0 - this.transform.position.z})) {
          emitter.emit(events.LOAD_PROJECT_CONTENT, quad.name)
          return quad;
        } else {
          return;
        }
  
      });
      
    }

  }

  captureLastPosition() {
    if(this.quadsLoaded) {
          this.quads.map((quad) => {
            quad.targetPos = Math.round(quad.position.z);
          })
      }
  }

  //removes geometry and shader data from all active quads
  //as well as the mesh itself
  disposeActiveQuads = () => {
    for(let i = 0; i < this.quads.length; i++) {
      const quad = this.quads[i];
      this.transform.removeChild(quad);
      quad.geometry.remove();
      quad.program.remove();
      quad.texture = null;
      quad = null;
    }
    this.quads.length = 0;
    this.quadsLoaded = false;
  }
}