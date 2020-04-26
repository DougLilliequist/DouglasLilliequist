const Emitter = require('tiny-emitter');
import events from '../utils/events';

import {gsap} from 'gsap';

class EventEmitter {

    constructor() {

        this.emitter = new Emitter();
        this.initEvents();

    }

    initEvents() {

        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('resize', this.onResize);
        // gsap.ticker.fps(60);
        gsap.ticker.add(this.tick);

    }

    onMouseDown = (e) => {

        this.emitter.emit(events.MOUSE_DOWN, e, false);

    }

    onMouseMove = (e) => {

        this.emitter.emit(events.MOUSE_MOVE, e, false);

    }

    onMouseUp = () => {

        this.emitter.emit(events.MOUSE_UP, false);

    }

    tick = () => {

        this.emitter.emit(events.UPDATE)

    }

    onResize = () => {

        this.emitter.emit(events.RESIZE, {
            passive: true
        }, false);

    }

}

const eventEmitter = new EventEmitter();
export default eventEmitter;