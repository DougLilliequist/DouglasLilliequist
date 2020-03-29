import View from "../View.js";
const emitter = require("tiny-emitter/instance");
import events from '../../../utils/events';

import "../../../styles/projects.scss";

export default class Projects extends View {
  onEnter() {
    super.onEnter();
    this.container = this.el.querySelector(".main-container");
    // emitter.emit('initDOMGL', this.container);
  }

  onLeave() {
    emitter.emit(events.REMOVE_DOMGL);
    super.onLeave();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    emitter.emit(events.INIT_DOMGL, {el: this.container, getQuad: true});
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
  }
}
