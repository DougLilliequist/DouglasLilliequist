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

  }

  //get camera's current viewplane dimensions as well as the reference dom's scale phase
  //based on the viewport's current size to determine final width and height
  //relative to the camera's view plane
  updateDimensions({
    domElement,
    camera
  }) {
    //get current viewplane size based on perspective camera's fov and desired plane distance
    this.cameraViewplaneSize = getCameraViewplaneSize(camera); //make this globally available
    this.viewportScalePhase = this.calcViewportScalePhase(domElement);

    this.viewPlaneSize.x = this.cameraViewplaneSize.x * this.viewportScalePhase.x;
    this.viewPlaneSize.y = this.cameraViewplaneSize.y * this.viewportScalePhase.y;

  }

  calcViewportScalePhase(domElement) {
    
    const rect = domElement.getBoundingClientRect();
    
    const viewportScaleX = rect.width / window.innerWidth;
    const viewportScaleY = rect.height / window.innerHeight;
    
    this.aspect = rect.width / rect.height;

    return new Vec2(viewportScaleX, viewportScaleY);
  
  }

  //tranlate the dom elements position in "dom space" to a position relative
  //to the calculted view plane's dimensions
  calcDomToWebGLPos({
    domElement
  }) {
    
    const rect = domElement.getBoundingClientRect();

    const posPhaseX =
      2.0 * ((rect.left + (rect.width * 0.5)) / window.innerWidth) - 1.0;
    const posPhaseY =
      2.0 * ((rect.top + (rect.height * 0.5)) / window.innerHeight) - 1.0;

    const posX = posPhaseX * this.cameraViewplaneSize.x;
    const posY = posPhaseY * this.cameraViewplaneSize.y * -1.0;

    //set position of quad
    this.position.x = posX;
    this.position.y = posY;
  }

  dispose() {

    this.visible = false;

  }

}