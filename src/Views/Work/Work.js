import View from "../View.js";

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import projects from './Projects.js';

import {
  gsap
} from 'gsap';

export default class Work extends View {

  onEnter() {

    super.onEnter();
    this.firstReveal = false;
    this.el.appendChild(projects.el);
    projects.splitText();
    projects.computeBounds();
    this.initReferences();
    this.initEvents();
    this.initDomGL();

  }

  onEnterCompleted() {

    super.onEnterCompleted();
    if (globals.CONTENT_LOADED) {
      this.enableUserInteraction = true;
      emitter.emit(events.SHOW_CLICKDRAG_CTA);
      this.playEnterAnim();
    }

  }

  onLeave() {
    super.onLeave();
    emitter.emit(events.HIDE_CLICKDRAG_CTA);
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    this.firstReveal = false;
    this.removeEvents();
    if (globals.VIEWING_PROJECT) emitter.emit(events.RESET_QUADS);
    emitter.emit(events.REMOVE_DOMGL);
    this.el.removeChild(projects.el);
  }

  initReferences() {

    this.domGLReferenceElement = this.el.querySelector('.project-video');

  }

  initEvents() {

    this.enableUserInteraction = false;
    this.showScrollInterface = true;
    this.inScrollMode = false;
    globals.VIEWING_PROJECT = false;
    this.projectIndex = 0;

    emitter.on(events.LOADING_ANIM_COMPLETED, () => {
      this.playEnterAnim();
      emitter.emit(events.SHOW_CLICKDRAG_CTA);
      this.enableUserInteraction = true;
    });

    emitter.on(events.LOAD_PROJECT_CONTENT, this.updateContentSelection);

    if (!window.isMobile) {
      emitter.on(events.MOUSE_DOWN, this.enableScrollMode);
      emitter.on(events.MOUSE_UP, this.disableScrollMode);
    } else {
      emitter.on(events.TOUCH_START, this.enableScrollMode);
      emitter.on(events.TOUCH_END, this.disableScrollMode);
      emitter.on(events.TOUCH_CANCEL, this.disableScrollMode);
    }

  }

  removeEvents() {

    this.enableUserInteraction = false;

    emitter.off(events.LOADING_ANIM_COMPLETED, this.playEnterAnim);
    emitter.off(events.LOAD_PROJECT_CONTENT, () => {
      this.playEnterAnim();
      emitter.emit(events.SHOW_CLICKDRAG_CTA);
    });

    if (!window.isMobile) {
      emitter.off(events.MOUSE_DOWN, this.enableScrollMode);
      emitter.off(events.MOUSE_UP, this.disableScrollMode);
    } else {
      emitter.off(events.TOUCH_START, this.enableScrollMode);
      emitter.off(events.TOUCH_END, this.disableScrollMode);
      emitter.off(events.TOUCH_CANCEL, this.disableScrollMode);
    }

  }

  removeStickyTransforms() {

  }

  initDomGL() {

    const params = {
      referenceElement: this.domGLReferenceElement,
      getFirstQuad: true
    }

    super.initDomGL({
      view: "PROJECTS",
      params
    });

  }

  updateContentSelection = (contentIndex) => {

    this.projectIndex = contentIndex;

  }

  populateContent() {

  }

  enableScrollMode = () => {

    if (globals.HOVERING_LINK && !window.isMobile) return;
    if (globals.VIEWING_PROJECT && !window.isMobile) return;
    if (this.enableUserInteraction === false) return;

    this.inScrollMode = true;
    document.body.classList.add('scrolling');
    //this.viewProjectButton.stickyTransform.deActivate();
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.updateInterface({
      state: false
    });

  }

  disableScrollMode = () => {

   if (globals.HOVERING_LINK && !window.isMobile) return;
   if (globals.VIEWING_PROJECT && !window.isMobile) return;
   if (this.enableUserInteraction === false) return;

    this.inScrollMode = false;
    document.body.classList.remove('scrolling');
    //this.viewProjectButton.stickyTransform.activate();
    emitter.emit(events.EXIT_SCROLL_MODE);
    this.updateInterface({
      state: true
    });

  }

  playEnterAnim = () => {

    emitter.emit(events.REVEAL_QUADS);

  }

  playLeaveAnim = () => {


  }

  updateInterface = ({
    state
  }) => {

  }

  showProject = () => {
    this.updateInterface({
      state: false
    });
    this.revealProjectContent();
  }

  closeProject = () => {

    this.hideProjectContent();
  }


  updateViewModeStyles({
    viewing
  }) {

    if (!viewing) {

      document.querySelector('.project-container').classList.add('not-viewing');
      this.exitButton.classList.add('not-viewing');

    } else {

      document.querySelector('.project-container').classList.remove('not-viewing');
      this.exitButton.classList.remove('not-viewing');

    }

  }

}