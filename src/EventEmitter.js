const Emitter = require('tiny-emitter');
import events from '../utils/events';

import {
    gsap
} from 'gsap';

class EventEmitter {

    constructor() {

        this.emitter = new Emitter();
        this.initEvents();

    }

    initEvents() {

        window.addEventListener('mousedown', this.onMouseDown, {
            passive: true
        });
        window.addEventListener('mousemove', this.onMouseMove, {
            passive: true
        });
        window.addEventListener('mouseup', this.onMouseUp, {
            passive: true
        });
        // window.addEventListener('wheel', this.onScroll, {
        //     passive: false
        // });
        window.addEventListener('resize', this.onResize);

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

    // onScroll = (e) => {

    //     this.emitter.emit(events.SCROLLING, e, false);

    // }   

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