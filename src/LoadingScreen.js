import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

import {
    gsap
} from 'gsap';

export default class LoadingScreen {

    constructor() {

        this.el = document.body.querySelector('.loader');

        this.copyContainer = document.body.querySelector('.loader__copy-container');
        this.title = document.body.querySelector('.loader__title');
        this.subTitle = document.body.querySelector('.loader__sub-title');

        this.alpha = 0;
        this.targetAlpha = 0;

        this.title.style.opacity = 0;
        this.subTitle.style.opacity = 0;

        this.title.firstElementChild.innerHTML = "Douglas Lilliequist"
        this.subTitle.firstElementChild.innerHTML = "Creative Technologist"

        this.reveal();

        this.initEvents();

    }

    initEvents() {

        emitter.on(events.UPDATE_PROGRESS, this.updateProgressAnim);
        emitter.on(events.UPDATE, this.update);
        emitter.on(events.CONTENT_LOADED, this.hide);

    }

    reveal() {

        gsap.fromTo(this.copyContainer, {
            y: -50,
            opacity: 1
        }, {
            delay: 1.0,
            duration: 1.0,
            y: 0.0,
            opacity: 1.0,
            ease: "power1.out"
        });

    }

    hide = () => {

        const hideTl = new gsap.timeline({
            delay: 2.0,
            onComplete: () => {
                this.el.classList.add('loaded');
                emitter.emit(events.LOADING_ANIM_COMPLETED);
                emitter.off(events.UPDATE, this.update);
            }
        });

        hideTl.to(this.copyContainer, {
            duration: 1.0,
            // opacity: 1.001,
            y: 50,
            ease: "power2.in"
        });

        hideTl.to(this.el, {

            duration: 0.5,
            ease: "power2.inOut"

        });

    }

    updateProgressAnim = (phase) => {

        this.targetAlpha = phase;

    }

    update = () => {

        this.alpha += (this.targetAlpha - this.alpha) * 0.125;

        this.title.style.opacity = this.alpha;
        this.subTitle.style.opacity = this.alpha;

    }

}