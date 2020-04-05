import DomQuad from "./DomQuad/DomQuad.js";
import {
  Transform
} from "../../../vendors/ogl/src/core/Transform.js";

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;

import events from '../../../utils/events';
import { loopNegativeNumber } from "../../../utils/Math.js";

export default class DomQuadManager {
  constructor(gl, scene, camera) {
    this.init(gl, scene, camera);
  }

  init(gl, scene, camera) {
    this.gl = gl;

    this.scene = scene;

    this.camera = camera;

    this.quadsLoaded = false;

    this.transform = new Transform();
    
    this.transform.position.z = 1.0;

    this.transform.setParent(this.scene);

    this.scrollPhase = 0.0;

    this.initEvents();
  }

  initEvents() {

    emitter.on(events.INIT_DOMGL, (data) => {
      this.initQuads({referenceElement: data.el, media: data.media, getQuad: data.getFirstQuad});
    });

    emitter.on(events.REMOVE_DOMGL, this.disposeActiveQuads);

    emitter.on(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.on(events.EXIT_SCROLL_MODE, this.exitScrollMode);

  }

  //applies appropriate sizes and positions based on reference dom elements
  //bounding rects
  initQuads({referenceElement, media, getQuad}) {

    if (referenceElement === null) {
      console.error("reference dom elements not available");
      return;
    }

    this.referenceElement = referenceElement;
    this.media = media;
    this.quads = [];
    this.quadCount = 5;

    let i = 0;
    while (i < this.quadCount) {

      let phase = i / (this.quadCount - 1.0)

      const quad = new DomQuad(
        this.gl,
        this.camera,
        this.referenceElement,
        this.media, {
          widthSegments: 1.0,
          heightSegments: 1.0,
          posOffset: i, //rename or make new prop for index?
          phase: phase
        }
      );

      quad.calcDomToWebGLPos({
        domElement: this.referenceElement,
        camera: this.camera
      });

      quad.playVideo();

      this.quads[i] = quad;
      this.quads[i].setParent(this.transform);
      i++;
    }

    this.quadsLoaded = true;

    if(getQuad) {
      const quad = this.getQuadInView();
      quad.playVideo();
    }

  }

  enterScrollMode = () => {

    emitter.emit(events.PAUSE_VIDEO);
    this.transform.children.map((quad) => {
      quad.applyScrollMode();
    })

  }

  exitScrollMode = () => {

    emitter.emit(events.PLAY_VIDEO);
    this.transform.children.map((quad) => {
      quad.removeScrollMode();
    })
    
  }

  update(dt, force, interacting) {

    if(this.quadsLoaded) {

        for (let i = 0; i < this.transform.children.length; i++) {

          let quad = this.transform.children[i];

          quad.calcDomToWebGLPos({
            domElement: this.referenceElement,
            camera: this.camera
          });
          
          quad.update({index: i, force, interacting});
          quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(force * 1.0));
          quad.program.uniforms._Time.value += dt;
          
        }

    }

  }

  updateQuadDimensions() {

    this.transform.children.map((quad, i) => {
      this.transform.children[i].updateDimensions({
        domElement: this.referenceElement,
        camera: this.camera
      });
    })

}

  //get the quad whose position equals to the camera's position along Z
  //and offsetted by the parents transform. That way I'll get the quad
  //that is in view of the camera (or simply in front)
  getQuadInView() {

    if(this.quadsLoaded) {
      
      let quadInView;

      this.transform.children.map((quad) => {  
        if(quad.inView({inViewPosZ: 0 - this.transform.position.z})) {
          quadInView = quad;
          emitter.emit(events.LOAD_PROJECT_CONTENT, quadInView.index);
        }
      });

      return quadInView;
      
    }

  }

  captureLastPosition() {
    if(this.quadsLoaded) {
          this.transform.children.map((quad) => {
            quad.targetPos = Math.round(quad.position.z);
          })
      }
  }

  //removes geometry and shader data from all active quads
  //as well as the mesh itself
  disposeActiveQuads = () => {

    this.quads.map((quad) => {

      this.transform.removeChild(quad);
      quad.geometry.remove();
      quad.program.remove();
      quad.texture = null;
      quad = null;
      
    })

    this.quads.length = 0;
    this.quadsLoaded = false;
  }
}