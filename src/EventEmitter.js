const Emitter = require('tiny-emitter');
import events from '../utils/events';

class EventEmitter {

    constructor() {

        this.initEvents();
        this.emitter = new Emitter();

    }

    initEvents() {

        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('resize', this.onResize);

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

    onResize = () => {

        this.emitter.emit(events.RESIZE, {
            passive: true
        });

    }

}

const eventEmitter = new EventEmitter();
export default eventEmitter;