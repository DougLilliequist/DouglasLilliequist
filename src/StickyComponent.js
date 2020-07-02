import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

/**
 * 
 * Accepts a dom element which will have easing / elasticity applied to it when hovering
 * and emits an event that tells when it's currently hovered and supplies it's current position
 * which can be used for custom cursor animations
 * 
 */

export default class StickyComponent {

    constructor({
        domElement,
        enable,
        event = null
    }) {

        this.el = domElement;
        this.event = event;

        this.hovered = false;
        this.inBounds = false;
        this.onMobile = window.isMobile;

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.wK = 1.0 / this.w;
        this.hK = 1.0 / this.h;

        this.initForceParams();
        this.initEvents();

        if (enable) {
            this.activate();
        } else {
            this.deActivate();
        }

    }

    initForceParams() {

        this.initPos = {
            x: 0,
            y: 0
        }

        this.currentPos = {
            x: 0,
            y: 0
        }

        this.targetPos = {
            x: 0,
            y: 0
        };

        this.offsetPos = {
            x: 0,
            y: 0
        }

        this.inputPos = {

            x: 0,
            y: 0

        }

        //used for spring force
        //---------------------
        // this.force = {
        //     x: 0,
        //     y: 0
        // }

        // this.inertia = 0.8;
        //---------------------

        this.ease = 0.125;

        this.getInitPos();

    }

    getInitPos() {

        this.rect = this.el.getBoundingClientRect();

        const {
            top,
            left,
            width,
            height
        } = this.rect;

        this.initPos = {

            x: left + width * 0.5,
            y: top + height * 0.5

        }

        this.currentPos = {
            ...this.initPos
        };

    }

    initEvents() {

        emitter.on(events.MOUSE_MOVE, this.onMouseMove);
        emitter.on(events.UPDATE, this.update);
        emitter.on(events.RESIZE, this.onResize);
        if (this.event !== null) this.el.addEventListener('mousedown', this.event);
        if (this.event !== null && this.onMobile) this.el.addEventListener('touchstart', this.event);
        this.el.addEventListener('mouseenter', this.applyHoverState);
        this.el.addEventListener('mouseleave', this.removeHoverState);

    }

    removeEvents() {

        emitter.off(events.MOUSE_MOVE, this.onMouseMove);
        emitter.off(events.UPDATE, this.update);
        emitter.off(events.RESIZE, this.onResize);
        if (this.event !== null) this.el.removeEventListener('mousedown', this.event);
        if (this.event !== null && this.onMobile) this.el.removeEventListener('touchstart', this.event);
        this.el.removeEventListener('mouseenter', this.applyHoverState);
        this.el.removeEventListener('mouseleave', this.removeHoverState);

    }

    onMouseMove = event => {

        this.inputPos.x = event.clientX;
        this.inputPos.y = event.clientY;

    }

    //redundant?
    // withinBounds() {

    //     let {
    //         top,
    //         left,
    //         width,
    //         height
    //     } = this.rect;

    //     let {
    //         x,
    //         y
    //     } = this.inputPos;

    //     const inBoundsX = x >= left && x <= left + width;
    //     const inBoundsY = y >= top && y <= top + height;

    //     return inBoundsX && inBoundsY;

    // }

    //standard ease
    updateForce() {

        this.targetPos.x = this.hovered ? this.inputPos.x : this.initPos.x;
        this.targetPos.y = this.hovered ? this.inputPos.y : this.initPos.y;

        this.currentPos.x += (this.targetPos.x - this.currentPos.x) * 0.125;
        this.currentPos.y += (this.targetPos.y - this.currentPos.y) * 0.125;

        //counter-intuitive, but working approach:
        //Given that the origin is at the top-left corner (0, 0),
        //when using say, a mouse's position: the pixel position can be assigned to translate3d as a direct position of a given dom element.
        //With this knowledge in mind, by subtracting with the dom elements initial position
        //we move the element to the origin, thus any additional offsets we apply will be a vector in which we use
        //for the translation
        let translateX = (this.currentPos.x - this.initPos.x) * 0.5;
        let translateY = (this.currentPos.y - this.initPos.y) * 0.5;
        this.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0.0)`;

        //final offseted position for component, used as target for i.e cursors
        this.offsetPos.x = this.initPos.x + translateX;
        this.offsetPos.y = this.initPos.y + translateY;

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

        if (this.onMobile) return;
        if (this.enable) this.updateForce();
        if (this.hovered) emitter.emit(events.UPDATE_STICKY_TARGET, {
            target: this.offsetPos,
            rect: this.rect
        });

    }

    applyHoverState = () => {

        if (this.enable === false) return;
        window.hoveringLink = this.hovered = true;
        emitter.emit(events.HOVERING_STICKY_COMPONENT, {
            rect: this.rect
        });
    }

    removeHoverState = () => {

        if (this.enable === false) return;
        window.hoveringLink = this.hovered = false;
        emitter.emit(events.LEAVING_STICKY_COMPONENT);

    }

    activate = () => {

        this.enable = true;
        this.el.classList.remove('deactivated');

    }

    deActivate = () => {

        if (this.hovered) this.removeHoverState();
        this.enable = false;
        this.hovered = false;
        this.el.classList.add('deactivated');

    }

    onResize = () => {

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.rect = this.el.getBoundingClientRect();
        this.getInitPos();

    }

}