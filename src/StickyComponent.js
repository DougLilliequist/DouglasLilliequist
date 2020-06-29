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

    constructor({domElement, enable, event = null}) {

        this.el = domElement;
        this.defaultDisplay = this.el.style.display;
        this.event = event;

        this.hovered = false;

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.wK = 1.0 / this.w;
        this.hK = 1.0 / this.h;

        // this.rect = this.el.getBoundingClientRect();

        this.initForceParams();
        this.initEvents();

        this.enable = enable;
        if(this.enable) {
            this.activate();
        } else {
            this.deActivate();
        }

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

        //invisible padding for more resistance when going out from link
        this.hoverScale = 1.5;

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

        emitter.on(events.UPDATE, this.update);
        emitter.on(events.RESIZE, this.onResize);
        // emitter.on(events.MOUSE_MOVE, this.onMouseMove);
        // this.el.addEventListener('mousedown', this.event);

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

        let {top, left, width, height} = this.rect;

        let {x, y} = this.inputPos;

        const inBoundsX = x >= left && x <= left + width;
        const inBoundsY = y >= top && y <= top + height;

        return inBoundsX && inBoundsY;

    }

    //standard force
    updateForce() {

        this.targetPos.x = this.hovered ? this.inputPos.x : this.initPos.x;
        this.targetPos.y = this.hovered ? this.inputPos.y : this.initPos.y;

        this.currentPos.x += (this.targetPos.x - this.currentPos.x) * 0.1;
        this.currentPos.y += (this.targetPos.y - this.currentPos.y) * 0.1;

        let translateX = (this.currentPos.x - this.initPos.x) * 0.5;
        let translateY = (this.currentPos.y - this.initPos.y) * 0.5;
        
        this.offsetPos.x = this.initPos.x + translateX;
        this.offsetPos.y = this.initPos.y + translateY;
        //translate3d needs a constantly updating value
        this.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0.0)`;

    }

    //spring force
    // updateForce() {

    //     this.targetPos.x = this.hovered ? this.inputPos.x : this.initPos.x;
    //     this.targetPos.y = this.hovered ? this.inputPos.y : this.initPos.y;

    //     this.force.x += (this.targetPos.x - this.currentPos.x) * 0.05;
    //     this.force.y += (this.targetPos.y - this.currentPos.y) * 0.05;
        
    //     this.currentPos.x += this.force.x;
    //     this.currentPos.y += this.force.y;

    //     let translateX = (this.currentPos.x - this.initPos.x) * 0.5;
    //     let translateY = (this.currentPos.y - this.initPos.y) * 0.5;
        
    //     this.offsetPos.x = this.initPos.x + translateX;
    //     this.offsetPos.y = this.initPos.y + translateY;

    //     this.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0.0)`;
        
    //     this.force.x *= this.inertia;
    //     this.force.y *= this.inertia;

    // }

    update = () => {

        // if(this.enable) {
            // this.hovered = this.inBounds();
            this.updateForce();

            if(this.hovered) {
                emitter.emit(events.UPDATE_STICKY_TARGET, {target: this.offsetPos, rect: this.rect});
            } else {
                // emitter.emit(events.LEAVING_STICKY_COMPONENT);
            }
        
        // }
    }

    updateHoverState = () => {

        this.hovered = !this.hovered;
        if(this.hovered) {
            emitter.emit(events.HOVERING_STICKY_COMPONENT, {rect: this.rect});
        } else {
            emitter.emit(events.LEAVING_STICKY_COMPONENT);
        }

    }

    activate = () => {

        emitter.on(events.MOUSE_MOVE, this.onMouseMove);
        this.el.addEventListener('mouseenter', this.updateHoverState);
        this.el.addEventListener('mouseleave', this.updateHoverState);
        if(this.event) this.el.addEventListener('mousedown', this.event);
        this.enable = true;
        // this.el.style.display = this.defaultDisplay;
    }

    deActivate = () => {

        emitter.off(events.MOUSE_MOVE, this.onMouseMove);
        this.el.addEventListener('mouseenter', this.updateHoverState);
        this.el.addEventListener('mouseleave', this.updateHoverState);
        if(this.event) this.el.removeEventListener('mousedown', this.event);
        this.enable = false;
        this.hovered = false;
        // this.el.style.display = "none";

    }

    onResize = () => {

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.rect = this.el.getBoundingClientRect();
        this.getInitPos();

    }

 }