import View from "../View.js";

import eventEmitter from '../../EventEmitter';
const emitter = eventEmitter.emitter;

import events from '../../../utils/events';

import mediaManager from '../../MediaManager';
import "../../../styles/projects.scss";

export default class Projects extends View {
  onEnter() {
    super.onEnter();
    this.referenceElement = this.el.querySelector(".main-container").querySelector('.project');
    this.initEvents();
  }

  onLeave() {
    emitter.emit(events.REMOVE_DOMGL);
    super.onLeave();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    emitter.emit(events.INIT_DOMGL, {el: this.referenceElement, media: mediaManager.videos, getFirstQuad: true});
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
  }

  initEvents() {

    emitter.on(events.LOAD_PROJECT_CONTENT, this.loadProjectContent);

  }

  loadProjectContent = (data) => {

    // console.log(data);

  }

}
