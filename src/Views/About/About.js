import View from "../View.js";

import mediaManager from '../../MediaManager.js';

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

export default class About extends View {
  onEnter() {
    super.onEnter();

    this.referenceElement = this.el.querySelector('.content__portrait');
    
    emitter.emit(events.INIT_DOMGL, {view: "ABOUT", params: {referenceElement: this.referenceElement, media: mediaManager.images[0]}});

    this.initReferences();

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

  initReferences() {

    this.links = document.querySelectorAll('.content__contact__link');

  }

  initEvents() {

    this.links.forEach((link) => {

      link.addEventListener('mouseenter', this.onLinkHover);
      link.addEventListener('mouseleave', this.onLinkLeave);

    });

  }

  removeEvents() {

    this.links.forEach((link) => {

      link.removeEventListener('mouseenter', this.onLinkHover);
      link.removeEventListener('mouseleave', this.onLinkLeave);

    });

  }

  onLinkHover = () => {

    emitter.emit(events.HOVERING_LINK);

  }

  onLinkLeave = () => {

    emitter.emit(events.LEAVING_LINK);

  }

}
