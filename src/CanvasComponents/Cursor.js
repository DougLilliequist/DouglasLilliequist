import eventEmitter from '../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../utils/events';

import {gsap} from 'gsap';

/**
 * Make this available if not using mobile
 */

export default class Cursor {

    constructor() {

        this.canvas = document.querySelector('.main-cursor');

        this.width = this.canvas.width = window.innerWidth;
        
        this.height = this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext('2d');

        this.initCursor();

        this.initCursorArrows();
        
        this.initEvents();

    }

    initCursor() {

        this.position = {

            x: 0,
            y: 0,

        }

        this.prevPosition = {

            x: 0,
            y: 0

        }

        this.delta = {

            x: 0,
            y: 0

        }

        this.target = {

            x: 0,
            y: 0

        }
        
        this.inScrollMode = false;

        this.defaultRadius = 10.0;

        this.scrollModeRadius = 20.0;

        this.radius = this.defaultRadius;

        this.strokeWidth = 1.5;

        this.startAngle = 0;

        this.endAngle = Math.PI * 2.0;

        this.ease = 0.35;

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

        this.inputScale = 0.0;

    }

    initEvents() {

        emitter.on(events.MOUSE_DOWN, this.onMouseDown);
        emitter.on(events.MOUSE_MOVE, this.onMouseMove);
        emitter.on(events.MOUSE_UP, this.onMouseUp);
        emitter.on(events.UPDATE, this.update);
        emitter.on(events.RESIZE, this.onResize);

    }

    onMouseDown = (e) => {

        this.inScrollMode = true;
        this.prevPosition.x = this.target.x;
        this.prevPosition.y = this.target.y;
        this.animateScrollMode();

    }

    onMouseMove = (e) => {

        this.target.x = e.clientX;
        this.target.y = e.clientY;
        this.inputScale += 0.1;

    }

    onMouseUp = () => {

        this.restore();

    }

    //include kill animation
    animateScrollMode() {

        if(this.inScrollMode) {

            gsap.to(this, {
                duration: 0.2,
                radius: this.scrollModeRadius,
                cursorArrowAlpha: 1.0
            });

            gsap.to(this.arrowOriginOffset, {
                duration: 0.2,
                y: 10.0
            })

        }

    }

    restore() {

        gsap.to(this, {
            duration: 0.2,
            radius: this.defaultRadius,
            cursorArrowAlpha: 0.0
        });

        gsap.to(this.arrowOriginOffset, {
            duration: 0.2,
            y: 4.0,
            onComplete: () => {
                this.inScrollMode = false;
            }
        })

    }

    drawCursorArrows() {

        //top arrow
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(${0.0}, ${0.0}, ${0.0}, ${this.cursorArrowAlpha})`;
        
        this.ctx.moveTo(this.position.x - 4, this.position.y - (this.radius + this.arrowOriginOffset.y));
        
        this.ctx.lineTo(this.position.x + 4, this.position.y - (this.radius + this.arrowOriginOffset.y));
        this.ctx.lineTo(this.position.x, this.position.y - (this.radius + this.arrowOriginOffset.y + 4.0));
        
        this.ctx.fill();
        this.ctx.closePath();

        // //bottom arrow
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(${0.0}, ${0.0}, ${0.0}, ${this.cursorArrowAlpha})`;
        
        this.ctx.moveTo(this.position.x - 4, this.position.y + (this.radius + this.arrowOriginOffset.y));
        this.ctx.lineTo(this.position.x + 4, this.position.y + (this.radius + this.arrowOriginOffset.y));
        this.ctx.lineTo(this.position.x, this.position.y + (this.radius + this.arrowOriginOffset.y + 4.0));
        
        this.ctx.fill();
        this.ctx.closePath();

    }

    drawCursorCircle() {

        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, false);
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.stroke();
        this.ctx.closePath();

    }

    draw() {

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawCursorCircle();
        this.drawCursorArrows();
        
    }

    update = () => {
        
        this.position.x += (this.target.x - this.position.x) * this.ease;
        this.position.y += (this.target.y - this.position.y) * this.ease;
        // this.position.x = this.target.x;
        // this.position.y = this.target.y;

        this.delta.x = this.position.x - this.prevPosition.x;
        this.delta.y = this.position.y - this.prevPosition.y;

        this.inputScale *= 0.93;
        this.inputScale = Math.max(0.0001, this.inputScale);

        this.draw();

        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;

    }

    onResize = () => {

        //consider setting this on a timeout event?
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

    }

}