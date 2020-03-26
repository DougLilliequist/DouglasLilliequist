import View from "../View.js";
const emitter = require('tiny-emitter/instance');

import "../../../styles/projects.scss";

export default class Projects extends View {

    onEnter() {

        super.onEnter();
        this.container = this.el.querySelector('.main-container');
        emitter.emit('initDOMGL', this.container);
    }

    onLeave() {
        super.onLeave();
    }

    onEnterCompleted() {
        super.onEnterCompleted();
    }

    onLeaveCompleted() {
        super.onLeaveCompleted();
        emitter.emit('removeDOMGL');
    }
}