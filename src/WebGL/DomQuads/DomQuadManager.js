import DomQuad from "./DomQuad/DomQuad.js";

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

  constructor(scene, camera) {

    this.quads = [];

    this.scene = scene;

    this.camera = camera;

    this.quadsLoaded = false;

  }

  //applies appropriate sizes and positions based on reference dom elements
  //bounding rects
  init(gl, {
    domElements
  }) {

    if (domElements === null || domElements.length === 0) {
      console.error('reference dom elements not available')
      return;
    }

    this.referenceElements = domElements;

    let i = 0;
    while (i < this.referenceElements.length) {
      this.quads[i] = new DomQuad(gl, this.camera, this.referenceElements[i], {
        widthSegments: 32.0,
        heightSegments: 32.0
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

  update(dt) {

    if (this.quadsLoaded === true && this.quads.length > 0) {

      for (let i = 0; i < this.referenceElements.length; i++) {

        const quad = this.quads[i];

        //update uniforms
        quad.program.uniforms._Time.value += dt;

      }

    }

  }

  //update sizes of quads based on reference dom elements
  updateQuadDimensions() {

    this.referenceElements.forEach((el, i) => {
      const quad = this.quads[i];
      quad.updateDimensions({
        domElement: el,
        camera: this.camera
      });

    });

  }

  // update position of quads based on reference dom elements position
  updateQuadPositions() {

    this.referenceElements.forEach((el, i) => {
      const quad = this.quads[i];
      quad.calcDomToWebGLPos({
        domElement: el,
        camera: this.camera
      });

    })

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