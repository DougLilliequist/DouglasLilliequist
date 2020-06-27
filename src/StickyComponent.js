import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

/**
 * Accepts a dom element which will have elasticity applied to it when close enough
 * and emits an event that tells when it's currently hovered
 * 
 * When input is close enough to component, enable update event that emits the component's displaced position
 * which can (and will ultimately be used) by the canvas cursor to ease towards it 
 * 
 */

 export default class StickyComponent {

    constructor({domElement}) {

        this.el = domElement;

        this.hovered = false;

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.wK = 1.0 / this.w;
        this.hK = 1.0 / this.h;

        // this.rect = this.el.getBoundingClientRect();

        this.initForceParams();
        this.initEvents();

    }

    initForceParams() {

        this.inputPos = {

            x: 0,
            y: 0

        }

        this.getInitPos();

        this.currentPos = {
            x: 0,
            y: 0
        };

        this.offsetPos = {
            x: 0,
            y: 0
        }

        this.targetPos = {...this.currentPos};

        this.force = {
            x: 0,
            y: 0
        }

        this.inertia = 0.8;

        this.ease = 0.2;

    }

    getInitPos() {

        this.rect = this.el.getBoundingClientRect();

        const {top, left, width, height} = this.rect;

        this.initPos = {

            x: left + width * 0.5,
            y: top + height * 0.5

        }

    }

    initEvents() {

        emitter.on(events.MOUSE_MOVE, this.onMouseMove);
        emitter.on(events.UPDATE, this.update);
        emitter.on(events.RESIZE, this.onResize);
    }

    removeEvents() {

        emitter.off(events.MOUSE_MOVE, this.onMouseMove);
        emitter.off(events.UPDATE, this.update);
        emitter.off(events.RESIZE, this.onResize);

    }

    onMouseMove = event => {

        this.inputPos.x = event.clientX;
        this.inputPos.y = event.clientY;

    }

    inBounds() {

        const {top, left, width, height} = this.rect;

        const {x, y} = this.inputPos;

        const inBoundsX = x >= left && x <= left + width;
        const inBoundsY = y >= top && y <= top + height;

        return inBoundsX && inBoundsY;

    }

    // inBounds() {

    //     const {top, left, width, height} = this.rect;

    //     const r = ((width * width) + (height * height));
    //     const {x, y} = this.inputPos;
    //     const posSq = (x * x) + (y * y);
    //     console.log(r)
    //     return posSq < r;

    // }

    //standard force
    // updateForce() {

    //     this.targetPos.x = this.hovered ? this.inputPos.x : this.initPos.x;
    //     this.targetPos.y = this.hovered ? this.inputPos.y : this.initPos.y;

    //     this.currentPos.x += (this.targetPos.x - this.currentPos.x) * 0.1;
    //     this.currentPos.y += (this.targetPos.y - this.currentPos.y) * 0.1;

    //     let translateX = (this.currentPos.x - this.initPos.x) * 0.5;
    //     let translateY = (this.currentPos.y - this.initPos.y) * 0.5;
        
    //     this.offsetPos.x = this.initPos.x + translateX;
    //     this.offsetPos.y = this.initPos.y + translateY;
    //     //translate3d needs a constantly updating value
    //     this.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0.0)`;

    // }

    //spring force
    updateForce() {

        this.targetPos.x = this.hovered ? this.inputPos.x : this.initPos.x;
        this.targetPos.y = this.hovered ? this.inputPos.y : this.initPos.y;

        this.force.x += (this.targetPos.x - this.currentPos.x) * 0.05;
        this.force.y += (this.targetPos.y - this.currentPos.y) * 0.05;
        
        this.currentPos.x += this.force.x;
        this.currentPos.y += this.force.y;

        let translateX = (this.currentPos.x - this.initPos.x) * 0.5;
        let translateY = (this.currentPos.y - this.initPos.y) * 0.5;
        
        this.offsetPos.x = this.initPos.x + translateX;
        this.offsetPos.y = this.initPos.y + translateY;

        this.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0.0)`;
        
        this.force.x *= this.inertia;
        this.force.y *= this.inertia;

    }

    //CLEAN UP CONDITIONS
    //MAKE THE CURSOR SWITCH A ONE TIME EVENT
    //MAKE THE COMPONENT POSITION CHANGE INSTANT ON RESIZE
    //COMPUTE COMPONENT DIMENSIONS FOR CIRCLE RADIUS
    //CONSIDER INCREASING THE PADDING / MIN DISTANCE SOMEWHAT TO HAVE MORE RESISTANCE WHEN GOING OUT FROM LINK
    //ALWAYS PASS HOVERED STATE IN EMITTED EVENT

    update = () => {

        //make this to a constant function that sets hovered
        this.hovered = this.inBounds();

        if(this.hovered) {
            // document.body.style.cursor = "pointer";
            emitter.emit(events.HOVERING_STICKY_COMPONENT, {target: this.offsetPos});
        } else {
            // document.body.style.cursor = "default";
            emitter.emit(events.LEAVING_STICKY_COMPONENT);
        }

        this.updateForce();

    }

    onResize = () => {

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.rect = this.el.getBoundingClientRect();
        this.getInitPos();

    }

 }