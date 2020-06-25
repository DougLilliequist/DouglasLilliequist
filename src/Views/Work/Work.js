import View from "../View.js";
import contentManager from '../../ContentManager';

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import {
  gsap
} from 'gsap';


export default class Work extends View {

  onEnter() {

    super.onEnter();
    this.initReferences();
    this.initEvents();

    if (window.contentLoaded) {
      this.initDomGL();
    }

  }

  onEnterCompleted() {
    super.onEnterCompleted();

    if (window.contentLoaded) {
      emitter.emit(events.SHOW_CLICKDRAG_CTA);
      this.playEnterAnim();
    }

  }

  onLeave() {
    super.onLeave();
    emitter.emit(events.HIDE_CLICKDRAG_CTA);
    this.removeEvents();
    this.playLeaveAnim();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    emitter.emit(events.REMOVE_DOMGL);
  }

  initReferences() {

    this.domGLReferenceElement = this.el.querySelector('.project-video');
    this.projectTitle = document.getElementById('project_title');
    this.projectType = document.getElementById('project_type');
    this.projectYear = document.getElementById('project_year');
    this.projectContentInfo = this.el.querySelectorAll('.project-info');
    this.projectLink = this.el.querySelector(".project-link");

  }

  initEvents() {

    this.enableUserInteraction = true;
    this.inScrollMode = false;
    this.inTraverseMode = false;

    emitter.on(events.CONTENT_LOADED, this.initDomGL);
    emitter.on(events.LOADING_ANIM_COMPLETED, () => { //RENAME FUNCTION
      this.playEnterAnim();
      emitter.emit(events.SHOW_CLICKDRAG_CTA);
    });

    emitter.on(events.LOAD_PROJECT_CONTENT, this.populateContent);

    if (!window.isMobile) {
      emitter.on(events.MOUSE_DOWN, this.enableScrollMode);
      emitter.on(events.MOUSE_UP, this.disableScrollMode);
    } else {
      emitter.on(events.TOUCH_START, this.enableScrollMode);
      emitter.on(events.TOUCH_END, this.disableScrollMode);
      emitter.on(events.TOUCH_CANCEL, this.disableScrollMode);
    }

    this.projectLink.addEventListener('mouseenter', () => {
      this.updateLinkHoverState({
        hovering: true
      });
    });
    this.projectLink.addEventListener('mouseleave', () => {
      this.updateLinkHoverState({
        hovering: false
      });
    });

  }

  removeEvents() {

    this.enableUserInteraction = false;

    emitter.off(events.CONTENT_LOADED, this.initDomGL);
    emitter.off(events.LOADING_ANIM_COMPLETED, this.playEnterAnim);
    emitter.off(events.LOAD_PROJECT_CONTENT, this.populateContent);

    if (!window.isMobile) {
      emitter.off(events.MOUSE_DOWN, this.enableScrollMode);
      emitter.off(events.MOUSE_UP, this.disableScrollMode);
    } else {
      emitter.off(events.TOUCH_START, this.enableScrollMode);
      emitter.off(events.TOUCH_END, this.disableScrollMode);
      emitter.off(events.TOUCH_CANCEL, this.disableScrollMode);
    }

    this.projectLink.removeEventListener('mouseenter', () => {
      this.updateLinkHoverState({
        hovering: true
      });
    });
    this.projectLink.removeEventListener('mouseleave', () => {
      this.updateLinkHoverState({
        hovering: false
      });
    });

  }

  initDomGL = () => {

    const params = {
      referenceElement: this.domGLReferenceElement,
      media: contentManager.projects,
      getFirstQuad: true
    }

    super.initDomGL({
      view: "PROJECTS",
      params
    });

  }

  populateContent = (contentIndex) => {

    const {
      title,
      type,
      year,
      description,
      tech,
      role,
      link
    } = contentManager.Projects[contentIndex];
    document.getElementById('project_title').innerHTML = title;
    document.getElementById('project_type').innerHTML = type;
    document.getElementById('project_year').innerHTML = year;
    document.getElementById('project_description').innerHTML = description;
    document.getElementById('project_tech').innerHTML = tech;

    document.getElementById('project_role').innerHTML = role !== null ? role : '';
    document.getElementById('project_role').style.display = role !== null ? 'inline-block' : 'none';
    // if (role === null) {
    //   document.getElementById('project_role').innerHTML = role;
    // } else {
    //   document.getElementById('project_role').style.display = "none";
    // }

    const projectLink = document.getElementById('project_link');
    projectLink.innerHTML = link === '' ? '' : "view project";
    projectLink.href = link;

  }

  enableScrollMode = () => {

    if (window.hoveringLink && !window.isMobile) return;
    document.querySelector('.project-container').classList.add('project-container--scrolling');
    this.inScrollMode = true;
    this.enableUserInteraction = false;
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.animateProjectContent();

  }

  disableScrollMode = () => {

    if (window.hoveringLink && !window.isMobile) return;
    document.querySelector('.project-container').classList.remove('project-container--scrolling');
    this.inScrollMode = false;
    this.enableUserInteraction = true;
    emitter.emit(events.EXIT_SCROLL_MODE);
    this.animateProjectContent();

  }

  playEnterAnim = () => {

    this.killActiveAnimations();

    this.enterAnim = gsap.timeline({
      onStart: () => {
        emitter.emit(events.REVEAL_QUADS);
      }
    });

    const ease = "sine.inOut";
    const startY = 5;
    const dur = 0.85

    this.enterAnim.fromTo(this.projectTitle, {
      opacity: 0.01,
      y: -startY,
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      ease: ease
    }, "<");

    this.enterAnim.fromTo(this.projectContentInfo, {

      opacity: 0.01,
      y: -startY

    }, {

      duration: dur,
      opacity: 0.99,
      y: 0,
      stagger: 0.05,
      // ease: ease

      // }, "<0.3");
    }, "<0.05");

    this.enterAnim.fromTo(this.projectType, {
      opacity: 0.01,
    }, {
      duration: dur,
      opacity: 0.99,
      ease: ease
    }, "<");

    this.enterAnim.fromTo(this.projectYear, {
      opacity: 0.01
    }, {
      duration: dur,
      opacity: 0.99,
      ease: ease
    }, "<0.01");

    this.enterAnim.fromTo(this.projectLink, {
      opacity: 0.01,
      y: -startY
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      ease: ease
    }, "<0.01");

  }

  playLeaveAnim = () => {


    this.killActiveAnimations();

    //not including this to kill animation function
    //As we don't want this animation to be killable
    this.leaveAnim = gsap.timeline();

    const ease = "sine.inOut";
    const dur = 0.75;

    this.leaveAnim.to(this.projectTitle, {
      opacity: 0.01,
      duration: dur,
      ease: ease
    });

    this.leaveAnim.to(this.projectContentInfo, {

      duration: dur,
      opacity: 0.01,
      stagger: -0.05,
      ease: ease
    }, "<");

    this.leaveAnim.to(this.projectType, {
      duration: dur,
      opacity: 0.01,
      ease: ease
    }, "<");

    this.leaveAnim.to(this.projectYear, {
      duration: dur,
      opacity: 0.01,
      ease: ease
    }, "<");

    this.leaveAnim.to(this.projectLink, {
      duration: dur,
      opacity: 0.01,
      ease: ease
    }, "<");

  }

  animateProjectContent() {


    this.killActiveAnimations();
    this.scrollAnim = gsap.timeline({});

    const scrolling = this.inScrollMode;
    const pow = "power1.out";

    this.scrollAnim.fromTo(this.projectTitle, {
      y: scrolling ? 0 : -5
    }, {
      duration: scrolling ? 0.1 : 0.75,
      y: 0,
      opacity: scrolling ? 0.01 : 0.99,
      ease: pow
    }, "<");
    this.scrollAnim.to(this.projectType, {
      duration: scrolling ? 0.01 : 0.75,
      y: 0,
      opacity: scrolling ? 0.01 : 0.99,
      ease: pow
    }, "<0.05");
    this.scrollAnim.to(this.projectYear, {
      duration: scrolling ? 0.01 : 0.75,
      y: 0,
      opacity: scrolling ? 0.01 : 0.99,
      ease: pow
    }, "<0.02");
    this.scrollAnim.to(this.projectContentInfo, {
      opacity: scrolling ? 0.01 : 0.99,
      duration: scrolling ? 0.1 : 1.0,
      stagger: scrolling ? 0.0 : 0.1,
    }, scrolling ? "<" : "<0.05")
    this.scrollAnim.to(this.projectLink, {
      duration: scrolling ? 0.1 : 0.5,
      opacity: scrolling ? 0.01 : 0.99,
      ease: pow
    }, scrolling ? "<" : "<0.05");

  }

  updateLinkHoverState({
    hovering
  }) {

    if (this.inScrollMode === false) {
      if (hovering) {
        emitter.emit(events.HOVERING_LINK)
        window.hoveringLink = hovering;
      } else {
        emitter.emit(events.LEAVING_LINK)
        window.hoveringLink = false;
      }

    }

  }

  killActiveAnimations() {

    if (this.enterAnim) this.enterAnim.kill();
    if (this.scrollAnim) this.scrollAnim.kill();

  }

}