import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import ProjectQuadMediator from './Projects/ProjectQuadMediator.js'
import AboutQuadMediator from './About/AboutQuadMediator.js';

import {
    gsap
} from 'gsap';

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

    loadMediator = ({
        view,
        params
    }) => {

        this.activeMediator = this.mediators[view];
        this.activeMediator.bindToDom(params);
        this.activeMediator.initEvents();
        this.activeMediator.setParent(this.scene);

    }

    unloadActiveMediator = () => {

        this.activeMediator.removeEvents();
        this.activeMediator.unloadQuads();
        this.scene.removeChild(this.activeMediator);

    }

    update({
        dt,
        inputPos,
        inputDelta,
        flowMap
    }) {

        if (this.activeMediator === null) return;

        this.activeMediator.update({
            dt,
            inputPos,
            inputDelta,
            flowMap
        });

        let i = 0;
        while (i < this.activeMediator.children.length) {
            let quad = this.activeMediator.children[i];
            quad.updateDimensions();
            quad.calcDomToWebGLPos();
            i++;
        };

    }

    updateQuadRelations() {

        if (this.activeMediator === null) return;

        this.activeMediator.children.forEach((quad) => {

            quad.updateRelations({
                camera: this.camera
            });

        });

    }

    resize = () => {

        if (this.resizeEvent) this.resizeEvent.kill();
        this.resizeEvent = gsap.delayedCall(0.1, () => {
            this.updateQuadRelations();
        });

    }

}