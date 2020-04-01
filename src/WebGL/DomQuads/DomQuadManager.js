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

    this.referenceElements = [];

    this.quadsLoaded = false;

    this.inScrollMode = false;

    this.transform = new Transform();
    
    this.transform.position.z = 1.0;

    this.transform.setParent(this.scene);

    this.quadIndexOffset = 0;

    this.initEvents();
  }

  initEvents() {

    emitter.on(events.INIT_DOMGL, (data) => {
      this.initQuads({referenceElement: data.el, media: data.media, getQuad: data.getFirstQuad});
    });

    emitter.on(events.REMOVE_DOMGL, this.disposeActiveQuads);

    emitter.on(events.REPLACE_QUAD, this.updateQuadArrangement);

    emitter.on(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.on(events.EXIT_SCROLL_MODE, this.exitScrollMode);

  }

  //applies appropriate sizes and positions based on reference dom elements
  //bounding rects
  // initQuads({referenceElement, getQuad}) {
  initQuads({referenceElement, media, getQuad}) {

    if (referenceElement === null) {
      console.error("reference dom elements not available");
      return;
    }

    this.referenceElement = referenceElement;
    this.quads = [];
    this.quadCount = 5; //temporary for now;

    let i = 0;
    while (i < this.quadCount) {

      let phase = i / (this.quadCount - 1.0)

      const quad = new DomQuad(
        this.gl,
        this.camera,
        this.referenceElement,
        media, {
          widthSegments: 1.0,
          heightSegments: 1.0,
          posOffset: i,
          phase: phase
        }
      );

      quad.calcDomToWebGLPos({
        domElement: this.referenceElement,
        camera: this.camera
      });

      quad.playVideo();

      this.quads[i] = quad;

      i++;
    }

    //make variable for visible amount
    const visibleQuadCount = 5.0;
    i = 0;
    while(i < visibleQuadCount) {
      this.quads[i].setParent(this.transform);
      i++;
    }

    this.quadsLoaded = true;

    if(getQuad) {
      this.getQuadInView();
    }

  }

  enterScrollMode = () => {

    this.inScrollMode = true;
    emitter.emit(events.PAUSE_VIDEO);
    this.transform.children.map((quad) => {
      quad.applyScrollMode();
    })

  }

  exitScrollMode = () => {

    this.inScrollMode = false;
    emitter.emit(events.PLAY_VIDEO);
    this.transform.children.map((quad) => {
      quad.removeScrollMode();
    })
    
  }

  update(dt, force, interacting) {

    if(this.quadsLoaded) {

      if (this.transform.children.length > 0) {
        for (let i = 0; i < this.transform.children.length; i++) {

          let quad = this.transform.children[i];

          quad.calcDomToWebGLPos({
            domElement: this.referenceElement,
            camera: this.camera
          });
          
          // quad.update(i, force, interacting);
          quad.update({index: i, force, interacting});
          quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(force * 1.0));
          quad.program.uniforms._Time.value += dt;
          
        }

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
      
      this.transform.children.map((quad) => {  
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
          this.transform.children.map((quad) => {
            quad.targetPos = Math.round(quad.position.z);
          })
      }
  }


  updateQuadArrangement = ({index, direction}) => {

    // const prevPosition = this.transform.children[index].position.z;


    // this.quadIndexOffset += direction;
    // let desiredIndex = this.quadIndexOffset + this.quads.length;
    // desiredIndex = (((desiredIndex % this.quads.length) + this.quads.length) % this.quads.length)
    // this.transform.children[index] = this.quads[desiredIndex];
    // this.transform.children[index].position.z = prevPosition;
    // this.transform.children[index].position.z = loopNegativeNumber({a: this.transform.children[index].position.z, b: -5});
    // this.transform.children[index].position.z = prevPosition;
    // const previousPositions = this.transform.children.map((quad) => {
    //   return quad.position.z;
    // });

    // // this.transform.children.length = 0; //not a good way of doing it.

    // this.quadIndexOffset += direction
    // for(let i = 0; i < 5; i++) { //hard-hard coded quad amount

    //   const desiredIndex = i + this.quadIndexOffset;
    //   desiredIndex = (((desiredIndex % this.quads.length) + this.quads.length) % this.quads.length)
    //   this.transform.children[i] = this.quads[desiredIndex];
    //   // this.quads[desiredIndex].setParent(this.transform);
    //   this.transform.children[i].position.z = previousPositions[i];
    //   this.transform.children[i].position.z = loopNegativeNumber({a: this.transform.children[i].position.z, b: -5});

    // }
    // let desiredIndex = this.quadIndexOffset + this.transform.children.length;
    // desiredIndex = (((desiredIndex % this.quads.length) + this.quads.length) % this.quads.length);
    // this.quads[desiredIndex].setParent(this.transform);
    
    // this.transform.removeChild(this.transform.children[index]);
    // this.quadIndexOffset += direction
    // let desiredIndex = this.quadIndexOffset + this.transform.children.length;
    // desiredIndex = (((desiredIndex % this.quads.length) + this.quads.length) % this.quads.length);
    // this.quads[desiredIndex].setParent(this.transform);

  }

  //removes geometry and shader data from all active quads
  //as well as the mesh itself
  disposeActiveQuads = () => {

    // this.transform.children.map((child) => {
    //   this.transform.removeChild(child);
    // })

    for(let i = 0; i < this.quads.length; i++) {
      const quad = this.quads[i];
      quad.geometry.remove();
      quad.program.remove();
      quad.texture = null;
      quad = null;
    }
    this.quads.length = 0;
    this.quadsLoaded = false;
  }
}