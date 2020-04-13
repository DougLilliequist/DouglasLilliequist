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
    
    this.domGLReferenceElement = this.el.querySelector('.project-video');

    this.initReferences();

    this.initEvents();

    emitter.emit(events.INIT_DOMGL, {view: "PROJECTS", params: {referenceElement: this.domGLReferenceElement, media: mediaManager.videos, getFirstQuad: true}});

    // this.playEnterAnim();

  }

  onLeave() {
    super.onLeave();
    this.removeEvents();
    this.playLeaveAnim();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    this.playEnterAnim();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    emitter.emit(events.REMOVE_DOMGL);
  }

  //assign variables to dom elements
  initReferences() {

    this.projectTitle = this.el.querySelector('.title-container');
    this.projectTitleClipReveal = this.projectTitle.children[0];

    // this.projectContent = this.el.querySelector(".content-container__content");
    this.projectContentClipReveal = this.el.querySelectorAll('.content-container__content__clip-reveal');
    this.projectClipRevealElements = [];
    this.projectContentClipReveal.forEach((el, i) => {
      this.projectClipRevealElements[i] = el.children[0];
    });

    this.projectLink = this.el.querySelector(".project-link");
    this.projectLinkClipReveal = this.projectLink.children[0];

    this.clickAndDragCTA = this.el.querySelector('.cta_click-drag');

  }

  initEvents() {

    this.enableUserInteraction = true;
    this.inScrollMode = false;

    emitter.on(events.LOAD_PROJECT_CONTENT, this.loadProjectContent);
    emitter.on(events.MOUSE_DOWN, this.enableScrollMode);
    emitter.on(events.MOUSE_UP, this.disableScrollMode);

    this.projectLink.addEventListener('mouseenter', () => {

      emitter.emit(events.HOVERING_LINK)
      window.hoveringLink = true;
    }, false);

    this.projectLink.addEventListener('mouseleave', () => {
      emitter.emit(events.LEAVING_LINK)
      window.hoveringLink = false;
    }, false);

  }

  removeEvents() {

    this.enableUserInteraction = false;

    emitter.off(events.LOAD_PROJECT_CONTENT, this.loadProjectContent);
    emitter.off(events.MOUSE_DOWN, this.enableScrollMode);
    emitter.off(events.MOUSE_UP, this.disableScrollMode);

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

    if(window.hoveringLink) return;

    this.inScrollMode = true;
    this.enableUserInteraction = false;
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.animateProjectContent();

  }

  disableScrollMode = () => {

    this.inScrollMode = false;
    this.enableUserInteraction = true;
    emitter.emit(events.EXIT_SCROLL_MODE);
    this.animateProjectContent();

  }

  playEnterAnim() {

    this.killProjectContentAnim();
    const ease = "linear";
    const startY = 100;
    const dur = 0.85

    const transitionTl = gsap.timeline();
    transitionTl.fromTo(this.projectTitle, {
      opacity: 0,
      y: startY,
    }, {
      duration: dur,
      opacity: 1,
      y: 0,
      // ease: ease
    }, "<");

    transitionTl.fromTo(this.domGLReferenceElement, {
      y: startY
    }, {
      duration: dur,
      y: 0,
      // ease: ease
    }, "<0.1");

    transitionTl.fromTo(this.projectContentClipReveal, {

      opacity: 0,
      y: startY

    }, {

      duration: dur,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      // ease: ease

    // }, "<0.3");
    }, "<0.1");

    transitionTl.fromTo(this.projectLink, {
      opacity: 0,
      y: startY
    },
    {
      duration: dur,
      opacity: 1.0,
      y: 0,
      // ease: ease
    }, "<0.05");

    transitionTl.fromTo(this.clickAndDragCTA, {
      opacity: 0,
      y: startY * 0.5
    }, {
      duration: dur,
      opacity: 1.0,
      y: 0
    }, "<0.01");

  }

  playLeaveAnim() {

    this.killProjectContentAnim();

    const transitionTl = gsap.timeline();
    const ease = "sine.inOut";
    const dur = 0.75;
    const targetY = -100;

    transitionTl.to(this.projectTitle, {
      opacity: 0,
      y: targetY,
      duration: dur,
      ease: ease
    }, "<0.0");

    transitionTl.to(this.domGLReferenceElement, {
      duration: dur,
      y: targetY,
      ease: ease
    }, "<0.1");

    transitionTl.to(this.projectContentClipReveal, {

      duration: dur,
      opacity: 0,
      y: targetY,
      stagger: 0.08,
      ease: ease
    }, "<0.05");

    transitionTl.to(this.projectLink,
    {
      duration: dur,
      opacity: 0.0,
      y: targetY,
      ease: ease
    }, "<0.05");

    transitionTl.to(this.clickAndDragCTA, {
      duration: dur,
      opacity: 0.0,
      y: targetY * 0.5,
      ease: ease
    }, "<0.01");

  }

  animateProjectContent() { //rename later

    const scrolling = this.inScrollMode;

    this.killProjectContentAnim();

    const hideTl = gsap.timeline();
    hideTl.to(this.projectTitleClipReveal.children[0], {
      duration: 0.75,
      opacity: scrolling ? 0 : 1,
      x: scrolling ? -50 : 0
    }, "<");
    hideTl.to(this.projectClipRevealElements, {
      opacity: scrolling ? 0 : 1,
      duration: scrolling ? 0.3 : 1.0,
      stagger: scrolling ? -0.1 : 0.1
    }, "<0.1")
    hideTl.to(this.projectLinkClipReveal.children[0], {
      duration: 0.75,
      y: scrolling ? 30 : 0
    }, "<0.2");

  }

  killProjectContentAnim() {

    gsap.killTweensOf(this.projectTitleClipReveal.children[0]);
    gsap.killTweensOf(this.projectClipRevealElements);
    gsap.killTweensOf(this.projectLinkClipReveal.children[0]);

  }

}
