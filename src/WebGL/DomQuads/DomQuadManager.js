import DomQuad from "./DomQuad/DomQuad.js";
import {
  Transform
} from "../../../vendors/ogl/src/core/Transform.js";
const emitter = require("tiny-emitter/instance");

import {gsap} from 'gsap';

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

    this.transform.setParent(this.scene);

    this.transform.position.z = 1.0;

    this.initEvents();
  }

  initEvents() {
    emitter.on("initDOMGL", (data) => {
      this.initQuads(data);
    });
    emitter.on("removeDOMGL", () => {
      this.disposeActiveQuads();
    });
  }

  //applies appropriate sizes and positions based on reference dom elements
  //bounding rects
  initQuads(el) {

    this.quads = [];

    const domElements = el.children;

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

      this.quads[i] = new DomQuad(
        this.gl,
        this.camera,
        this.referenceElements[i], {
          widthSegments: 1.0,
          heightSegments: 1.0,
          posOffset: i,
          phase: phase
        }
      );

      this.quads[i].setParent(this.scene);
      this.quads[i].calcDomToWebGLPos({
        domElement: this.referenceElements[i],
        camera: this.camera
      });

      this.quads[i].setParent(this.transform);

      i++;
    }

    this.quadsLoaded = true;
  }

  update(dt, force, interacting) {

    if(this.quadsLoaded) {

      if (this.quads.length > 0) {
        for (let i = 0; i < this.referenceElements.length; i++) {
          const quad = this.quads[i];
          const el = this.referenceElements[i];
          
          quad.updateDimensions({
            domElement: el,
            camera: this.camera
          });

          quad.calcDomToWebGLPos({
            domElement: el,
            camera: this.camera
          });
          
          if(interacting) {
            quad.update(force);
          } else {
            quad.restorePosition();
          }
          //update uniforms

          quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(force * 1.0));
          quad.program.uniforms._Time.value += dt;
          
        }

      }

    }

  }

  //remove
  saveLastPositions() {

    this.quads.map((quad) => {
      quad.prevPosition = Math.trunc(quad.position.z);
      quad.prevPosition %= -5.0;
      // console.log(quad.prevPosition)
    })

  }

  //rename to something like capture last position
  fixQuadPositions(interacting, dir) {

    if(this.quadsLoaded) {
          this.quads.map((quad) => {
            quad.targetPos = Math.round(quad.position.z);
          })
      }
  }

  //removes geometry and shader data from all active quads
  //as well as the mesh itself
  disposeActiveQuads() {
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