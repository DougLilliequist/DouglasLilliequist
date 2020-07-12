const Emitter = require("tiny-emitter");
import events from "../utils/events";

import {
    gsap
} from "gsap";

class EventEmitter {
    constructor() {
        this.emitter = new Emitter();
        this.initEvents();
    }

    initEvents() {
        window.addEventListener("mousedown", this.onMouseDown, {
            passive: true
        });
        window.addEventListener("mousemove", this.onMouseMove, {
            passive: true
        });
        window.addEventListener("mouseup", this.onMouseUp, {
            passive: true
        });

        window.addEventListener("touchstart", this.onTouchStart, false);
        window.addEventListener("touchmove", this.onTouchMove, false);
        window.addEventListener("touchend", this.onTouchEnd, false);
        window.addEventListener("touchcancel", this.onTouchCancel, false);

        window.addEventListener("resize", this.onResize);

        // gsap.config({
        //     force3D: true
        // });
        // gsap.ticker.fps(60);
        gsap.ticker.add(this.tick);
        //gsap.ticker.fps(60);
        // this.tick();
    }

    onMouseDown = e => {
        this.emitter.emit(events.MOUSE_DOWN, e);
    };

    onMouseMove = e => {
        this.emitter.emit(events.MOUSE_MOVE, e);
    };

    onMouseUp = () => {
        this.emitter.emit(events.MOUSE_UP);
    };

    onTouchStart = e => {
        this.emitter.emit(events.TOUCH_START, e);
    }

    onTouchMove = e => {
        this.emitter.emit(events.TOUCH_MOVE, e);
    }

    onTouchEnd = () => {
        this.emitter.emit(events.TOUCH_END);
    }

    onTouchCancel = () => {
        this.emitter.emit(events.TOUCH_CANCEL);
    }

    tick = (time, deltaTime, frame) => {
        this.emitter.emit(events.UPDATE, {
            deltaTime
        });
    };

    onResize = () => {
        this.emitter.emit(
            events.RESIZE, {
                passive: true
            },
            false
        );
    };
}

const eventEmitter = new EventEmitter();
export default eventEmitter;