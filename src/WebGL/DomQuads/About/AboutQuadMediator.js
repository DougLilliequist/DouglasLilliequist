import DomquadMediator from '../../extras/DomQuad/DomquadMediator.js';
import AboutQuad from './AboutQuad/AboutQuad.js';

import eventEmitter from '../../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../../utils/events';

export default class AboutQuadMediator extends DomquadMediator {

    constructor(gl, scene, camera) {

        super(gl, scene, camera);

        this.gl = gl;

        this.position.z = 0.0;

    }

    initEvents = () => {
        emitter.on(events.REVEAL_QUADS, this.revealQuad);
        emitter.on(events.PREPARE_UNMOUNT, this.animateOutQuads);
    }

    removeEvents = () => {
        emitter.off(events.REVEAL_QUADS, this.revealQuad);
        emitter.off(events.PREPARE_UNMOUNT, this.animateOutQuads);
    }

    initQuads = ({
        referenceElement,
        media
    }) => {

        this.setParent(this.scene);

        this.referenceElement = referenceElement;

        if (this.quadsLoaded === false) {

            this.quad = new AboutQuad(this.gl, media, referenceElement, {
                widthSegments: 32.0,
                heightSegments: 32.0
            });

            this.quad.updateRelations({camera: this.camera});

            this.quad.setParent(this);

            this.quadsLoaded = true;

        }

        this.quad.visible = true;
        this.quad.domElement = referenceElement;

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