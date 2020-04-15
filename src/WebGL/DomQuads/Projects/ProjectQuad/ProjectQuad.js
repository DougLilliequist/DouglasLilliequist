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
  
      this.name = `PROJECT ${posOffset}`
  
      this.phase = phase; //rename later
      
      this.initIndex = this.index = posOffset;
  
      this.indexOffset = 0.0;
  
      this.videos = media;
  
      this.video = this.videos[this.index];
  
      this.initPos = this.position.z = -posOffset;
  
      // this.resetPosition = false;
  
      this.targetPos = this.position.z; //remove prev position
  
      this.inScrollMode = false;

      this.isInView = false;
        
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
  
      let imageAspect = this.texture.width / this.texture.height;
  
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
        _InputForce: {
          value: 0.0
        },
        _AlphaPhase: {
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
        _RestorePhase: {
          value: 0.0
        },
        _ImageAspect: {
          value: 1.0 //hard coded based on proved image
        },
        _Aspect: {
          value: this.aspect
        }
      };
  
      this.program = new Program(this.gl, {
        vertex: vert,
        fragment: frag,
        uniforms: u,
        transparent: true
      });
    }
  
    //consider making the animation faster
    applyScrollMode = () => {
  
      // this.inScrollMode = true;
      this.inScrollMode = true;
      this.killScrollModeAnim();
      this.scrollModeTl = gsap.timeline({})
      this.scrollModeTl.to(this.program.uniforms._Alpha, {
        value: 0.35,
        duration: 0.6,
        ease: "power2.inOut"
      }, "<");
      this.scrollModeTl.to(this.program.uniforms._Scale, {
         value: 0.85,
         duration: 0.5,
        //  ease: "power2.inOut"
         ease: "sine.inOut"
      }, "<");

      this.scrollModeTl.to(this.program.uniforms._AlphaPhase, {
          value: 1.0,
          duration: 0.5,
          // ease: "power2.inOut"
          ease: "sine.inOut"
        }, "<");

        this.scrollModeTl.to(this.program.uniforms._FlowMapPhase, {
          value: 0.0,
          duration: 0.3,
          ease: "power2.inOut"
        }, "<");
  
    }
  
    removeScrollMode = () => {
      
      this.inScrollMode = false;
      this.killScrollModeAnim();
      this.scrollModeTl = gsap.timeline({})
      this.scrollModeTl.to(this.program.uniforms._Alpha, {
        value: this.isInView ? 1.0 : 0.0,
        duration: 0.5,
        ease: "power2.inOut"
      }, "<");
      this.scrollModeTl.to(this.program.uniforms._Scale, {
         value: 1.0,
         duration: 0.5,
         ease: "power2.inOut"
      }, "<");

      this.scrollModeTl.to(this.program.uniforms._AlphaPhase, {
          value: 0.0,
          duration: 0.5,
          ease: "power2.inOut"
        }, "<");

        this.scrollModeTl.to(this.program.uniforms._FlowMapPhase, {
          value: 1.0,
          duration: 0.5,
          ease: "power2.inOut"
        }, "<");
  
    }
  
    update({index, force, isInteracting}) {
    
      if(isInteracting) {
        this.position.z += force;
      } else {
        this.position.z += (this.targetPos - this.position.z) * 0.05;
      }
  
      this.updateIndex(index);
      this.position.z = loopNegativeNumber({a: this.position.z, b: -5.0});
      
      if(this.video !== null) {
        this.updateVideoTexture();
      }
  
  
    }
  
    inView({inViewPosZ}) {
  
      if(Math.round(this.position.z) === inViewPosZ) {
        this.program.uniforms._InView.value = this.isInView = true;
        return this.isInView;
      } else {
        this.program.uniforms._InView.value = this.isInView = false;
        return this.isInView;
      }
  
    }
  
    updateVideoTexture() {
  
        this.video = this.videos[this.index];

        if(this.inView) {
          if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
            this.texture.image = this.video;
            this.texture.needsUpdate = true;
          }
        } else {
          // this.texture.needsUpdate = false;
        }
  
    }
  
    playVideo = () => {

      if(this.video === null) return;
      if(this.parent) {
        if(this.inView({inViewPosZ: 0 - this.parent.position.z})) this.video.play();
      }
  
    }
  
    pauseVideo = () => {
  
      if(this.video === null) return;
      this.video.pause();
  
    }

    killScrollModeAnim() {

      gsap.killTweensOf(this.program.uniforms._Alpha);
      gsap.killTweensOf(this.program.uniforms._Scale);
      gsap.killTweensOf(this.program.uniforms._AlphaPhase);
      gsap.killTweensOf(this.program.uniforms._FlowMapPhase);

    }
  
    //I have no idea how it makes sense, but after some pen & paper coding I noticed
    //that applying the delta between the video count and the quad count gives me the desired index?
    updateIndex() { //change name of function
  
      if(this.position.z > 0.0) {
        this.index += this.parent.children.length;
  
      } else if(this.position.z < - 5.0) { //magic number 5: max distanc based on quads current 1 unit spacing
        this.index -= this.parent.children.length;
      }
        
      this.index = (((this.index % this.videos.length) + this.videos.length) % this.videos.length);
    
    }
  
  }