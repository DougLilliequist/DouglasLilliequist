import DomQuad from '../../../extras/DomQuad/DomQuad.js';
import { Program } from '../../../../../vendors/ogl/src/core/Program.js';
import { Texture } from '../../../../../vendors/ogl/src/core/Texture.js';
import { Plane } from '../../../../../vendors/ogl/src/extras/Plane.js';
  
  const vert = require("./shaders/projectQuad.vert");
  const frag = require("./shaders/projectQuad.frag");
  
  import {loopNegativeNumber} from '../../../../../utils/Math.js';
  import eventEmitter from '../../../../EventEmitter.js'
  const emitter = eventEmitter.emitter;
  import events from '../../../../../utils/events.js';
  
  import {gsap} from 'gsap';
  
  export default class ProjectQuad extends DomQuad {
    constructor(
      gl,
      media, {
        widthSegments = 1.0,
        heightSegments = 1.0,
        posOffset = 0.0,
        phase = 0.0
      } = {}
    ) {

      super(gl,
        {
            widthSegments,
            heightSegments,
        } = {});

      this.gl = gl;
          
      this.initIndex = this.index = posOffset; //rename argument
    
      this.videos = media;
  
      this.video = this.videos[this.index].vid;
  
      this.initPos = this.position.z = 0 - posOffset;
    
      this.targetPos = this.position.z;

      this.inScrollMode = false;

      this.scrollPhase = 0;

      this.isInView = false;
      
      this.restoreDelta = 1;
      
      this.restorePhase = 0;

      this.restoreEase = 0;
        
      this.initProgram();
  
      this.initEvents();
  
    }
  
    initEvents() {
  
      emitter.on(events.PLAY_VIDEO, this.playVideo);
      emitter.on(events.PAUSE_VIDEO, this.pauseVideo);
      
      emitter.on(events.APPLY_SCROLL_MODE_ANIM, this.applyScrollMode);
      emitter.on(events.REMOVE_SCROLL_MODE_ANIM, this.removeScrollMode);

    }
  
    initProgram = () => {
    
    this.geometry = new Plane(this.gl, {
      width: 2,
      height: 2,
      widthSegments: 32.0,
      heightSegments: 32.0
    });
  
      this.texture = new Texture(this.gl, {
        generateMipmaps: false,
      });
    
      const u = {
        _ViewplaneSize: {
          value: this.viewPlaneSize
        },
        _Time: {
          value: 0
        },
        _Image: {
          value: this.texture
        },
        _FlowMap: {
          value: null
        },
        _FlowMapPhase: {
          value: 1.0
        },
        _ScrollPhase: {
          value: 0
        },
        _InputForce: {
          value: 0.0
        },
        _FlipFlowMapForce: {
          value: 0.0
        },
        _AlphaPhase: {
          value: 0.0
        },
        _RevealPhase: {
          value: 0.0
        },
        _RevealDirection: {
          value: 0.0
        },
        _InView: {
          value: false
        },
        _Alpha: {
          value: 0.0
        },
        _Scale: {
          value: 1.0
        },
      };
  
      this.program = new Program(this.gl, {
        vertex: vert,
        fragment: frag,
        uniforms: u,
        transparent: true,
      });
    }
  
    //consider making the animation faster
    applyScrollMode = () => {
  
      this.inScrollMode = true;
      this.animteUniforms({scale: 0.85, alpha: 1.0, alphaPhase: 1.0, flowMapPhase: 0.0});
  
    }
  
    removeScrollMode = () => {
      
      this.inScrollMode = false;
      this.animteUniforms({scale: 1.0, alpha: this.isInView ? 1.0 : 0.0, alphaPhase: 0.0, flowMapPhase: this.isInView ? 1.0 : 0.0});
      this.targetPos = Math.round(this.position.z);
      const delta = this.targetPos - this.position.z;
      this.restoreDelta = Math.abs(delta) > 0 ? delta : 1.0;

    }
  
    update({force}) {

      if(this.video !== null) {
        this.updateVideoTexture();
      }
      
      if(this.inScrollMode) {
          
          this.position.z += force;
          this.scrollPhase += force;

      } else {
        this.restorePosition();
      }

      this.updateIndex();
      this.loopPosition();
      this.updateScrollPhase();

    }

    updateScrollPhase() {

      this.scrollPhase = Math.max(-1.0, Math.min(1.0, this.scrollPhase));
      this.program.uniforms._ScrollPhase.value = this.scrollPhase;
      this.scrollPhase *= 0.93;
      if(Math.abs(this.scrollPhase) < 0.0001) this.scrollPhase = 0;

    }

    restorePosition() {

      const delta = this.targetPos - this.position.z;
      this.restoreEase = delta * 0.08;
      this.position.z += this.restoreEase;
      if(Math.abs(delta) < 0.0001) {
        this.position.z = Math.round(this.position.z);
        this.restoreEase = 0;
      } else {
        this.restorePhase = delta / this.restoreDelta;
        const fallOff = 1.0 - ((1.0 - this.restorePhase) * (1.0 - this.restorePhase));
        this.restoreEase *= fallOff;
      }
      
    }

    loopPosition() {
      
      if(this.position.z < -5) {
        this.position.z += 5;
      } else if(this.position.z > 0) {
        this.position.z -= 5;
      }
      
    }

    animteUniforms({scale, alpha, alphaPhase, flowMapPhase}) {

      if(this.scrollModeTl) this.scrollModeTl.kill();
      this.scrollModeTl = gsap.timeline({})
      this.scrollModeTl.to(this.program.uniforms._Alpha, {
        value: alpha,
        duration: 0.5,
        ease: "power2.out"
      }, "<");

      this.scrollModeTl.to(this.program.uniforms._Scale, {
        value: scale,
        duration: 0.35,
        ease: "power2.out"
      }, "<");

      this.scrollModeTl.to(this.program.uniforms._AlphaPhase, {
          value: alphaPhase,
          duration: 0.35,
          ease: "power2.out"
        }, "<");

        this.scrollModeTl.to(this.program.uniforms._FlowMapPhase, {
          value: flowMapPhase,
          duration: 0.3,
          ease: "power2.out"
        }, "<");

    }
  
    updateVideoTexture() {
  
        this.video = this.videos[this.index].vid;
        this.program.uniforms._FlipFlowMapForce.value = this.videos[this.index].isBright;

        if(this.inView) {
          if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
            this.texture.image = this.video;
            this.texture.needsUpdate = true;
          }
        } else {
          this.texture.needsUpdate = false;
        }
  
    }
  
    playVideo = () => {

      if(this.video === null) return;
      if(this.inView({inViewPosZ: 0 - this.parent.position.z})) this.video.play();
  
    }
  
    pauseVideo = () => {
  
      if(this.video === null) return;
      this.video.pause();
  
    }
  
    //I have no idea how it makes sense, but after some pen & paper coding I noticed
    //that applying the delta between the video count and the quad count gives me the desired index?
    updateIndex() {

      let lessThanBounds = this.position.z < -5.0;
      let greaterThanBouds = this.position.z > 0.0;
      const offSet = this.parent.children.length;
  
      if(lessThanBounds) {
        this.index -= offSet;
      } else if(greaterThanBouds) { //magic number 5: max distanc based on quads current 1 unit spacing
        this.index += offSet;
      }
        
      this.index = (((this.index % this.videos.length) + this.videos.length) % this.videos.length);
    
    }

    inView({inViewPosZ}) {
  
      this.program.uniforms._InView.value = this.isInView = Math.round(this.position.z) === inViewPosZ ? true : false;
      return this.isInView;

    }
  
  }