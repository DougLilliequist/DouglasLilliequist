const Emitter = require('tiny-emitter');
import events from '../utils/events';

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
        this.tick();

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

        window.requestAnimationFrame(() => this.tick());
        this.emitter.emit(events.UPDATE)

    }

    onResize = () => {

        this.emitter.emit(events.RESIZE, {
            passive: true
        });

    }

}

const eventEmitter = new EventEmitter();
export default eventEmitter;