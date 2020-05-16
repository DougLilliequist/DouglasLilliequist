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

import MouseFlowmap from './MouseFlowmap/MouseFlowmap';

import eventEmitter from '../EventEmitter';
const emitter = eventEmitter.emitter;
import events from '../../utils/events';

import {gsap} from 'gsap';

const Stats = require('stats-js'); 

import * as dat from 'dat.gui';

// window.gui = new dat.GUI({});

export default class WebGLContext {
  constructor(container) {
    this.initScene(container);
    this.initEvents();
    this.initDomQuadManager();
    this.initMouseflowMap();
  }

  initScene(container) {
    this.renderer = new Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      dpr: 1.0
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0.9, 0.9, 0.9, 1.0);

    this.gl.canvas.style.position = "absolute";
    this.gl.canvas.style.width = "100%";
    this.gl.canvas.style.height = "100%";
    this.gl.canvas.style.top = "0%";
    this.gl.canvas.style.left = "0%";
    this.gl.canvas.style.zIndex = "-1";

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

    this.stats = new Stats();
    // document.body.appendChild(this.stats.dom);

  }

  initDomQuadManager() {

    this.domQuadManager = new DomQuadManager(this.gl, this.scene, this.camera);

  }

  initMouseflowMap() {

    this.mouseFlowmap = new MouseFlowmap(this.gl, {size: 256});

  }

  initEvents() {

    emitter.on(events.MOUSE_DOWN, this.onMouseDown);
    emitter.on(events.MOUSE_MOVE, this.onMouseMove);
    emitter.on(events.MOUSE_UP, this.onMouseUp);
    emitter.on(events.UPDATE, this.update);

    this.isInteracting = false;
    this.firstMove = false;
    this.inputPos = new Vec2(0.0, 0.0);
    this.prevInputPos = new Vec2(0.0, 0.0);
    this.inputDelta = new Vec2(0.0, 0.0);

    emitter.on(events.RESIZE, this.onResize);
    this.isResizing = false;

  }

  onMouseDown = (e) => {

    this.isInteracting = true;
    this.inputPos.x = 2.0 * (e.x / window.innerWidth) - 1.0;
    this.inputPos.y = -1 * (2.0 * (e.y / window.innerHeight) - 1.0);
    this.prevInputPos.copy(this.inputPos);
    this.inputDelta = this.inputPos.clone().sub(this.prevInputPos);

  }

  onMouseMove = (e) => {


     this.inputPos.x = 2.0 * (e.x / window.innerWidth) - 1.0;
     this.inputPos.y = -1 * (2.0 * (e.y / window.innerHeight) - 1.0);
     if(this.firstMove === false) {
      this.firstMove = true;
      this.prevInputPos.copy(this.inputPos);
      this.inputDelta = this.inputPos.clone().sub(this.prevInputPos);
    }

  }

  onMouseUp = () => {

    this.isInteracting = false;
    this.firstMove = false;

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

    // if(this.isInteracting) this.inputDelta = this.inputPos.clone().sub(this.prevInputPos);
    this.inputDelta = this.inputPos.clone().sub(this.prevInputPos);

    this.mouseFlowmap.update(this.renderer, {dt: this.deltaTime, inputPos: this.inputPos, inputDelta: this.inputDelta});

    this.domQuadManager.update({
      dt: this.deltaTime,
      inputPos: this.inputPos, 
      inputDelta: this.inputDelta,
      flowMap: this.mouseFlowmap.Texture 
    });

    this.render();
    
    this.prevInputPos.copy(this.inputPos);

    this.prevtime = this.currentTime;

    this.stats.end();

  }

  onResize = () => {

    if(this.resizeContext) this.resizeContext.kill();

    this.resizeContext = gsap.delayedCall(0.05, () => {

      const w = window.innerWidth;
      const h = window.innerHeight;

      this.renderer.setSize(w, h);
      const aspectRatio = w / h;
      this.camera.perspective({
        aspect: aspectRatio
      });
  
      this.mouseFlowmap.Aspect = w/h;

    });

  }
}