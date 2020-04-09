import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import ProjectQuadMediator from './Projects/projectQuadMediator.js'
import AboutQuadMediator from './About/AboutQudMediator.js';

export default class DomQuadManager {

    constructor(gl, scene, camera) {

        this.gl = gl;

        this.scene = scene;

        this.camera = camera;

        this.initMediators();

        this.initEvents();

    }


    initMediators() {

        this.activeMediator = null;
        this.mediators = {
            PROJECTS: new ProjectQuadMediator(this.gl, this.scene, this.camera),
            ABOUT: new AboutQuadMediator(this.gl, this.scene, this.camera)
        }

    }

    initEvents() {

        emitter.on(events.INIT_DOMGL, this.loadMediator);
        emitter.on(events.REMOVE_DOMGL, this.unloadActiveMediator);
        emitter.on(events.RESIZE, this.resize)

    }

    loadMediator = ({view, params}) => {

        this.activeMediator = this.mediators[view];
        this.activeMediator.initQuads(params);
        this.activeMediator.initEvents();

    }

    unloadActiveMediator = () => {

            this.activeMediator.removeEvents();
            this.activeMediator.unloadQuads();

    }

    update({dt, inputPos, inputDelta}) {

        if(this.activeMediator === null) return;

        this.activeMediator.update({dt, inputPos, inputDelta});
        this.activeMediator.children.map((quad, i) => {

            quad.calcDomToWebGLPos({
                domElement: this.activeMediator.referenceElement,
              });

        });

    }
    
    updateQuadDimensions() {

        if(this.activeMediator === null) return;

        this.activeMediator.children.map((quad, i) => {
          
            quad.updateDimensions({
            domElement: this.activeMediator.referenceElement,
            camera: this.camera
          });
        
        });

    }

    resize = () => {

        if (this.updateDimensions) {
            clearTimeout(this.updateDimensions);
          }

        this.updateDimensions = setTimeout(() => {
            this.updateQuadDimensions();
          }, 60);

    }

}