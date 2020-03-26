import DomQuad from "./DomQuad/DomQuad.js";
const emitter = require('tiny-emitter/instance');

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

    this.quads = [];

    this.referenceElements = [];

    this.quadsLoaded = false;

    this.initEvents();

  }

  initEvents() {

    emitter.on('initDOMGL', this.initQuads.bind(this));
    emitter.on('removeDOMGL', this.disposeActiveQuads.bind(this));

  }

  //applies appropriate sizes and positions based on reference dom elements
  //bounding rects
  initQuads(
    el
  ) {

    const domElements = el.children;

    console.log(domElements);

    if (domElements === null || domElements.length === 0) {
      console.error('reference dom elements not available')
      return;
    }

    for (let i = 0; i < domElements.length; i++) {
      this.referenceElements[i] = domElements[i];
    }

    let i = 0;
    while (i < this.referenceElements.length) {
      this.quads[i] = new DomQuad(this.gl, this.camera, this.referenceElements[i], {
        widthSegments: 1.0,
        heightSegments: 1.0,
        posOffset: (i / (this.referenceElements.length - 0.0))
        // posOffset: 0.0 - (i)
      });

      this.quads[i].setParent(this.scene);
      this.quads[i].calcDomToWebGLPos({
        domElement: this.referenceElements[i],
        camera: this.camera
      });

      i++;
    }

    this.quadsLoaded = true;

  }

  update(dt, force) {

    if (this.quadsLoaded === true && this.quads.length > 0) {

      for (let i = 0; i < this.referenceElements.length; i++) {

        const quad = this.quads[i];

        quad.update(force);
        //update uniforms
        quad.program.uniforms._Time.value += dt;

      }

      this.updateQuadDimensions();
      this.updateQuadPositions();

    }

  }

  //update sizes of quads based on reference dom elements
  updateQuadDimensions() {

    if (this.quadsLoaded) {

      this.referenceElements.forEach((el, i) => {
        const quad = this.quads[i];
        quad.updateDimensions({
          domElement: el,
          camera: this.camera
        });

      });
    }

  }

  // // update position of quads based on reference dom elements position
  updateQuadPositions() {

    if (this.quadsLoaded) {

      this.referenceElements.forEach((el, i) => {
        const quad = this.quads[i];
        quad.calcDomToWebGLPos({
          domElement: el,
          camera: this.camera
        });

      })
    }

  }

  //removes geometry and shader data from all active quads
  //as well as the mesh itself
  disposeActiveQuads() {

    this.quads.map((quad, i) => {

      quad.geometry.remove();
      quad.program.remove();
      quad.texture = null;
      this.scene.removeChild(quad);
      quad = null;
      this.quads.splice(i, 1);

    });

    this.quadsLoaded = false;

  }

}