import eventEmitter from '../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../utils/events';

import {
    gsap
} from 'gsap';
import globals from '../../utils/globals.js';

/**
 * Make this available if not using mobile
 */

export default class Cursor {

    constructor() {

        this.dpr = Math.min(2.0, window.devicePixelRatio);

        this.canvas = document.querySelector('.main-cursor');

        this.width = this.canvas.width = window.innerWidth * this.dpr;

        this.height = this.canvas.height = window.innerHeight * this.dpr;

        this.ctx = this.canvas.getContext('2d');

        this.ctx.scale(this.dpr, this.dpr);

        this.initCursor();

        this.initCursorArrows();

        this.initCta();

        this.initEvents();

    }

    initCursor() {

        this.position = {

            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,

        }

        this.prevPosition = {

            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,

        }

        this.delta = {

            x: 0,
            y: 0

        }

        this.inputPos = {
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.2,
        }

        this.target = {

            x: 0,
            y: 0

        }

        this.inScrollMode = false;

        this.inViewProjectMode = false;

        this.defaultRadius = 15.0;

        this.scrollModeRadius = 22.0;

        this.hoverRadius = 1.0;

        this.radius = this.defaultRadius;

        // this.strokeWidth = 0.5;
        this.strokeWidth = 0.5;

        this.startAngle = 0;

        this.strokeAlpha = 1.0;

        this.fillAlpha = 0.0;

        this.visible = true;

        this.hoveringSticky = false;

        this.endAngle = Math.PI * 2.0;

        this.ease = 0.2;

    }

    initCursorArrows() {

        this.arrowOriginOffset = {

            x: 4,
            y: 4

        }

        this.arrowLocalPos = {

            x: 4,
            y: 9

        }

        this.cursorArrowAlpha = 0.0;

        this.inputPhase = 0.0;

        this.inputDirection = 0.0;

    }

    initCta() {

        this.holdMessage = this.createCanvasText({
            word: "Hold",
            fontSize: 12
        });
        this.dragMessage = this.createCanvasText({
            word: "Drag",
            fontSize: 12
        });

        this.ctaPosOffset = {
            x: 0,
            y: 0
        };

        this.ctaTextAlpha = 1.0;

        this.removeCTA = false;

        this.drawMessage = false;

        this.inputTravel = 0;

        this.inputTravelThreshold = 100;

    }

    createCanvasText({
        word,
        fontSize
    }) {

        this.ctx.font = `${fontSize}px Mulish`;
        const messageBounds = this.ctx.measureText(word);
        return {
            word,
            width: messageBounds.width,
            fontSize
        };

    }

    initEvents() {

        emitter.on(events.LOADING_ANIM_COMPLETED, this.reveal)
        emitter.on(events.SHOW_CLICKDRAG_CTA, this.showCTAText);
        emitter.on(events.HIDE_CLICKDRAG_CTA, this.hideCTAText);

        emitter.on(events.MOUSE_MOVE, this.onMouseMove);
        emitter.on(events.ENTER_SCROLL_MODE, this.onMouseDown);
        emitter.on(events.EXIT_SCROLL_MODE, this.onMouseUp);

        // emitter.on(events.HOVERING_STICKY_COMPONENT, this.animateHoverMode);
        // emitter.on(events.LEAVING_STICKY_COMPONENT, this.animateLeaveHoverMode);
        // emitter.on(events.HOVERING_LINK, this.animateHoverMode);
        // emitter.on(events.LEAVING_LINK, this.animateLeaveHoverMode);
        // emitter.on(events.)

        emitter.on(events.UPDATE_STICKY_TARGET, this.updateStickyTarget);
        emitter.on(events.LINK_SELECTED, this.onLinkSelected);

        emitter.on(events.HOVERING_NAV_LINK, this.updateNavlinkState);

        emitter.on(events.SHOW_PROJECT, () => this.inViewProjectMode = true);
        emitter.on(events.CLOSE_PROJECT, () => this.inViewProjectMode = false);

        emitter.on(events.UPDATE, this.update);
        emitter.on(events.RESIZE, this.onResize);

    }

    onMouseDown = () => {

        this.inScrollMode = true;

        // if(this.hoveringSticky === false) {
        // this.prevPosition.x = this.target.x;
        // this.prevPosition.y = this.target.y;
        // }

        this.animateScrollMode();

    }

    onMouseMove = (event) => {

        if (this.visible === false) {
            this.visible = true;
            this.restoreAlpha();
        }

        this.inputPos.x = event.clientX;
        this.inputPos.y = event.clientY;

        if (this.inScrollMode) {

            this.inputTravel = this.inputTravel < this.inputTravelThreshold ? this.inputTravel + 1 : this.inputTravelThreshold;
            if (this.inputTravel >= this.inputTravelThreshold) {
                this.removeCTAText();
            }

        }

    }

    onMouseUp = () => {

        this.restore();

    }

    //include kill animation
    //make this to TL animation
    animateScrollMode() {

        if (this.inScrollMode) {

            if (this.scrollModeAnim) this.scrollModeAnim.kill();

            this.scrollModeAnim = gsap.timeline({});

            this.scrollModeAnim.to(this, {
                duration: 0.2,
                radius: this.scrollModeRadius,
                cursorArrowAlpha: 0.5,
                ease: "power1.out"
            }, "<");

            this.scrollModeAnim.to(this.arrowOriginOffset, {
                duration: 0.2,
                y: 10,
                ease: "power1.out"
            }, "<");

            this.scrollModeAnim.fromTo(this.ctaPosOffset, {
                y: 24
            }, {
                y: 0,
                duration: 0.5,
                ease: "power1.out"
            }, "<");

        }

    }

    restore = () => {

        if (this.restoreAnim) this.restoreAnim.kill();

        this.restoreAnim = gsap.timeline({
            onComplete: () => this.inScrollMode = false
        });

        this.restoreAnim.to(this, {
            duration: 0.2,
            radius: this.defaultRadius,
            ctaTextAlpha: this.removeCTA ? 0.0 : 1.0,
            cursorArrowAlpha: 0.0,
            ease: "power1.out"
        }, "<");

        this.restoreAnim.to(this.arrowOriginOffset, {
            duration: 0.2,
            y: 4,
            ease: "power1.out"
        }, "<");

    }

    reveal = () => {

        const revealAnim = gsap.timeline({});
        revealAnim.fromTo(this, {
            radius: 0,
            ctaTextAlpha: 0
        }, {
            duration: 0.2,
            radius: this.defaultRadius,
            ctaTextAlpha: 1.0,
            ease: "circ.out"
        });

    }

    animateHoverMode = (event) => {

        if (this.hoveringSticky === false) {

            this.hoveringSticky = true;
            const {
                rect
            } = event;
            const {
                width,
                height
            } = rect;

            // this.hoverRadius = Math.sqrt((width * width) + (height * height)) * 0.3115;
            this.hoverRadius = Math.sqrt((width * width) + (height * height)) * 0.35;

            if (this.hoverModeAnim) this.hoverModeAnim.kill();
            this.hoverModeAnim = gsap.to(this, {
                duration: 0.4,
                ease: "power1.out",
                radius: this.hoverRadius,
                onStart: () => {
                    if (this.visible === false) return;
                    this.hideCTAText();
                    this.strokeAlpha = 0;
                    this.fillAlpha = 1;
                }
            });

        }

    }

    //fade out cursor here
    animateLeaveHoverMode = () => {

        if (this.hoveringSticky) {
            this.hoveringSticky = false;
            if (this.leaveHoverModeAnim) this.leaveHoverModeAnim.kill();
            this.leaveHoverModeAnim = gsap.to(this, {
                duration: 0.4,
                ease: "power1.out",
                radius: this.defaultRadius,
                onStart: () => {

                    if (this.visible === false) return;
                    this.showCTAText();
                    this.strokeAlpha = 1;
                    this.fillAlpha = 0;

                }

            });

        }

    }

    onLinkSelected = () => {
        gsap.to(this, {
            duration: 0.2,
            ease: "power1.out",
            alpha: 0.0,
            radius: this.hoverRadius * 1.2,
            onComplete: () => {
                this.visible = false;
            }
        });
    }

    updateNavlinkState = (state) => {

        if (this.navlinkHoverAnim) this.navlinkHoverAnim.kill();

        if (state === true) {

            this.navlinkHoverAnim = gsap.to(this, {
                duration: 0.2,
                ease: "power1.out",
                radius: 0,
                onStart: () => {
                    this.hideCTAText();
                }
            })

        } else {

            this.navlinkHoverAnim = gsap.to(this, {
                duration: 0.2,
                ease: "power1.in",
                radius: this.defaultRadius,
                onComplete: () => {
                    this.showCTAText();
                }
            })

        }

    }

    updateStickyTarget = (event) => {

        const {
            target
        } = event;
        this.target.x = target.x;
        this.target.y = target.y;

    }

    restoreAlpha() {

        gsap.to(this, {
            duration: 0.2,
            ease: "power1.out",
            alpha: 1.0,
            onComplete: () => {
                this.visible = true;
            }

        });

    }

    drawCursorArrows() {

        //top arrow
        this.ctx.beginPath();
        const topArrowAlpha = Math.min(1, this.cursorArrowAlpha + (this.inputDirection > 0 ? this.inputPhase : 0));
        this.ctx.fillStyle = `rgba(${0.0}, ${0.0}, ${0.0}, ${topArrowAlpha})`;

        const topArrowScale = Math.min(2, this.inputDirection > 0 ? this.inputPhase : 0);
        this.ctx.moveTo(this.position.x - (4 + topArrowScale), this.position.y - (this.radius + this.arrowOriginOffset.y));
        this.ctx.lineTo(this.position.x + (4 + topArrowScale), this.position.y - (this.radius + this.arrowOriginOffset.y));
        this.ctx.lineTo(this.position.x, this.position.y - (this.radius + this.arrowOriginOffset.y + 5.0 + topArrowScale));

        this.ctx.fill();
        this.ctx.closePath();

        // //bottom arrow
        this.ctx.beginPath();
        const bottomArrowAlpha = Math.min(1.0, this.cursorArrowAlpha + (this.inputDirection < 0 ? this.inputPhase : 0));
        this.ctx.fillStyle = `rgba(${0.0}, ${0.0}, ${0.0}, ${bottomArrowAlpha})`;

        const bottomArrowScale = Math.min(2, this.inputDirection < 0 ? this.inputPhase : 0);
        this.ctx.moveTo(this.position.x - (4 + bottomArrowScale), this.position.y + (this.radius + this.arrowOriginOffset.y));
        this.ctx.lineTo(this.position.x + (4 + bottomArrowScale), this.position.y + (this.radius + this.arrowOriginOffset.y));
        this.ctx.lineTo(this.position.x, this.position.y + (this.radius + this.arrowOriginOffset.y + 5 + bottomArrowScale));

        this.ctx.fill();
        this.ctx.closePath();

    }

    drawCursorCircle() {

        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(${0.0},${0.0},${0.0}, ${this.fillAlpha})`;
        this.ctx.strokeStyle = `rgba(${0.0},${0.0},${0.0}, ${this.strokeAlpha})`;
        this.ctx.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, false);
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

    }

    drawCTAText() {

        const message = this.inScrollMode ? this.dragMessage : this.holdMessage;
        this.ctx.fillStyle = `rgba(${0.0},${0.0},${0.0}, ${this.ctaTextAlpha})`;
        this.ctx.font = `${12}px Arial`;
        this.ctx.textBaseline = "middle";
        // this.ctx.fillText(message.word, this.position.x + 40, this.position.y + this.ctaPosOffset.y);
        this.ctx.fillText(message.word, this.position.x - 60, this.position.y + this.ctaPosOffset.y);

    }

    showCTAText = () => {

        if (this.removeCTA || this.inViewProjectMode) return;
        this.drawMessage = true;
        gsap.to(this, {
            duration: 0.5,
            ctaTextAlpha: 1,
            ease: "power1.out"
        });
    }

    hideCTAText = () => {

        if (this.removeCTA || this.inViewProjectMode) return;
        this.drawMessage = false;
        gsap.to(this, {
            duration: 0.5,
            ctaTextAlpha: 0,
            ease: "power1.out"
        });
    }

    removeCTAText() {

        if (this.removeCTA === false) {
            this.removeCTA = true;
            gsap.to(this, {
                duration: 0.5,
                ctaTextAlpha: 0,
                ease: "power1.out"
            });
        }
    }

    draw() {

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawCursorCircle();
        if (this.inScrollMode) this.drawCursorArrows();

        if(globals.CURRENT_VIEW !== "work") return;
        if (this.drawMessage) this.drawCTAText();

    }

    update = () => {

        this.position.x += (this.target.x - this.position.x) / 6.0;
        this.position.y += (this.target.y - this.position.y) / 6.0;

        // this.position.x = this.target.x;
        // this.position.y = this.target.y;
        if (this.hoveringSticky === false) {
            this.target.x = this.inputPos.x;
            this.target.y = this.inputPos.y;
        }

        this.delta.x = this.position.x - this.prevPosition.x;
        this.delta.y = this.position.y - this.prevPosition.y;
        this.inputDirection = Math.sign(this.delta.y) * -1; //coordinates are flipped in canvas

        this.updateInputphase();

        this.draw();

        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;

    }

    updateInputphase() {

        if (this.inScrollMode) this.inputPhase += Math.abs(this.delta.y) * 0.01;
        this.inputPhase *= this.inputPhase < 0.001 ? 0.0 : 0.90;

    }

    onResize = () => {

        this.width = this.canvas.width = window.innerWidth * this.dpr;
        this.height = this.canvas.height = window.innerHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);

    }

}