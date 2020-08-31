import gif from '../static/img/*.gif';
import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

export default class NoMobileCTA {

    constructor() {

        this.el = document.createElement('div');
        this.el.classList.add('no-mobile-cta');

        const twitterLink = document.createElement('a');
        twitterLink.href = "https://twitter.com/DougLilliequist";
        twitterLink.innerText = "visit my twitter 👀";
        twitterLink.classList.add('no-mobile-cta__contact-link');

        const emailLink = document.createElement('a');
        emailLink.href = "mailto:douglas@adventureclub.io";
        emailLink.innerText = "or say hello 👋";
        emailLink.target = "_blank";
        emailLink.classList.add('no-mobile-cta__contact-link');
        // this.el.appendChild(twitterLink);

        const greetingGif = new Image();
        greetingGif.classList.add('no-mobile-cta__greeting-gif');

        greetingGif.crossOrigin = "*";
        greetingGif.onload = () => {
            this.el.appendChild(greetingGif);
            this.el.appendChild(twitterLink);
            this.el.appendChild(emailLink);
        }
        greetingGif.src = gif.gaben;
        document.body.appendChild(this.el);

    }

    initEvents() {

        emitter.on(events.LOADING_ANIM_COMPLETED, () => {
            document.body.appendChild(this.el);
        });

    }

}