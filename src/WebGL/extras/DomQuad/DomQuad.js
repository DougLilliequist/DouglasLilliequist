import {
  getCameraViewplaneSize
} from "../../utils/getCameraViewplaneSize";
import {
  Mesh
} from "../../../../vendors/ogl/src/core/Mesh.js";
import {
  Vec2
} from "../../../../vendors/ogl/src/math/Vec2.js";

export default class DomQuad extends Mesh {
  constructor(
    gl) {

    super(gl);

    this.viewPlaneSize = new Vec2(1.0, 1.0);
    this.scaleOffset = new Vec2(1.0, 1.0);
    this.domElement = null;

  }

  //updates necessary paramters required for translating a dom elements position + scale
  //relative to the viewport to be relative to the perspective camera's near plane dimensions (which covers the viewport as well)
  updateRelations({
    camera
  }) {

    if (this.domElement === null) return;

    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.wK = 1.0 / this.w;
    this.hK = 1.0 / this.h;
    this.rect = this.domElement.getBoundingClientRect();
    this.cameraViewplaneSize = getCameraViewplaneSize(camera); //make this globally available

  }

  //sets scale relative to the width + height of the near plane's size
  updateDimensions() {

    if (this.domElement === null) return;

    let {
      width,
      height
    } = this.rect;

    // let viewportScaleX = width * this.scaleOffset.x * this.wK;
    // let viewportScaleY = height * this.scaleOffset.y * this.hK;
    let viewportScaleX = width * this.wK;
    let viewportScaleY = height * this.hK;

    this.viewPlaneSize.x = this.cameraViewplaneSize.x * viewportScaleX;
    this.viewPlaneSize.y = this.cameraViewplaneSize.y * viewportScaleY;

  }

  //tranlate the dom elements position in "dom space" to a position relative
  //to the calculted view plane's dimensions
  calcDomToWebGLPos() {

    if (this.domElement === null) return;

    let {
      width,
      height,
      top,
      left
    } = this.rect;

    let posPhaseX =
      2.0 * ((left + (width * 0.5)) * this.wK) - 1.0;
    let posPhaseY =
      2.0 * ((top + (height * 0.5)) * this.hK) - 1.0;

    //a bit isoteric (maybe), but a normalized coordinate plane goes between -1 and 1
    //in my case, I have a normalized position in the domain -1 and 1, which I multiply
    //with the widht and height equal to "half" the near plane's width and height,
    //which gives me a coordinate plane where the domain is [-viewplane size, viewplane size]
    //which will result in the "correct" position on the coordinate plane based on the calculated near plane
    this.position.x = posPhaseX * this.cameraViewplaneSize.x;
    this.position.y = posPhaseY * this.cameraViewplaneSize.y * -1.0;

  }

  dispose() {

    this.visible = false;

  }

}