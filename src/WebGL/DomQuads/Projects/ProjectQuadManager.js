import ProjectQuad from "../Projects/ProjectQuad/ProjectQuad";
import {
  Transform
} from "../../../../vendors/ogl/src/core/Transform.js";

import eventEmitter from '../../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../../utils/events.js';

import {gsap} from 'gsap';

export default class ProjectQuadManager {
  constructor(gl, scene, camera) {

    this.gl = gl;

    this.scene = scene;

    this.camera = camera;

    this.quadsLoaded = false;

    this.transform = new Transform();
    
    this.transform.position.z = 1.0;

    this.initEvents();

  }

  initEvents() {

    emitter.on(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.on(events.EXIT_SCROLL_MODE, this.exitScrollMode);

  }

  removeEvents() {
    emitter.off(events.ENTER_SCROLL_MODE, this.enterScrollMode);
    emitter.off(events.EXIT_SCROLL_MODE, this.exitScrollMode);
  }

  initQuads({referenceElement, media, getFirstQuad}) {

    if (referenceElement === null) {
      console.error("reference dom elements not available");
      return;
    }

    this.referenceElement = referenceElement;
    this.media = media;
    this.quads = [];
    this.quadCount = 5;

    this.transform.setParent(this.scene);

    let i = 0;
    while (i < this.quadCount) {

      let phase = i / (this.quadCount - 1.0)

      const quad = new ProjectQuad(
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

    if(getFirstQuad) {
      this.getQuadInView().playVideo();
    }

    this.revealQuads();

  }

  enterScrollMode = () => {

    emitter.emit(events.PAUSE_VIDEO);
    this.transform.children.map((quad) => {
      quad.applyScrollMode();
    })

  }

  exitScrollMode = () => {

    emitter.emit(events.PLAY_VIDEO);
    this.captureLastPosition();
    this.transform.children.map((quad) => {
      quad.removeScrollMode();
    })
    
  }

  revealQuads = () => {

    const quadAlphas = this.transform.children.map((quad) => {
      return quad.program.uniforms._Alpha;
    });

    gsap.to(quadAlphas, {
      duration: 1,
      value: 1.0,
      stagger: -0.3,
      // ease: "sine.in"
      ease: "sine.in"
    })

  }

  hideQuads = () => {
    const quadAlphas = this.transform.children.map((quad) => {
      return quad.program.uniforms._Alpha;
    });

    gsap.to(quadAlphas, {
      duration: 0.45,
      value: 0.0,
      stagger: 0.0,
      // ease: "sine.in"
      ease: "sine.in",
      onComplete: () => {
        this.disposeActiveQuads();
      }
    })

  }

  update(dt, force, interacting) {

    if(this.quadsLoaded) {

        this.transform.children.map((quad, i) => {
          
          quad.update({index: i, force, interacting});
          quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(force * 1.0));
          quad.program.uniforms._Time.value += dt;
          
        });

    }

  }

  //get the quad whose position equals to the camera's position along Z
  //and offsetted by the parents transform. That way I'll get the quad
  //that is in view of the camera (or simply in front)
  getQuadInView() {
      
      let quadInView;

      this.transform.children.map((quad) => {  
        if(quad.inView({inViewPosZ: 0 - this.transform.position.z})) {
          quadInView = quad;
          emitter.emit(events.LOAD_PROJECT_CONTENT, quadInView.index);
        }
      });

      return quadInView;
      
  }

  captureLastPosition() {
    if(this.quadsLoaded) {
          this.transform.children.map((quad) => {
            quad.targetPos = Math.round(quad.position.z);
          })
      }
  }

}