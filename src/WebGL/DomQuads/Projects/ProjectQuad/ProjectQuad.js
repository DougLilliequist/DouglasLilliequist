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
    
      this.targetPos = this.position.z; //remove prev position

      this.inScrollMode = false;

      this.isInView = false;

      this.traveringPosition = false;
        
      this.initProgram();
  
      this.initEvents();
  
    }
  
    initEvents() {
  
      emitter.on(events.PLAY_VIDEO, this.playVideo);
      emitter.on(events.PAUSE_VIDEO, this.pauseVideo);
      
      emitter.on(events.APPLY_SCROLL_MODE_ANIM, this.applyScrollMode);
      emitter.on(events.REMOVE_SCROLL_MODE_ANIM, this.removeScrollMode);
      
      emitter.on(events.APPLY_TRAVERSE_MODE_ANIM, this.applyTraverseMode);
      emitter.on(events.REMOVE_TRAVERSE_MODE_ANIM, this.removeTraverseMode);

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
        transparent: true
      });
    }
  
    //consider making the animation faster
    applyScrollMode = () => {
  
      this.inScrollMode = true;
      this.animteUniforms({alpha: 0.35, alphaPhase: 1.0, flowMapPhase: 0.0});
  
    }
  
    removeScrollMode = () => {
      
      this.inScrollMode = false;
      this.targetPos = Math.round(this.position.z);
      this.animteUniforms({alpha: this.inView ? 1.0 : 0.0, alphaPhase: 1.0, flowMapPhase: this.inView ? 1.0 : 0.0});
  
    }

    applyTraverseMode = () => {

      this.traveringPosition = true;
      this.animteUniforms({alpha: 0.35, alphaPhase: 1.0, flowMapPhase: 0.0});

    }

    removeTraverseMode = () => {

      this.traveringPosition = false;
      this.animteUniforms({alpha: this.inView ? 1.0 : 0.0, alphaPhase: 1.0, flowMapPhase: this.inView ? 1.0 : 0.0});

    }

    traversePosition({direction, duration}) {

      const pos = this.position.z;
      if(this.traverseAnim) this.traverseAnim.kill();
      this.traverseAnim = gsap.to(this.position, {
        z: pos + Math.sign(direction),
        duration: duration,
        ease: "circ.inOut",
        onStart: () => this.traveringPosition = true,
        onComplete: () => {
          this.updateIndex({traversing: true});
          this.position.z = loopNegativeNumber({a: this.position.z, b: -5});
          gsap.delayedCall(0.5, () => this.traveringPosition = false);
        }
      });

    }
  
    update({force}) {

      if(this.video !== null) {
        this.updateVideoTexture();
      }

      console.log(this.traveringPosition)
      
      if(this.traveringPosition === false) {

        // if(this.inScrollMode) {
        //   this.position.z += force;
        //   this.updateIndex({traversing: false});
        //   this.position.z = loopNegativeNumber({a: this.position.z, b: -5.0});
  
        // } else {
        //   this.position.z += (this.targetPos - this.position.z) * 0.1;
        // }

      }
      
    }

    animteUniforms({alpha, alphaPhase, flowMapPhase}) {

      this.killUniformAnim();
      this.scrollModeTl = gsap.timeline({})
      this.scrollModeTl.to(this.program.uniforms._Alpha, {
        value: alpha,
        duration: 0.35,
        ease: "power2.inOut"
      }, "<");

      this.scrollModeTl.to(this.program.uniforms._AlphaPhase, {
          value: alphaPhase,
          duration: 0.35,
          ease: "power2.inOut"
        }, "<");

        this.scrollModeTl.to(this.program.uniforms._FlowMapPhase, {
          value: flowMapPhase,
          duration: 0.3,
          ease: "power2.inOut"
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
    updateIndex({traversing}) {

      let greaterThanBouds = this.position.z > 0.0;
      let lessThanBounds = traversing ? this.position.z <= -5.0 : this.position.z < -5.0;
  
      if(lessThanBounds) {
        this.index -= this.parent.children.length;
      } else if(greaterThanBouds) { //magic number 5: max distanc based on quads current 1 unit spacing
        this.index += this.parent.children.length;
      }
        
      this.index = (((this.index % this.videos.length) + this.videos.length) % this.videos.length);
    
    }

    inView({inViewPosZ}) {
  
      this.program.uniforms._InView.value = this.isInView = Math.round(this.position.z) === inViewPosZ ? true : false;
      return this.isInView;

  }

    killUniformAnim() {

      gsap.killTweensOf(this.program.uniforms._Alpha);
      gsap.killTweensOf(this.program.uniforms._Scale);
      gsap.killTweensOf(this.program.uniforms._AlphaPhase);
      gsap.killTweensOf(this.program.uniforms._FlowMapPhase);

    }
  
  }