import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

import {
    gsap
} from 'gsap';
import globals from '../utils/globals.js';

export default class LoadingScreen {

    constructor() {

        this.el = document.body.querySelector('.loader');

        this.loadingProgress = document.body.querySelector('.loader__progress');

        this.totalContent = 0;
        this.contentCount = 0;

        this.currentScale = 0;
        this.targetScale = 0;

        this.reveal();

        this.initEvents();

    }

    initEvents() {

        emitter.on(events.UPDATE_CONTENT_COUNT, (count) => {
            this.totalContent += count;
        });

        emitter.on(events.TEXTURE_LOADED, this.updateProgress);
        emitter.on(events.UPDATE, this.update);

    }

    reveal() {

    }

    hide = () => {

        gsap.to(this.loadingProgress, {
            delay: 1.5,
            duration: 1.0,
            ease: "power1.inOut",
            y: -this.loadingProgress.getBoundingClientRect().height,
            onComplete: () => {
                gsap.delayedCall(0.5, () => {
                    this.el.classList.add('loaded');
                    globals.CONTENT_LOADED = true;
                    emitter.emit(events.LOADING_ANIM_COMPLETED);
                })
            }
        })

    }

    updateProgress = (phase) => {

        this.contentCount++;
        this.targetScale = this.contentCount / this.totalContent;
        this.loadingProgress.innerText = `${Math.round(this.targetScale * 100.0)}`;
        if (this.contentCount === this.totalContent) this.hide();

    }

    update = () => {

        this.currentScale += (this.targetScale - this.currentScale) * 0.1;

    }

}