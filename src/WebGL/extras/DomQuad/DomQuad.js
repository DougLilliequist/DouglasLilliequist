import {
  Mesh,
  Vec2,
  Plane
} from "ogl";

import {
  getCameraViewplaneSize
} from "../../utils/getCameraViewplaneSize";
import { Program } from "../../../../vendors/ogl/src/core/Program";

export default class DomQuad extends Mesh {
  constructor(
    gl,
    {
      widthSegments = 1.0,
      heightSegments = 1.0,
    }
  ) {
    
    super(gl);

    this.viewPlaneSize = new Vec2(1.0, 1.0);
    this.aspect = 1.0;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.wK = 1.0 / this.w;
    this.hK = 1.0 / this.h;
    this.rect = null;

  }

  //get camera's current viewplane dimensions as well as the reference dom's scale phase
  //based on the viewport's current size to determine final width and height
  //relative to the camera's view plane
  updateDimensions({
    domElement,
    camera
  }) {
    
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.wK = 1.0 / this.w;
    this.hK = 1.0 / this.h;
    this.rect = domElement.getBoundingClientRect();

    //get current viewplane size based on perspective camera's fov and desired plane distance
    this.cameraViewplaneSize = getCameraViewplaneSize(camera); //make this globally available
    this.viewportScalePhase = this.calcViewportScalePhase();

    //rename viewplane size
    this.viewPlaneSize.x = this.cameraViewplaneSize.x * this.viewportScalePhase.x;
    this.viewPlaneSize.y = this.cameraViewplaneSize.y * this.viewportScalePhase.y;

    // this.scale.x = this.viewPlaneSize.x;
    // this.scale.y = this.viewPlaneSize.y;

  }

  calcViewportScalePhase() {
    
    // const rect = domElement.getBoundingClientRect();
    const {width, height} = this.rect;


    const viewportScaleX = width * this.wK;
    const viewportScaleY = height * this.hK;
    
    this.aspect = width / height;

    return new Vec2(viewportScaleX, viewportScaleY);
  
  }

  //tranlate the dom elements position in "dom space" to a position relative
  //to the calculted view plane's dimensions
  calcDomToWebGLPos({
    domElement
  }) {

    const {width, height, top, left} = this.rect;

    const posPhaseX =
      2.0 * ((left + (width * 0.5)) * this.wK) - 1.0;
    const posPhaseY =
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