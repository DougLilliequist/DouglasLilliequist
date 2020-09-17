import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

import {
    gsap
} from 'gsap';

export default class LoadingScreen {

    constructor() {

        this.el = document.body.querySelector('.loader');

        // this.loadingBar = document.body.querySelector('.loader__loading-bar');
        // gsap.set(this.loadingBar, {
        //     scaleX: 0
        // });

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
        // emitter.on(events.CONTENT_LOADED, this.hide);

    }

    reveal() {

    }

    hide = () => {

        // gsap.to(this.loadingBar, {
        //     delay: 1.5,
        //     duration: 0.5,
        //     ease: "power1.out",
        //     scaleX: 0,
        //     transformOrigin: "center right",
        //     onStart: () => {
        //         emitter.off(events.UPDATE, this.update);
        //     },
        //     onComplete: () => {
        //         gsap.delayedCall(0.5, () => {
        //             this.el.classList.add('loaded');
        //             emitter.emit(events.LOADING_ANIM_COMPLETED);
        //             window.contentLoaded = true;
        //         })
        //     }
        // });

        gsap.to(this.loadingProgress, {
            delay: 1.5,
            duration: 1.0,
            ease: "power1.inOut",
            y: -this.loadingProgress.getBoundingClientRect().height,
            onComplete: () => {
                gsap.delayedCall(0.5, () => {
                    this.el.classList.add('loaded');
                    emitter.emit(events.LOADING_ANIM_COMPLETED);
                    window.contentLoaded = true;
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
        // gsap.set(this.loadingBar, {
        //     scaleX: this.currentScale,
        //     transformOrigin: "center left"
        // });

    }

}