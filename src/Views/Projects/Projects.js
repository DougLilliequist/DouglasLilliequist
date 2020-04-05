import View from "../View.js";
import mediaManager from '../../MediaManager';
import ScrollCircle from '../../CanvasComponents/ScrollCircle';

import eventEmitter from '../../EventEmitter';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events';

import {gsap} from 'gsap';


export default class Projects extends View {
  onEnter() {
    super.onEnter();
    this.referenceElement = this.el.querySelector(".main-container").querySelector('.project');

    this.initReferences();

    this.initEvents();
  }

  onLeave() {
    super.onLeave();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    emitter.emit(events.INIT_DOMGL, {el: this.referenceElement, media: mediaManager.videos, getFirstQuad: true});
  }

  onLeaveCompleted() {
    emitter.emit(events.REMOVE_DOMGL);
    super.onLeaveCompleted();
  }

  //assign variables to dom elements
  initReferences() {

    this.referenceElement = this.el.querySelector(".main-container").querySelector('.project');
    this.projectTitle = this.el.querySelector(".main-container").querySelector('.project-container__title-container');
    this.projectContent = this.el.querySelector(".main-container").querySelector(".project-container__content-container__content");
    this.projectLink = this.el.querySelector(".main-container").querySelector(".project-container__content-container__project-link");

    this.projectTitleClipReveal = this.projectTitle.children[0];
    
    this.projectContentClipReveal = this.projectContent.querySelectorAll('.project-container__content-container__content__clip-reveal');
    
    this.projectClipRevealElements = [];
    this.projectContentClipReveal.forEach((el, i) => {
      this.projectClipRevealElements[i] = el.children[0];
    });

    this.projectLinkClipReveal = this.projectLink.children[0];

  }

  initEvents() {

    this.enableUserInteraction = true;
    this.hoveringProject = false;

    emitter.on(events.LOAD_PROJECT_CONTENT, this.loadProjectContent);
    emitter.on(events.ENTER_SCROLL_MODE, this.enableScrollMode);
    emitter.on(events.EXIT_SCROLL_MODE, this.disableScrollMode);

    // this.referenceElement.addEventListener('mouseenter', this.onProjectHover, false);
    // this.referenceElement.addEventListener('mouseleave', this.onProjectHoverLeave, false);
    // emitter.on(events.UPDATE_SCROLL_PHASE, this.updateScrollCircle)

  }

  removeEvents() {

    this.enableUserInteraction = false;

    emitter.off(events.LOAD_PROJECT_CONTENT, this.loadProjectContent);
    emitter.off(events.ENTER_SCROLL_MODE, this.enableScrollMode);
    emitter.off(events.EXIT_SCROLL_MODE, this.disableScrollMode);

    // this.referenceElement.removeEventListener('mouseenter', this.onProjectHover, false);
    // this.referenceElement.removeEventListener('mouseleave', this.onProjectHoverLeave, false);

  }

  //inject project content to relevant html elements
  loadProjectContent = (data) => {

    // console.log(data);

  }

  enableScrollMode = () => {
    this.enableUserInteraction = false;
    this.hideProjectContent();
  }

  disableScrollMode = () => {
    this.enableUserInteraction = true;

    if(this.hoveringProject === false) {
      this.revealProjectContent();
    }
  }

  onProjectHover = () => {

    this.hoveringProject = true;

    if(this.enableUserInteraction) {
      this.hideProjectContent();
    }

  }

  onProjectHoverLeave = () => {

    this.hoveringProject = false;

    if(this.enableUserInteraction) {
      this.revealProjectContent();
    }

  }

  revealProjectContent() {

    this.revealProjectTitle();
    this.revealProjectDescription();
    this.revealProjectLink();

  }

  hideProjectContent() {

    this.hideProjectTitle();
    this.hideProjectDescription();
    this.hideProjectLink();

  }


  revealProjectTitle() {

    gsap.to(this.projectTitleClipReveal.children[0], {
      duration: 0.75,
      x: 0
    })

  }

  hideProjectTitle() {

    gsap.to(this.projectTitleClipReveal.children[0], {
      duration: 0.75,
      x: -50
    })

  }

  revealProjectDescription() {

    gsap.to(this.projectClipRevealElements, {
      y: 0,
      duration: 0.5,
      stagger: 0.1
    })

  }

  hideProjectDescription() {

    gsap.to(this.projectClipRevealElements, {
      y: 50,
      duration: 0.5,
      stagger: -0.1
    })

  }

  revealProjectLink() {

    gsap.to(this.projectLinkClipReveal.children[0], {
      duration: 0.75,
      y: 0
    })

  }

  hideProjectLink() {

    gsap.to(this.projectLinkClipReveal.children[0], {
      duration: 0.75,
      y: 25
    })

  }

}
