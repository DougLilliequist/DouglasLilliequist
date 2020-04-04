import View from "../View.js";
import mediaManager from '../../MediaManager';
import ScrollCircle from '../../CanvasComponents/ScrollCircle';

import eventEmitter from '../../EventEmitter';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events';


export default class Projects extends View {
  onEnter() {
    super.onEnter();
    this.referenceElement = this.el.querySelector(".main-container").querySelector('.project');
    this.initEvents();
  }

  onLeave() {
    super.onLeave();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    // this.scrollCircle = new ScrollCircle(this.el);
    emitter.emit(events.INIT_DOMGL, {el: this.referenceElement, media: mediaManager.videos, getFirstQuad: true});
  }

  onLeaveCompleted() {
    emitter.emit(events.REMOVE_DOMGL);
    super.onLeaveCompleted();
  }

  initEvents() {

    emitter.on(events.LOAD_PROJECT_CONTENT, this.loadProjectContent);
    // emitter.on(events.UPDATE_SCROLL_PHASE, this.updateScrollCircle)

  }

  loadProjectContent = (data) => {

    // console.log(data);

  }

  updateScrollCircle = (e) => {

    // this.scrollCircle.update(e);

  }

}
