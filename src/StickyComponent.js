import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';
import {gsap} from 'gsap';

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

        this.initForceParams();
        this.initEvents();

        if(enable) {
            this.enable = enable;
            this.activate();
        } else {
            this.enable = false;
            this.deActivate();
        }

    }

    initForceParams() {

        this.inputPos = {

            x: 0,
            y: 0

        }

        this.initPos = {
            x: 0,
            y: 0
        }

        // this.getInitPos();
        this.currentPos = {
            x: 0,
            y: 0
        }

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

        this.ease = 0.125;

    }

    getInitPos() {

        this.rect = this.el.getBoundingClientRect();

        const {top, left, width, height} = this.rect;

        this.initPos = {

            x: left + width * 0.5,
            y: top + height * 0.5

        }

        this.currentPos = {...this.initPos};

    }

    initEvents() {

        emitter.on(events.UPDATE, this.update);
        emitter.on(events.RESIZE, this.onResize);
        // emitter.on(events.ENTER_SCROLL_MODE, this.deActivate);
        // emitter.on(events.EXIT_SCROLL_MODE, this.activate);

        if(this.enable) {
            this.activate();
        } else {
            this.deActivate();
        }

    }

    removeEvents() {

        emitter.off(events.UPDATE, this.update);
        emitter.off(events.RESIZE, this.onResize);
        // emitter.off(events.ENTER_SCROLL_MODE, this.deActivate);
        // emitter.off(events.EXIT_SCROLL_MODE, this.activate);

    }

    onMouseMove = event => {

        this.inputPos.x = event.clientX;
        this.inputPos.y = event.clientY;

    }

    //redundant?
    inBounds() {

        let {top, left, width, height} = this.rect;

        let {x, y} = this.inputPos;

        const inBoundsX = x >= left && x <= left + width;
        const inBoundsY = y >= top && y <= top + height;

        return inBoundsX && inBoundsY;

    }

    //standard ease
    updateForce() {

        this.targetPos.x = this.hovered ? this.inputPos.x : this.initPos.x;
        this.targetPos.y = this.hovered ? this.inputPos.y : this.initPos.y;

        this.currentPos.x += (this.targetPos.x - this.currentPos.x) * this.ease;
        this.currentPos.y += (this.targetPos.y - this.currentPos.y) * this.ease;

        //counter-intuitive approach: given that the origin is at the corner
        //when using say, a mouse's position: the pixel position can be assigned
        //to translate3d as a direct position of a given dom element.
        //With this knowledge in mind, by subtracting with the dom elements initial position
        //we move the element to the top corner, thus we get a correct vector in which we use
        //for the translation
        let translateX = (this.currentPos.x - this.initPos.x) * 0.5;
        let translateY = (this.currentPos.y - this.initPos.y) * 0.5;
        
        //final offseted position for component, used as target for i.e cursors
        this.offsetPos.x = this.initPos.x + translateX;
        this.offsetPos.y = this.initPos.y + translateY;

        //(NOTE)translate3d needs a constantly updating value
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
        this.updateForce();
        if(this.hovered) emitter.emit(events.UPDATE_STICKY_TARGET, {target: this.offsetPos, rect: this.rect});
        // }
         
    }

    applyHoverState = () => {
        window.hoveringLink = this.hovered = true;
        document.body.style.cursor = "pointer";
        emitter.emit(events.HOVERING_STICKY_COMPONENT, {rect: this.rect});
    }

    removeHoverState = () => {
        window.hoveringLink = this.hovered = false;
        document.body.style.cursor = "default";
        emitter.emit(events.LEAVING_STICKY_COMPONENT);
    }

    activate = () => {

        this.el.style.display = this.defaultDisplay;
        this.getInitPos();
        emitter.on(events.MOUSE_MOVE, this.onMouseMove);
        this.el.addEventListener('mouseenter', this.applyHoverState);
        this.el.addEventListener('mouseleave', this.removeHoverState);
        if(this.event !== null) this.el.addEventListener('mousedown', this.event);
        this.enable = true;
    }

    deActivate = () => {

        this.el.style.display = "none";
        emitter.off(events.MOUSE_MOVE, this.onMouseMove);
        this.el.removeEventListener('mouseenter', this.applyHoverState);
        this.el.removeEventListener('mouseleave', this.removeHoverState);
        if(this.event !== null) this.el.removeEventListener('mousedown', this.event);
        this.enable = false;
        if(this.hovered) this.removeHoverState();
        this.hovered = false;

    }

    onResize = () => {
        
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.rect = this.el.getBoundingClientRect();
        this.getInitPos();

    }

 }