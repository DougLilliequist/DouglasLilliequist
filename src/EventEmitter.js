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
        // window.addEventListener('wheel', this.onScroll, {
        //     passive: false
        // });
        window.addEventListener("resize", this.onResize);

        gsap.ticker.add(this.tick);
        //gsap.ticker.fps(60);
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

    // onScroll = (e) => {

    //     this.emitter.emit(events.SCROLLING, e, false);

    // }

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