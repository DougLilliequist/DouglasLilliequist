import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

import {gsap} from 'gsap';

export default class LoadingScreen {

    constructor() {

        this.el = document.body.querySelector('.loader');

        this.copyContainer = document.body.querySelector('.loader__copy-container');
        this.title = document.body.querySelector('.loader__title');
        this.subTitle = document.body.querySelector('.loader__sub-title');

        this.title.firstElementChild.innerHTML = "Douglas Lilliequist"
        this.subTitle.firstElementChild.innerHTML = "Creative Technologist"
        
        this.reveal();

        this.initEvents();

    }

    initEvents() {

        emitter.on(events.CONTENT_LOADED, this.hide);

    }

    reveal() {

        gsap.fromTo(this.copyContainer, {
            y: -10,
            opacity: 0.01
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
                this.el.style.display = "none";
                emitter.emit(events.LOADING_SCREEN_HIDDEN);
            }
        });

        hideTl.to(this.copyContainer, {
            duration: 1.0,
            // opacity: 0.001,
            y: 50,
            ease: "power2.in"
        });

        hideTl.to(this.el, {

            duration: 0.5,
            // opacity: 0.0001,
            ease: "power2.inOut"

        });

    }


}