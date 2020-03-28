import {
  Mesh,
  Program,
  Vec2,
  Texture,
  Plane
} from "ogl";

import {
  getCameraViewplaneSize
} from "../../utils/getCameraViewplaneSize";

const vert = require("./shaders/domQuad.vert");
const frag = require("./shaders/domQuad.frag");

export default class DomQuad extends Mesh {
  constructor(
    gl,
    camera,
    domElement, {
      widthSegments = 1.0,
      heightSegments = 1.0,
      posOffset = 0.0,
      phase = 0.0
    }
  ) {
    super(gl);

    this.geometry = new Plane(gl, {
      width: 1,
      height: 1,
      widthSegments: widthSegments,
      heightSegments: heightSegments
    });

    this.initProgram({el: domElement, alphaPhase: phase});

    this.updateDimensions({
      domElement,
      camera
    });

    this.calcDomToWebGLPos({
      domElement: domElement,
      camera: camera
    });

    this.name = `PROJECT ${posOffset}`

    this.position.z = -posOffset;

  }

  initProgram({el, alphaPhase}) {
    const elementHasImage = el.children[0] instanceof HTMLImageElement;

    this.texture = new Texture(this.gl);
    let imageAspect;

    if (elementHasImage) {
      this.texture.image = el.children[0];
      imageAspect = this.texture.width / this.texture.height;
    } else {
      imageAspect = 1.0;
    }

    this.cameraViewplaneSize = new Vec2(1.0, 1.0);
    this.viewportScalePhase = new Vec2(1.0, 1.0);

    const rect = el.getBoundingClientRect();

    //MAKE ONE SINGLE UNIFORM FOR THE WIDTH AND HEIGHT OF THE QUAD
    const u = {
      _ViewplaneSize: {
        value: new Vec2(1.0, 1.0)
      },
      _Time: {
        value: 0
      },
      _Image: {
        value: this.texture
      },
      _InputForce: {
        value: 0.0
      },
      _AlphaPhase: {
        value: alphaPhase
      },
      _ImageAspect: {
        value: 1.0 //hard coded based on proved image
      },
      _Aspect: {
        value: rect.height / rect.width
      }
    };

    this.program = new Program(this.gl, {
      vertex: vert,
      fragment: frag,
      uniforms: u,
      transparent: true
    });
  }

  //https://torstencurdt.com/tech/posts/modulo-of-negative-numbers/
  update(force) {

    this.position.z += force;
    
    this.position.z %= -5.0; //hard coded mod for now
    this.position.z = this.position.z > 0.0 ? this.position.z - 5.0 : this.position.z;

    // this.position.z %= -2.0; //hard coded mod for now
    // this.position.z = this.position.z > 0.0 ? this.position.z - 2.0 : this.position.z;

    // this.position.z += force;
    // this.position.z %= -3.0; //hard coded mod for now
    // this.position.z = this.position.z > 0.75 ? this.position.z - 3.0 : this.position.z;

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

    //determine within a range between 0 and 1 how much a given dom element's
    //width and height is filling the viewport and use that to scale the calculated
    //camera viewport size
    this.viewportScalePhase = this.calcViewportScalePhase(domElement);

    const w = this.cameraViewplaneSize.x * this.viewportScalePhase.x;
    const h = this.cameraViewplaneSize.y * this.viewportScalePhase.y;
    this.program.uniforms._ViewplaneSize.value.set(w, h);
  }

  calcViewportScalePhase(domElement) {
    const rect = domElement.getBoundingClientRect();
    const viewportScaleX = rect.width / window.innerWidth;
    const viewportScaleY = rect.height / window.innerHeight;

    //should not be here anymore
    if (this.program) {
      this.program.uniforms._Aspect.value = rect.height / rect.width;
    }

    return new Vec2(viewportScaleX, viewportScaleY);
  }

  //tranlate the dom elements position in "dom space" to a position relative
  //to the calculted view plane's dimensions
  calcDomToWebGLPos({
    domElement
  }) {
    //get reference div
    const rect = domElement.getBoundingClientRect();

    //Get top and left of rect (dom elements "origin" is at top left corner).
    //Then find out where on the screen the dom element is drawn in range between -1 and 1

    //Because domElements origin starts from the top-left corner, we also need to offset
    //the dom's position by half it's width and height in order to move the origin
    //to the center

    const posPhaseX =
      2.0 * ((rect.left + rect.width * 0.5) / window.innerWidth) - 1.0;
    const posPhaseY =
      2.0 * ((rect.top + rect.height * 0.5) / window.innerHeight) - 1.0;

    const posX = posPhaseX * this.cameraViewplaneSize.x;
    const posY = posPhaseY * this.cameraViewplaneSize.y * -1.0;

    //set position of quad
    this.position.x = posX;
    this.position.y = posY;
  }
}