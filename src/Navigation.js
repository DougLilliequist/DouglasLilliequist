import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events';

class Navigation {

    constructor() {

        this.el = document.querySelector('.navigation__links');
        this.initEvents();

    }

    initEvents() {

        window.hoveringLink = false;

        this.el.childNodes.forEach((link) => {

            link.addEventListener('mouseenter', this.onLinkHover);
            link.addEventListener('mouseleave', this.onLinkLeave);

        })
        
    }

    onLinkHover = () => {

        window.hoveringLink = true;
        emitter.emit(events.HOVERING_LINK);

    }

    onLinkLeave = () => {

        window.hoveringLink = false;
        emitter.emit(events.LEAVING_LINK);

    }

}

const navigation = new Navigation();
export default navigation;