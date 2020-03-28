import View from "../View.js";
const emitter = require("tiny-emitter/instance");

import "../../../styles/projects.scss";

export default class Projects extends View {
  onEnter() {
    super.onEnter();
    this.container = this.el.querySelector(".main-container");
    // emitter.emit('initDOMGL', this.container);
  }

  onLeave() {
    emitter.emit("removeDOMGL");
    super.onLeave();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    emitter.emit("initDOMGL", this.container);
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
  }
}
