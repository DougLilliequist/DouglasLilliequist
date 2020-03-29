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
  Vec2
} from "../../vendors/ogl/src/math/Vec2";

import DomQuadManager from "./DomQuads/DomQuadManager.js";

// const emitter = require('tiny-emitter/instance');

import eventEmitter from '../EventEmitter';
const emitter = eventEmitter.emitter;
import events from '../../utils/events';

import * as dat from 'dat.gui';

// window.gui = new dat.GUI({});

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

    this.camera.position.set(0.0, 0.0, 1.0);

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

    emitter.on(events.MOUSE_DOWN, this.onMouseDown);
    emitter.on(events.MOUSE_MOVE, this.onMouseMove);
    emitter.on(events.MOUSE_UP, this.onMouseUp);

    // window.addEventListener('wheel', this.onScroll);
    // this.scrollForce = 0;

    this.isInteracting = false;
    this.inputPos = new Vec2(0.0, 0.0);
    this.prevInputPos = new Vec2(0.0, 0.0);
    this.inputForce = new Vec2(0.0, 0.0);

    emitter.on(events.RESIZE, this.onResize);
    this.isResizing = false;

  }

  onMouseDown = (e) => {

    this.isInteracting = true;
    this.prevInputPos.copy(this.inputPos);
    this.inputPos.x = 2.0 * (e.x / window.innerWidth) - 1.0;
    this.inputPos.y = -1 * (2.0 * (e.y / window.innerHeight) - 1.0);
    emitter.emit(events.ENTER_SCROLL_MODE);

  }

  onMouseMove = (e) => {

        this.inputPos.x = 2.0 * (e.x / window.innerWidth) - 1.0;
        this.inputPos.y = -1 * (2.0 * (e.y / window.innerHeight) - 1.0);

  }

  onMouseUp = () => {

    this.isInteracting = false;
    this.firstMove = false;
    this.domQuadsManager.captureLastPosition();
    const quad = this.domQuadsManager.getQuadInView();
    emitter.emit(events.EXIT_SCROLL_MODE);

  }

  onScroll = (e) => {

    if(this.updateInteractionState) {
      clearTimeout(this.updateInteractionState);
    }

    if(this.isInteracting === false) 
    this.isInteracting = true;  
    this.scrollForce += e.deltaY * 0.01;

    this.updateInteractionState = setTimeout(() => {
      this.isInteracting = false;
      this.domQuadsManager.captureLastPosition();
    }, 1000.0)

  }

  updateInputForce() {

    this.inputDir = new Vec2().sub(this.inputPos, this.prevInputPos);
    this.inputForce.y = this.inputDir.y * 10.0;
    // this.inputForce.y = this.inputDir.y;
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
    
    if(this.isInteracting) {
      this.updateInputForce();
    }
    
    this.updateScrollingAnim();

    this.render();
    
    this.prevInputPos.copy(this.inputPos);

    this.prevtime = this.currentTime;

  }

  updateScrollingAnim() {


    this.scrollForce *= 0.99;
    this.domQuadsManager.update(this.deltaTime, this.inputForce.y, this.isInteracting);

  }

  onResize = () => {

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