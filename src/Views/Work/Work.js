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
    this.removeStickyTransforms();
    if (this.inViewProjectMode) emitter.emit(events.RESET_QUADS);
    emitter.emit(events.REMOVE_DOMGL);
  }

  initReferences() {

    this.domGLReferenceElement = this.el.querySelector('.project-video');
    this.projectTitleScrolling = this.el.querySelector('.project-title'); //RENAME

    this.viewProjectButton = this.el.querySelector('.view-project-button');
    this.viewProjectButton.stickyTransform = new StickyComponent({
      domElement: this.el.querySelector('.view-project-button__transform'),
      enable: true,
      event: this.showProject
    });

    this.exitButton = this.el.querySelector('.exit-button');
    this.exitButton.stickyTransform = new StickyComponent({
      domElement: this.el.querySelector('.exit-button__transform'),
      enable: false,
      event: this.closeProject
    });

    this.projectTitle = document.getElementById('project_title');
    this.projectType = document.getElementById('project_type');
    this.projectYear = document.getElementById('project_year');
    this.projectContentInfo = this.el.querySelectorAll('.project-info');

    this.projectLink = this.el.querySelector(".project-link");
    this.projectLink.stickyTransform = new StickyComponent({
      domElement: this.el.querySelector('.project-link__transform'),
      enable: false
    });

  }

  initEvents() {

    // this.enableUserInteraction = true;
    this.showScrollInterface = true;
    this.inScrollMode = false;
    this.inViewProjectMode = false;
    // this.revealProjectContent = false;

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

  }

  removeEvents() {

    // this.enableUserInteraction = false;

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

  }

  removeStickyTransforms() {

    this.viewProjectButton.stickyTransform.deActivate();
    this.exitButton.stickyTransform.deActivate();
    this.projectLink.stickyTransform.deActivate();

    this.viewProjectButton.stickyTransform.removeEvents();
    this.exitButton.stickyTransform.removeEvents();
    this.projectLink.stickyTransform.removeEvents();

    this.viewProjectButton.stickyTransform = null;
    this.exitButton.stickyTransform = null;
    this.projectLink.stickyTransform = null;

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

    if ((window.hoveringLink && !window.isMobile) || (this.inViewProjectMode && !window.isMobile)) return;
    this.inScrollMode = true;
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.updateInterface();

  }

  disableScrollMode = () => {

    if ((window.hoveringLink && !window.isMobile) || (this.inViewProjectMode && !window.isMobile)) return;
    this.inScrollMode = false;
    emitter.emit(events.EXIT_SCROLL_MODE);
    this.updateInterface();

  }

  playEnterAnim = () => {

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
      z: 0,
      ease: ease
    }, "<");

    this.enterAnim.fromTo(this.viewProjectButton, {
      opacity: 0.01,
      y: startY,
    }, {
      duration: dur,
      opacity: 0.65,
      y: 0,
      z: 0,
      ease: ease
    }, "<");

    gsap.set(this.projectTitle, {
      opacity: 0.01,
    });

    gsap.set(this.projectContentInfo, {
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


    // this.killActiveAnimations();

    //not including this to kill animation function
    //As we don't want this animation to be killable
    this.leaveAnim = gsap.timeline();

    const ease = "sine.inOut";
    const dur = 0.75;

    if (this.inViewProjectMode) {

      this.leaveAnim.to(this.projectTitle, {
        opacity: 0.01,
        duration: dur,
        ease: ease,
        z: 0
      });

      this.leaveAnim.to(this.projectContentInfo, {

        duration: dur,
        opacity: 0.01,
        z: 0,
        ease: ease
      }, "<");

      this.leaveAnim.to(this.projectType, {
        duration: dur,
        opacity: 0.01,
        z: 0,
        ease: ease
      }, "<");

      this.leaveAnim.to(this.projectYear, {
        duration: dur,
        opacity: 0.01,
        z: 0,
        ease: ease
      }, "<");

      this.leaveAnim.to(this.projectLink, {
        duration: dur,
        opacity: 0.01,
        z: 0,
        ease: ease
      }, "<");

      this.leaveAnim.to(this.exitButton, {
        duration: dur,
        opacity: 0.01,
        z: 0,
        ease: ease
      }, "<");

    } else {

      this.leaveAnim.to(this.projectTitleScrolling, {
        opacity: 0.01,
        duration: dur,
        ease: ease,
        z: 0,
      });

      this.leaveAnim.to(this.viewProjectButton, {

        duration: dur,
        opacity: 0.01,
        z: 0,
        ease: ease
      }, "<0.1");

    }

  }

  updateInterface = () => {

    if (this.interfaceAnim) this.interfaceAnim.kill();
    this.interfaceAnim = gsap.timeline();
    this.showScrollInterface = !this.showScrollInterface;
    const pow = "power1.out";
    const duration = 0.25;

    this.interfaceAnim.to(this.projectTitleScrolling, {

      duration,
      ease: pow,
      opacity: this.showScrollInterface ? 0.99 : 0.01,
      z: 0

    });

    this.interfaceAnim.to(this.viewProjectButton, {

      duration,
      ease: pow,
      opacity: this.showScrollInterface ? 0.99 : 0.01,
      z: 0

    }, "<");

  }

  showProject = () => {
    this.updateInterface();
    this.revealProjectContent();
    emitter.emit(events.SHOW_PROJECT);
  }

  closeProject = () => {

    this.hideProjectContent();
    emitter.emit(events.CLOSE_PROJECT);
  }

  revealProjectContent() {

    // this.killActiveAnimations();
    if (this.revealProjectContentAnim) this.revealProjectContentAnim.kill();
    this.revealProjectContentAnim = gsap.timeline({
      onStart: () => {
        this.inViewProjectMode = true;
        this.viewProjectButton.stickyTransform.deActivate();
      },
      onComplete: () => {
        this.exitButton.stickyTransform.activate();
        const projectLink = document.getElementById('project_link');
        if (projectLink.innerHTML === '') return;
        this.projectLink.stickyTransform.activate();
      }
    });

    const pow = "linear";
    const duration = 0.5;

    this.revealProjectContentAnim.to(this.projectTitle, {
      duration,
      opacity: 0.99,
      ease: pow,
      z: 0,
    }, "<");
    this.revealProjectContentAnim.to(this.projectType, {
      duration,
      opacity: 0.99,
      ease: pow,
      z: 0,
    }, "<0.02");
    this.revealProjectContentAnim.to(this.projectYear, {
      duration,
      opacity: 0.99,
      ease: pow,
      z: 0,
    }, "<0.02");
    this.revealProjectContentAnim.to(this.projectContentInfo, {
      opacity: 0.99,
      duration,
      z: 0,
      // stagger: 0.1,
    }, "<0.02")
    this.revealProjectContentAnim.to(this.projectLink, {
      duration,
      opacity: 0.99,
      ease: pow,
      z: 0,
    }, "<0.02");

    this.revealProjectContentAnim.to(this.exitButton, {

      duration,
      ease: pow,
      opacity: 0.99,
      z: 0,

    }, "<0.02");

  }

  hideProjectContent = () => {

    // this.killActiveAnimations();
    if (this.hideProjectContentAnim) this.hideProjectContentAnim.kill();
    this.hideProjectContentAnim = gsap.timeline({
      onStart: () => {
        this.exitButton.stickyTransform.deActivate();
        this.projectLink.stickyTransform.deActivate();
      },
      onComplete: () => {
        this.inViewProjectMode = false;
        this.viewProjectButton.stickyTransform.activate();
        this.updateInterface();
      }
    });

    const pow = "linear";
    const duration = 0.4;

    this.hideProjectContentAnim.to(this.projectTitle, {
      duration,
      opacity: 0.01,
      z: 0,
      ease: pow
    }, "<");
    this.hideProjectContentAnim.to(this.projectType, {
      duration,
      opacity: 0.01,
      z: 0,
      ease: pow
    }, "<");
    this.hideProjectContentAnim.to(this.projectYear, {
      duration,
      opacity: 0.01,
      z: 0,
      ease: pow
    }, "<");
    this.hideProjectContentAnim.to(this.projectContentInfo, {
      duration,
      opacity: 0.01,
      z: 0,
    }, "<")
    this.hideProjectContentAnim.to(this.projectLink, {
      duration,
      opacity: 0.01,
      z: 0,
      ease: pow
    }, "<");

    this.hideProjectContentAnim.to(this.exitButton, {

      duration,
      ease: pow,
      opacity: 0.01,
      z: 0,

    }, "<");

  }

  // killActiveAnimations() {

  //   if (this.enterAnim) this.enterAnim.kill();
  //   if (this.scrollAnim) this.scrollAnim.kill();

  // }

}