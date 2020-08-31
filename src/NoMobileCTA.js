import gif from '../static/img/*.gif';
import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

export default class NoMobileCTA {

    constructor() {

        this.el = document.createElement('div');
        this.el.classList.add('no-mobile-cta');

        // this.ctaText = document.createElement('div');
        // this.ctaText.classList.add('landscape-cta__text');
        // this.ctaText.innerHTML = "<img src = " >

        const greetingGif = new Image();
        greetingGif.classList.add('greeting-gif');

        greetingGif.crossOrigin = "*";
        greetingGif.onload = () => {
            this.el.appendChild(greetingGif);
        }
        greetingGif.src = gif.gaben;
        document.body.appendChild(greetingGif);
        document.body.appendChild(this.el);

        // this.initEvents();

    }

    initEvents() {

        emitter.on(events.LOADING_ANIM_COMPLETED, () => {
            document.body.appendChild(this.el);
        });

    }

}