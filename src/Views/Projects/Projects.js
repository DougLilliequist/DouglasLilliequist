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

  }

  onEnterCompleted() {
    super.onEnterCompleted();
    emitter.emit(events.SHOW_CLICKDRAG_CTA);
    this.playEnterAnim();
  }

  onLeave() {
    super.onLeave();
    emitter.emit(events.HIDE_CLICKDRAG_CTA);
    this.removeEvents();
    this.playLeaveAnim();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    document.body.style.cursor = "auto";
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

    // this.clickAndDragCTA = this.el.querySelector('.cta_click-drag');

  }

  initEvents() {

    this.enableUserInteraction = true;
    this.inScrollMode = false;
    this.inTraverseMode = false;

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

    this.projectLink.removeEventListener('mouseenter', () => {

      emitter.emit(events.HOVERING_LINK)
      window.hoveringLink = true;
    }, false);

    this.projectLink.removeEventListener('mouseleave', () => {
      emitter.emit(events.LEAVING_LINK)
      window.hoveringLink = false;
    }, false);

  }

  //inject project content to relevant html elements
  loadProjectContent = (contentIndex) => {

    const projectContent = content[contentIndex];
    document.getElementById('project_title').innerHTML = projectContent.title;
    document.getElementById('project_type').innerHTML = projectContent.type;
    document.getElementById('project_year').innerHTML = projectContent.year;
    document.getElementById('project_description').innerHTML = projectContent.description;
    document.getElementById('project_tech').innerHTML = projectContent.tech;

    const link = document.getElementById('project_link');
    link.innerHTML = projectContent.link === '' ? '' : "view project";
    link.href = projectContent.link;

  }

  enableScrollMode = () => {

    if(window.hoveringLink) return;

    // document.body.style.cursor = "grabbing";
    this.inScrollMode = true;
    this.enableUserInteraction = false;
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.animateProjectContent();

  }

  disableScrollMode = () => {

    document.body.style.cursor = this.defaultCursor;
    this.inScrollMode = false;
    this.enableUserInteraction = true;
    emitter.emit(events.EXIT_SCROLL_MODE);
    this.animateProjectContent();

  }

  playEnterAnim() {

    this.killProjectContentAnim();
    const ease = "sine.inOut";
    const startX = 20;
    const dur = 0.85

    const transitionTl = gsap.timeline();
    transitionTl.fromTo(this.projectTitle, {
      opacity: 0.01,
      y: -startX,
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      ease: ease
    }, "<");

    transitionTl.fromTo(this.projectContentClipReveal, {

      opacity: 0.01,
      x: startX

    }, {

      duration: dur,
      opacity: 0.99,
      x: 0,
      stagger: 0.05,
      // ease: ease

    // }, "<0.3");
    }, "<0.05");

    transitionTl.fromTo(this.projectLink, {
      opacity: 0.01,
      x: startX
    },
    {
      duration: dur,
      opacity: 0.99,
      x: 0,
      ease: ease
    }, "<0.01");

  }

  playLeaveAnim() {

    this.killProjectContentAnim();

    const transitionTl = gsap.timeline();
    const ease = "sine.inOut";
    const dur = 0.75;
    const targetX = -20;

    transitionTl.to(this.projectTitle, {
      opacity: 0.01,
      y: -targetX,
      duration: dur,
      ease: ease
    });

    transitionTl.to(this.projectContentClipReveal, {

      duration: dur,
      opacity: 0.01,
      x: -targetX,
      stagger: -0.05,
      ease: ease
    }, "<0.01");

    transitionTl.to(this.projectLink,
    {
      duration: dur,
      opacity: 0.01,
      x: -targetX,
      ease: ease
    }, "<0.01");

  }

  animateProjectContent() { //rename later

    const scrolling = this.inScrollMode;

    this.killProjectContentAnim();

    const hideTl = gsap.timeline();
    hideTl.to(this.projectTitleClipReveal.children[0], {
      duration: scrolling ? 0.1 : 0.75,
      opacity: scrolling ? 0.01 : 0.99,
      // x: scrolling ? -50 : 0
    }, "<");
    hideTl.to(this.projectContentClipReveal, {
      opacity: scrolling ? 0.01 : 0.99,
      duration: scrolling ? 0.1 : 1.0,
      stagger: scrolling ? 0.0 : 0.1,
    }, "<0.05")
    hideTl.to(this.projectLinkClipReveal.children[0], {
      duration: scrolling ? 0.1 : 0.5,
      // y: scrolling ? 15 : 0,
      opacity: scrolling ? 0.01 : 0.99
    }, "<0.05");

  }

  killProjectContentAnim() {

    gsap.killTweensOf(this.projectTitleClipReveal.children[0]);
    gsap.killTweensOf(this.projectContentClipReveal);
    gsap.killTweensOf(this.projectLinkClipReveal.children[0]);

  }

}
