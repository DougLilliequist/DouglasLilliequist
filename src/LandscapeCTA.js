import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

export default class LanscapeCTA {

    constructor() {

        this.el = document.createElement('div');
        this.el.classList.add('landscape-cta');

        this.ctaText = document.createElement('h1');
        this.ctaText.classList.add('landscape-cta__text');
        this.ctaText.innerText = "Rotate to lanscape";
        this.el.appendChild(this.ctaText);

        this.initEvents();

    }

    initEvents() {

        emitter.on(events.LOADING_ANIM_COMPLETED, () => {
            document.body.appendChild(this.el);
        });

    }

}