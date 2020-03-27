import {
  Transform
} from "../../vendors/ogl/src/core/Transform";
import {
  Renderer
} from "../../vendors/ogl/src/core/Renderer";
import {
  Camera
} from "../../vendors/ogl/src/core/Camera";

import TestShape from "./TestShape/TestShape.js";

import DomQuadManager from "./DomQuads/DomQuadManager.js";

export default class WebGLContext {
  constructor(container) {
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
    // document.body.querySelector('.canvas-container').appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl, {
      fov: 35,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 50.0
    });

    this.camera.position.set(0.0, 0.0, 1.0);

    this.currentTime = 0;
    this.prevtime = 0;
    this.deltaTime = 1;

    this.scene = new Transform();

    // this.testShape = new TestShape(this.gl);
    // this.testShape.setParent(this.scene);

    // this.testShape.position.z = -10.0;

    this.domQuadsManager = new DomQuadManager(this.gl, this.scene, this.camera);
  }

  //TODO: set up the class for fetching relevant DOM bounding rect and check
  //if element has image attached, if so: load image and set it as uniform for quad

  initQuads(domElements) {
    this.domQuadsManager.init(this.gl, {
      domElements: domElements
    });
  }

  initEvents() {
    window.addEventListener("resize", this.onResize.bind(this), {
      passive: true
    });

    // window.addEventListener("wheel", this.onScroll.bind(this));
    window.addEventListener("wheel", this.onScroll.bind(this));

    this.prevScrollPos = 0;
    this.currentScrollPos = 0;
    this.scrollPhase = 0.0;
    this.isScrolling = false;
    this.isResizing = false;
    this.scrollForce = 0;
  }

  onScroll(e) {
    // console.log(e);
    // this.scrollForce += Math.sign(e.deltaY) * 0.005;
    // this.scrollForce = 0.025 * Math.sign(e.deltaY);
    // this.scrollForce += 0.005 * Math.min(1.0, e.deltaY);
    this.scrollForce += e.deltaY * 0.01;
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

    this.scrollForce *= 0.98;
    this.domQuadsManager.update(this.deltaTime, this.scrollForce);

    this.render();

    this.prevtime = this.currentTime;
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