import View from "../View.js";
import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

export default class About extends View {
  onEnter() {
    super.onEnter();

    this.referenceElement = this.el.querySelector('.content__portrait');
    emitter.emit(events.INIT_DOMGL, {view: "ABOUT", params: {referenceElement: this.referenceElement, media: null}});

    this.initEvents();

  }
  onEnterCompleted() {
    super.onEnterCompleted();
  }

  onLeave() {
    super.onLeave();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    emitter.emit(events.REMOVE_DOMGL);
  }

  initOnComplete() {
    // super.initOnComplete();
  }

  initEvents() {

  } 

}
