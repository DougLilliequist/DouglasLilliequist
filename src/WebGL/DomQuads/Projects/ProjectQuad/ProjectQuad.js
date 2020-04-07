import DomQuad from '../../../extras/DomQuad/DomQuad.js';
import {
    Program,
    Vec2,
    Texture,
  } from "ogl";
  
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
      camera,
      domElement,
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
  
      this.name = `PROJECT ${posOffset}`
  
      this.phase = phase; //rename later
      
      this.initIndex = this.index = posOffset;
  
      this.indexOffset = 0.0;
  
      this.videos = media;
  
      this.video = this.videos[this.index];
  
      this.position.z = -posOffset;
  
      this.resetPosition = false;
  
      this.targetPos = this.position.z; //remove prev position
  
      this.inScrollMode = false;
  
      this.initProgram({el: domElement});
  
      super.updateDimensions({
        domElement,
        camera
      });
  
      super.calcDomToWebGLPos({
        domElement: domElement,
        camera: camera
      });
  
      this.initEvents();
  
    }
  
    initEvents() {
  
      emitter.on(events.PLAY_VIDEO, this.playVideo);
  
      emitter.on(events.PAUSE_VIDEO, this.pauseVideo);
  
    }
  
    initProgram({el}) {
  
      this.texture = new Texture(this.gl, {
        generateMipmaps: false,
        width: 512,
        height: 512
      });
      let imageAspect;
  
      imageAspect = this.texture.width / this.texture.height;
      
      this.cameraViewplaneSize = new Vec2(1.0, 1.0);
      this.viewportScalePhase = new Vec2(1.0, 1.0);
  
      const rect = el.getBoundingClientRect();
  
      const u = {
        _ViewplaneSize: {
          value: super.viewPlaneSize
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
          value: 0.0
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
          value: super.aspect
        }
      };
  
      this.program = new Program(this.gl, {
        vertex: vert,
        fragment: frag,
        uniforms: u,
        transparent: true
      });
    }
  
    //make animations into timeline anims
    applyScrollMode() {
  
      this.inScrollMode = true;
  
      gsap.to(this.program.uniforms._Alpha, {
        value: 0.65,
        duration: 0.5,
        ease: "power2.inOut"
      })
  
      gsap.to(this.program.uniforms._Scale, {
        value: 0.85,
        duration: 0.5,
        ease: "power2.inOut"
      })
  
      gsap.to(this.program.uniforms._AlphaPhase, {
        value: 1.0,
        duration: 0.5,
        ease: "power2.inOut"
      })
  
    }
  
    removeScrollMode() {
  
      this.inScrollMode = false;
  
      gsap.to(this.program.uniforms._Alpha, {
        value: 1.0,
        duration: 0.5,
        ease: "power2.inOut"
      })
  
      
      gsap.to(this.program.uniforms._Scale, {
        value: 1.0,
        duration: 0.5,
        ease: "power2.inOut"
      })
  
      gsap.to(this.program.uniforms._AlphaPhase, {
        value: 0.0,
        duration: 0.5,
        ease: "power2.inOut"
      })
  
    }
  
    // update(force, interacting) {
    update({index, force, interacting}) {
  
  
      if(interacting) {
        this.position.z += force;
      } else {
        this.position.z += (this.targetPos - this.position.z) * 0.05;
      }
  
      this.isOutofBounds(index);
      this.position.z = loopNegativeNumber({a: this.position.z, b: -5.0});
      
      if(this.video !== null) {
        this.updateVideoTexture();
      }
  
  
    }
  
    inView({inViewPosZ}) {
  
      if(Math.round(this.position.z) === inViewPosZ) {
        return true;
      } else {
        return false;
      }
  
    }
  
    //double make sure that video texture is not being updated
    updateVideoTexture() {
  
        this.video = this.videos[this.index];
  
        if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
          this.texture.image = this.video;
          this.texture.needsUpdate = true;
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
  
    //I have no idea how it makes sense, but after some pen & paper coding I noticed
    //that applying the delta between the video count and the quad count gives me the desired index?

    //rename function name
    isOutofBounds() { //change name of function
  
      if(this.position.z > 0.0) {
        this.index += this.parent.children.length;
  
      } else if(this.position.z < - 5.0) { //magic number 5: max distanc based on quads current 1 unit spacing
        this.index -= this.parent.children.length;
      }
        
      this.index = (((this.index % this.videos.length) + this.videos.length) % this.videos.length);
    
    }
  
  }