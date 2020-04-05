import View from "../View.js";
import mediaManager from '../../MediaManager';
import {content} from './Content';

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
    emitter.emit(events.INIT_DOMGL, {el: this.domGLReferenceElement, media: mediaManager.videos, getFirstQuad: true});
  }

  onLeaveCompleted() {
    emitter.emit(events.REMOVE_DOMGL);
    super.onLeaveCompleted();
  }

  //assign variables to dom elements
  initReferences() {

    this.projectTitle = this.el.querySelector(".main-container").querySelector('.project-container__title-container');
    this.projectTitleClipReveal = this.projectTitle.children[0];

    this.projectContent = this.el.querySelector(".main-container").querySelector(".project-container__content-container__content");
    this.projectContentClipReveal = this.projectContent.querySelectorAll('.project-container__content-container__content__clip-reveal');
    this.projectClipRevealElements = [];
    this.projectContentClipReveal.forEach((el, i) => {
      this.projectClipRevealElements[i] = el.children[0];
    });

    this.projectLink = this.el.querySelector(".main-container").querySelector(".project-container__content-container__project-link");
    this.projectLinkClipReveal = this.projectLink.children[0];

    this.domGLReferenceElement = this.el.querySelector(".main-container").querySelector('.project');

  }


  /**
   * Make this component emit the scroll mode event, not the event emitter
   * meaning, listen to mosedown events here
   */
  initEvents() {

    this.enableUserInteraction = true;
    this.hoveringProject = false;
    this.hoveringLink = false;

    emitter.on(events.LOAD_PROJECT_CONTENT, this.loadProjectContent);
    emitter.on(events.MOUSE_DOWN, this.enableScrollMode);
    emitter.on(events.MOUSE_UP, this.disableScrollMode);

    this.projectLink.addEventListener('mouseenter', () => {

      emitter.emit(events.HOVERING_LINK, this.projectLink.getBoundingClientRect().width * .75)
      this.hoveringLink = true;
    }, false);

    this.projectLink.addEventListener('mouseleave', () => {
      emitter.emit(events.LEAVING_LINK)
      this.hoveringLink = false;
    }, false);

    // emitter.on(events.ENTER_SCROLL_MODE, this.enableScrollMode);
    // emitter.on(events.EXIT_SCROLL_MODE, this.disableScrollMode);

    // this.referenceElement.addEventListener('mouseenter', this.onProjectHover, false);
    // this.referenceElement.addEventListener('mouseleave', this.onProjectHoverLeave, false);
    // emitter.on(events.UPDATE_SCROLL_PHASE, this.updateScrollCircle)

  }

  removeEvents() {

    this.enableUserInteraction = false;

    emitter.off(events.LOAD_PROJECT_CONTENT, this.loadProjectContent);
    emitter.off(events.MOUSE_DOWN, this.enableScrollMode);
    emitter.off(events.MOUSE_UP, this.disableScrollMode);

    // this.referenceElement.removeEventListener('mouseenter', this.onProjectHover, false);
    // this.referenceElement.removeEventListener('mouseleave', this.onProjectHoverLeave, false);

  }

  //inject project content to relevant html elements
  loadProjectContent = (contentIndex) => {

    const projectContent = content[contentIndex];
    document.getElementById('project_title').innerHTML = projectContent.title;
    document.getElementById('project_type').innerHTML = projectContent.type;
    document.getElementById('project_description').innerHTML = projectContent.description;
    document.getElementById('project_tech').innerHTML = projectContent.tech;

    const link = document.getElementById('project_link');
    link.innerHTML = projectContent.link === '' ? '' : "view project";
    link.href = projectContent.link;

  }

  enableScrollMode = () => {

    if(this.hoveringLink) return;

    this.enableUserInteraction = false;
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.hideProjectContent();

  }

  disableScrollMode = () => {
    this.enableUserInteraction = true;
    emitter.emit(events.EXIT_SCROLL_MODE);
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

    if(this.projectDescRevealAnim) {
      this.projectDescRevealAnim.kill();
    }

    this.projectDescRevealAnim = gsap.to(this.projectClipRevealElements, {
      y: 0,
      duration: 0.5,
      stagger: 0.1
    })

  }

  hideProjectDescription() {

    if(this.projectDescHideAnim) {
      this.projectDescHideAnim.kill();
    }

    this.projectDescHideAnim = gsap.to(this.projectClipRevealElements, {
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
