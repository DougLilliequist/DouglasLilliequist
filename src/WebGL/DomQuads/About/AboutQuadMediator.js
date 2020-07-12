import DomquadMediator from '../../extras/DomQuad/DomquadMediator.js';
import AboutQuad from './AboutQuad/AboutQuad.js';
import {
    AboutContent
} from '../../../../static/AboutContent.js';

import eventEmitter from '../../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../../utils/events';

export default class AboutQuadMediator extends DomquadMediator {

    constructor(gl, scene, camera) {

        super(gl, scene, camera);

        this.gl = gl;

        this.position.z = 0.0;

        this.initQuads();

    }

    initEvents = () => {
        emitter.on(events.REVEAL_QUADS, this.revealQuad);
        emitter.on(events.PREPARE_UNMOUNT, this.animateOutQuads);
    }

    removeEvents = () => {
        emitter.off(events.REVEAL_QUADS, this.revealQuad);
        emitter.off(events.PREPARE_UNMOUNT, this.animateOutQuads);
    }

    initQuads() {

        const media = AboutContent.map((content) => {
            return content.media;
        });

        emitter.emit(events.UPDATE_CONTENT_COUNT, media.length);

        this.quad = new AboutQuad(this.gl, {
            media,
            widthSegments: 32.0,
            heightSegments: 32.0
        });

        this.quad.setParent(this);
    }

    bindToDom = ({
        referenceElement
    }) => {

        this.quad.visible = true;
        this.quad.domElement = referenceElement;
        this.quad.updateRelations({
            camera: this.camera
        });
        this.calculateDomTransforms();

    }

    revealQuad = () => {

        this.quad.reveal();

    }

    animateOutQuads = () => {

        this.quad.hide();

    }

    update({
        flowMap
    }) {

        this.quad.update(flowMap);

    }

    calculateDomTransforms() {

        this.quad.updateDimensions();
        this.quad.calcDomToWebGLPos();

    }

}