import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import ProjectQuadManager from './Projects/ProjectQuadManager.js'

export default class DomQuadManager {

    constructor(gl, scene, camera) {

        this.gl = gl;

        this.scene = scene;

        this.camera = camera;

        this.initMediators();

        this.initEvents();

        this.activeMediator;

        this.activeQuads = [];

    }

    initMediators() {

        this.projectQuadMediator = new ProjectQuadManager(this.gl, this.scene, this.camera);

    }

    initEvents() {

        emitter.on(events.INIT_PROJECTS_DOMGL, this.initProjectQuads);
        emitter.on(events.REMOVE_DOMGL, this.disposeActiveQuads);

    }

    initProjectQuads = ({referenceElement, media, getFirstQuad}) => {

        this.projectQuadMediator.initQuads({referenceElement, media, getFirstQuad});
        this.activeQuads = [...this.projectQuadMediator.quads];
        this.activeMediator = this.projectQuadMediator;

    }

    update({dt, inputForce, isInteracting}) {

        this.projectQuadMediator.update(dt, inputForce, isInteracting)

        this.activeMediator.transform.children.map((quad, i) => {

            quad.calcDomToWebGLPos({
                domElement: this.activeMediator.referenceElement,
                camera: this.camera
              });

        });

    }
    
    updateQuadDimensions() {

        this.activeMediator.transform.children.map((quad, i) => {
          
            quad.updateDimensions({
            domElement: this.activeMediator.referenceElement,
            camera: this.camera
          });
        
        });

    }

    disposeActiveQuads = () => {

        this.activeMediator.removeEvents();

        this.activeQuads.map((quad) => {
    
          this.activeMediator.transform.removeChild(quad);
          quad.geometry.remove();
          quad.program.remove();
          quad.texture = null;
          quad = null;
          
        })
    
        this.activeQuads.length = 0;
        this.quadsLoaded = false;

        if(this.activeMediator !== null) {
            this.scene.removeChild(this.activeMediator.transform);
        }
      
    }

}