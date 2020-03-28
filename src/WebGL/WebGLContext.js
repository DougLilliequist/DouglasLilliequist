import {
  Transform
} from "../../vendors/ogl/src/core/Transform";
import {
  Renderer
} from "../../vendors/ogl/src/core/Renderer";
import {
  Camera
} from "../../vendors/ogl/src/core/Camera";

import {
  Raycast
} from "../../vendors/ogl/src/extras/Raycast";

import {
  Vec2
} from "../../vendors/ogl/src/math/Vec2";

import DomQuadManager from "./DomQuads/DomQuadManager.js";

const emitter = require('tiny-emitter/instance');

import * as dat from 'dat.gui';

window.gui = new dat.GUI({});

export default class WebGLContext {
  constructor(container) {

    console.log('webgl created');
    this.initScene(container);
    this.initEvents();
    this.start();
  }

  initScene(container) {
    this.renderer = new Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      dpr: 1.5
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    // container.appendChild(this.gl.canvas);
    document.body.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl, {
      fov: 35,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 50.0
    });

    this.camera.position.set(0.0, 0.0, 2.0);

    this.currentTime = 0;
    this.prevtime = 0;
    this.deltaTime = 1;

    this.scene = new Transform();

    this.domQuadsManager = new DomQuadManager(this.gl, this.scene, this.camera);
  }

  initQuads(domElements) {
    this.domQuadsManager.init(this.gl, {
      domElements: domElements
    });
  }

  initEvents() {
    window.addEventListener("resize", this.onResize.bind(this), {
      passive: true
    });
    this.isResizing = false;
    // window.addEventListener("wheel", this.onScroll.bind(this));
    window.addEventListener("wheel", this.onScroll.bind(this), {
      passive: true
    });
    // this.prevScrollPos = 0;
    // this.currentScrollPos = 0;
     // this.scrollPhase = 0.0;    
    this.isScrolling = false;
    this.scrollForce = 0;
    this.scrollTimeOut = 2.0 * 1000.0;
    
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);

    this.rayCast = new Raycast(this.gl);
    this.isInteracting = false;
    this.inputPos = new Vec2(0.0, 0.0)

  }

  onMouseMove(e) {

    if(this.updateInteractionState) {
      clearTimeout(this.updateInteractionState);
    }

    this.isInteracting = true;
    this.inputPos.x = 2.0 * (e.x / window.innerWidth) - 1.0;
    this.inputPos.y = -1 * (2.0 * (e.y / window.innerHeight) - 1.0);

    this.rayCast.castMouse(this.camera, this.inputPos);
    
    const intersections = this.rayCast.intersectBounds(this.domQuadsManager.quads);
    intersections.forEach((intersection) => {
      console.log(intersection);
    })

    setTimeout(() => {

      this.isInteracting = false;

    }, 1000.0);

  }

  onScroll(e) {

    if(this.updateSrollPhase) {
      clearTimeout(this.updateSrollPhase);
    }

    this.isScrolling = true;
    this.scrollForce += e.deltaY * 0.001;

    setTimeout(()=> {

      this.isScrolling = false;
      console.log('no longer scrolling')
    }, this.scrollTimeOut);

  }

  start() {
    this.update();
  }

  render() {
    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    });
  }

  update() {
    window.requestAnimationFrame(() => this.update());
    this.currentTime = performance.now();
    this.deltaTime = (this.currentTime - this.prevtime) / 1000.0;

    this.updateScrollingAnim();

    this.render();

    this.prevtime = this.currentTime;
  }

  updateScrollingAnim() {

    this.scrollForce *= 0.99;
    this.domQuadsManager.update(this.deltaTime, this.scrollForce);

  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (this.updateDimensions) {
      clearTimeout(this.updateDimensions);
    }

    this.renderer.setSize(w, h);
    const aspectRatio = w / h;
    this.camera.perspective({
      aspect: aspectRatio
    });

    this.updateDimensions = setTimeout(() => {
      // this.domQuadsManager.updateQuadDimensions();
    }, 60);
  }
}