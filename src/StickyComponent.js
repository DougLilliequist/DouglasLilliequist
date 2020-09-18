import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

import {
    gsap
} from 'gsap';

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
        event = null,
        includeHoverAnim = false,
        defaultColor = "#000000"
    }) {

        this.el = domElement;
        this.event = event;

        this.hovered = false;
        this.inBounds = false;
        this.onMobile = window.isMobile;
        this.includeHoverAnim = includeHoverAnim;
        this.defaultColor = defaultColor;

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

        this.el.addEventListener('mousedown', this.onClick);
        this.el.addEventListener('touchstart', this.onClick);
        if (this.event !== null && this.onMobile) this.el.addEventListener('touchstart', this.event);

        if (this.onMobile) return;
        this.el.addEventListener('mouseenter', this.applyHoverState);
        this.el.addEventListener('mouseleave', this.removeHoverState);

    }

    removeEvents() {

        emitter.off(events.MOUSE_MOVE, this.onMouseMove);
        emitter.off(events.UPDATE, this.update);
        emitter.off(events.RESIZE, this.onResize);

        this.el.removeEventListener('mousedown', this.onClick);
        if (this.event !== null && this.onMobile) this.el.removeEventListener('touchstart', this.event);

        if (this.onMobile) return;
        this.el.removeEventListener('mouseenter', this.applyHoverState);
        this.el.removeEventListener('mouseleave', this.removeHoverState);

    }

    onMouseMove = event => {

        this.inputPos.x = event.clientX;
        this.inputPos.y = event.clientY;

    }

    //standard ease
    updateForce() {

        const {
            targetPos,
            hovered,
            inputPos,
            initPos,
        } = this;

        targetPos.x = hovered ? inputPos.x : initPos.x;
        targetPos.y = hovered ? inputPos.y : initPos.y;

        this.currentPos.x += (targetPos.x - this.currentPos.x) * 0.125;
        this.currentPos.y += (targetPos.y - this.currentPos.y) * 0.125;

        //counter-intuitive, but working approach:
        //Given that the origin is at the top-left corner (0, 0),
        //when using say, a mouse's position: the pixel position can be assigned to translate3d as a direct position of a given dom element.
        //With this knowledge in mind, by subtracting with the dom elements initial position
        //we move the element to the origin, thus any additional offsets we apply will be a vector in which we use
        //for the translation
        let translateX = (this.currentPos.x - initPos.x) * 0.25;
        let translateY = (this.currentPos.y - initPos.y) * 0.25;
        this.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`;

        //final offseted position for component, used as target for i.e cursors
        this.offsetPos.x = initPos.x + translateX;
        this.offsetPos.y = initPos.y + translateY;

    }

    update = () => {

        if (this.onMobile) return;
        this.updateForce();
        if (this.enable === false) return;
        if (this.hovered) emitter.emit(events.UPDATE_STICKY_TARGET, {
            target: this.offsetPos,
            rect: this.rect
        });

    }

    applyHoverState = () => {

        if (this.enable === false) return;
        window.hoveringLink = this.hovered = true;
        document.body.classList.add('pointer');
        emitter.emit(events.HOVERING_STICKY_COMPONENT, {
            rect: this.rect
        });
        this.el.classList.add('sticky-hovered');

    }

    removeHoverState = () => {

        if (this.enable === false) return;
        document.body.classList.remove('pointer');
        window.hoveringLink = this.hovered = false;
        emitter.emit(events.LEAVING_STICKY_COMPONENT);
        this.el.classList.remove('sticky-hovered');

    }

    onClick = () => {

        // emitter.emit(events.LINK_SELECTED);
        // if (this.hovered) this.removeHoverState();
        if (this.event !== null) this.event();

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