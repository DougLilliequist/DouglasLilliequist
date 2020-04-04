import eventEmitter from '../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../utils/events';

export default class ScrollCircle {

    constructor(el) {

        this.canvas = el.querySelector('.scroll-circle');
        
        this.width = this.canvas.width = 300;
        
        this.height = this.canvas.height = 300;

        this.ctx = this.canvas.getContext('2d');

        this.init();

        // this.initEvents();

    }

    init() {

        this.radius = 35.0;

        this.anglePhase = 0;

        this.PI2 = Math.PI * 2.0;

        this.strokeWidth = 2.0;

    }

    draw() {

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        this.ctx.arc(this.width * 0.5, this.height * 0.5, this.radius, 0.0, this.PI2 * this.anglePhase, false);
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.stroke();
        this.ctx.closePath();

    }

    update(phase) {

        this.anglePhase = phase;
        // console.log(this.anglePhase)
        this.draw();

    }

}