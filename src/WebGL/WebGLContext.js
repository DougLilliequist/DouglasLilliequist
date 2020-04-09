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

import DomQuadManager from './DomQuads/DomQuadManager.js'

import eventEmitter from '../EventEmitter';
const emitter = eventEmitter.emitter;
import events from '../../utils/events';

const Stats = require('stats-js'); 

import * as dat from 'dat.gui';

// window.gui = new dat.GUI({});

export default class WebGLContext {
  constructor(container) {
    this.initScene(container);
    this.initEvents();
  }

  initScene(container) {
    this.renderer = new Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      dpr: 1.5
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0.97, 0.97, 0.97, 1.0);

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

    this.domQuadManager = new DomQuadManager(this.gl, this.scene, this.camera);

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

  }

  initEvents() {

    emitter.on(events.MOUSE_DOWN, this.onMouseDown);
    emitter.on(events.MOUSE_MOVE, this.onMouseMove);
    emitter.on(events.MOUSE_UP, this.onMouseUp);
    emitter.on(events.UPDATE, this.update);

    this.isInteracting = false;
    this.inputPos = new Vec2(0.0, 0.0);
    this.prevInputPos = new Vec2(0.0, 0.0);
    this.inputDelta = new Vec2(0.0, 0.0);

    emitter.on(events.RESIZE, this.onResize);
    this.isResizing = false;

  }

  onMouseDown = (e) => {

    this.isInteracting = true;
    this.prevInputPos.copy(this.inputPos);
    this.inputPos.x = 2.0 * (e.x / window.innerWidth) - 1.0;
    this.inputPos.y = -1 * (2.0 * (e.y / window.innerHeight) - 1.0);
    this.inputDelta = this.inputPos.clone().sub(this.prevInputPos);

  }

  onMouseMove = (e) => {

     this.inputPos.x = 2.0 * (e.x / window.innerWidth) - 1.0;
     this.inputPos.y = -1 * (2.0 * (e.y / window.innerHeight) - 1.0);

  }

  onMouseUp = () => {

    this.isInteracting = false;
    this.firstMove = false;

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

  update = () => {
    this.stats.begin();
    this.currentTime = performance.now();
    this.deltaTime = (this.currentTime - this.prevtime) / 1000.0;

    if(this.isInteracting) this.inputDelta = this.inputPos.clone().sub(this.prevInputPos);

    this.domQuadManager.update({
      dt: this.deltaTime, 
      inputPos: this.inputPos, 
      inputDelta: this.inputDelta, 
    });

    this.render();
    
    this.prevInputPos.copy(this.inputPos);

    this.prevtime = this.currentTime;

    this.stats.end();

  }

  onResize = () => {

    const w = window.innerWidth;
    const h = window.innerHeight;

    this.renderer.setSize(w, h);
    const aspectRatio = w / h;
    this.camera.perspective({
      aspect: aspectRatio
    });

  }
}