import View from "../View.js";
import contentManager from '../../ContentManager';

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import StickyComponent from '../../StickyComponent.js';

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
    this.projectTitleScrolling = this.el.querySelector('.project-title'); //RENAME
    this.viewProjectButton = this.el.querySelector('.view-project-button');
    this.viewProjectButton.stickyTransform = new StickyComponent({domElement: this.el.querySelector('.view-project-button__transform')});
    this.exitButton = this.el.querySelector('.exit-button');
    this.exitButton.stickyTransform = new StickyComponent({domElement: this.el.querySelector('.exit-button__transform')});

    this.projectTitle = document.getElementById('project_title');
    this.projectType = document.getElementById('project_type');
    this.projectYear = document.getElementById('project_year');
    this.projectContentInfo = this.el.querySelectorAll('.project-info');
    this.projectLink = this.el.querySelector(".project-link");
    this.projectLink.stickyTransform = new StickyComponent({domElement: this.el.querySelector('.project-link__transform')});


  }

  initEvents() {

    this.enableUserInteraction = true;
    this.inScrollMode = false;
    this.inViewProjectMode = false;
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

    //rename events
    this.viewProjectButton.stickyTransform.el.addEventListener('mousedown', this.showProject);
    this.exitButton.stickyTransform.el.addEventListener('mousedown', this.closeProject);


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

    this.viewProjectButton.stickyTransform.el.removeEventListener('mousedown', this.showProject);
    this.exitButton.stickyTransform.el.removeEventListener('mousedown', this.closeProject);

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
    document.querySelector('.project-title__title').innerHTML = title;
    document.getElementById('project_title').innerHTML = title;
    document.getElementById('project_type').innerHTML = type;
    document.getElementById('project_year').innerHTML = year;
    document.getElementById('project_description').innerHTML = description;
    document.getElementById('project_tech').innerHTML = tech;

    document.getElementById('project_role').innerHTML = role !== null ? role : '';
    document.getElementById('project_role').style.display = role !== null ? 'inline-block' : 'none';
    if (role === null) {
      document.getElementById('project_role').innerHTML = role;
    } else {
      document.getElementById('project_role').style.display = "none";
    }

    const projectLink = document.getElementById('project_link');
    projectLink.innerHTML = link === '' ? '' : "view project";
    projectLink.href = link;

  }

  enableScrollMode = () => {

    if ((this.onButton() && !window.isMobile) || this.inViewProjectMode) return;

    // document.querySelector('.project-container').classList.add('project-container--scrolling');
    this.inScrollMode = true;
    this.enableUserInteraction = false;
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.updateInterface();

  }

  disableScrollMode = () => {

    if ((this.onButton() && !window.isMobile) || this.inViewProjectMode) return;
    // document.querySelector('.project-container').classList.remove('project-container--scrolling');
    this.inScrollMode = false;
    this.enableUserInteraction = true;
    emitter.emit(events.EXIT_SCROLL_MODE);
    this.updateInterface();

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

    this.enterAnim.fromTo(this.projectTitleScrolling, {
      opacity: 0.01,
      y: -startY,
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      ease: ease
    }, "<");

    this.enterAnim.fromTo(this.viewProjectButton, {
      opacity: 0.01,
      y: startY,
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      ease: ease
    }, "<");

    gsap.set(this.projectTitle, {
      opacity: 0.01,
    });

    gsap.set(this.projectContentInfo, {

      duration: dur,
      opacity: 0.01,
    });

    gsap.set(this.projectType, {
      opacity: 0.01,
    });

    gsap.set(this.projectYear, {
      opacity: 0.01,
    });

    gsap.set(this.projectLink, {
      opacity: 0.01,
    });

    gsap.set(this.exitButton, {
      opacity: 0.01,
    });

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

    this.leaveAnim.to(this.viewProjectButton, {
       
      duration: dur,
      opacity: 0.01,
      y: 5,
      ease: ease
    }, "<");

  }

  updateInterface = () => {

    this.killActiveAnimations();

    this.interfaceAnim = gsap.timeline();

    // const {inScrollMode} = this.inScrollMode;
    const pow = "power1.out";
    const duration = 0.25;
    const {inScrollMode, inViewProjectMode} = this;

    this.interfaceAnim.to(this.projectTitleScrolling, {

      duration,
      ease: pow,
      opacity: (inViewProjectMode || inScrollMode) ? 0.01 : 0.99

    });

    this.interfaceAnim.to(this.viewProjectButton, {

      duration,
      ease: pow,
      opacity: (inViewProjectMode || inScrollMode) ? 0.01 : 0.99

    }, "<");

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

    this.leaveAnim.to(this.exitButton, {
      duration: dur,
      opacity: 0.01,
      ease: ease
    }, "<");

  }

  showProject = () => {

    this.inViewProjectMode = true;
    emitter.emit(events.SHOW_PROJECT);
    this.updateInterface();
    this.animateProjectContent();

  }

  closeProject = () => {

    this.inViewProjectMode = false;
    emitter.emit(events.CLOSE_PROJECT);
    this.updateInterface();
    this.animateProjectContent();
  }

  animateProjectContent = () => {

    this.killActiveAnimations();
    this.scrollAnim = gsap.timeline({});

    const {inViewProjectMode} = this;
    const pow = "power1.out";

    this.scrollAnim.fromTo(this.projectTitle, {
      y: inViewProjectMode ? 0 : -5
    }, {
      duration: inViewProjectMode ? 0.75 : 0.1,
      y: 0,
      opacity: inViewProjectMode ? 0.99 : 0.01,
      ease: pow
    }, "<");
    this.scrollAnim.to(this.projectType, {
      duration: inViewProjectMode ?  0.75 : 0.01,
      y: 0,
      opacity: inViewProjectMode ? 0.99 : 0.01,
      ease: pow
    }, "<0.05");
    this.scrollAnim.to(this.projectYear, {
      duration: inViewProjectMode ? 0.75 : 0.01,
      y: 0,
      opacity: inViewProjectMode ? 0.99 : 0.01,
      ease: pow
    }, "<0.02");
    this.scrollAnim.to(this.projectContentInfo, {
      opacity: inViewProjectMode ? 0.99 : 0.01,
      duration: inViewProjectMode ? 1.0 : 0.1,
      stagger: inViewProjectMode ? 0.1 : 0.0,
    }, inViewProjectMode ? "<0.05" : "<")
    this.scrollAnim.to(this.projectLink, {
      duration: inViewProjectMode ? 0.5 : 0.1,
      opacity: inViewProjectMode ? 0.99 : 0.01,
      ease: pow
    }, inViewProjectMode ? "<0.05" : "<");

    this.scrollAnim.to(this.exitButton, {

      duration: inViewProjectMode ? 0.5 : 0.1,
      ease: pow,
      opacity: inViewProjectMode ? 0.9 : 0.01

    },inViewProjectMode ? "<0.05" : "<");

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
    // if (this.interfaceAnim) this.interfaceAnim.kill();

  }

  //in future version: make some kind of global check if a sticky transform is being hovered

  onButton() {

    return window.hoveringLink || this.viewProjectButton.stickyTransform.hovered || this.exitButton.stickyTransform.hovered;

  }

}