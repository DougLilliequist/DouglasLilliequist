import View from "../View.js";

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import {
  ProjectContent
} from '../../../static/ProjectContent.js';

import StickyComponent from '../../StickyComponent.js';

import {
  gsap
} from 'gsap';


export default class Work extends View {

  onEnter() {

    super.onEnter();
    this.firstReveal = false;
    this.initReferences();
    this.initEvents();
    this.initDomGL();

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
    this.firstReveal = false;
    this.removeStickyTransforms();
    if (this.inViewProjectMode) emitter.emit(events.RESET_QUADS);
    emitter.emit(events.REMOVE_DOMGL);
  }

  initReferences() {

    this.domGLReferenceElement = this.el.querySelector('.project-video');
    this.projectTitleScrolling = this.el.querySelector('.project-title'); //RENAME
    this.projectTitleTransform = this.el.querySelector('.project-title__transform');
    this.projectTitleTransformRect = this.projectTitleTransform.getBoundingClientRect();

    this.viewProjectButton = this.el.querySelector('.view-project-button');
    this.viewProjectButton.stickyTransform = new StickyComponent({
      domElement: this.el.querySelector('.view-project-button__transform'),
      enable: true,
      event: this.showProject,
      includeHoverAnim: true
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

    this.enableUserInteraction = true;
    this.showScrollInterface = true;
    this.inScrollMode = false;
    this.inViewProjectMode = false;

    emitter.on(events.LOADING_ANIM_COMPLETED, () => {
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

  populateContent = (contentIndex) => {

    const {
      title,
      type,
      year,
      description,
      tech,
      role,
      link
    } = ProjectContent[contentIndex];

    const projectTitleEl = document.querySelector('.project-title__title');
    const projectTitleViewEl = document.getElementById('project_title');
    const projectRoleEl = document.getElementById('project_role');
    const projectTypeEl = document.getElementById('project_type');
    const projectYearEl = document.getElementById('project_year');
    const projectDescriptionEl = document.getElementById('project_description');
    const projectTechEl = document.getElementById('project_tech');

    projectTitleEl.innerHTML = title;
    projectTitleViewEl.innerHTML = title;
    projectTypeEl.innerHTML = type;
    projectYearEl.innerHTML = year;
    projectDescriptionEl.innerHTML = description;
    projectTechEl.innerHTML = tech;

    if (role === null) {
      projectRoleEl.innerHTML = '';
      projectRoleEl.classList.add('no-role');

    } else {
      projectRoleEl.innerHTML = role;
      projectRoleEl.classList.remove('no-role');
    }

    const projectLinkEl = document.getElementById('project_link');
    projectLinkEl.innerHTML = link === '' ? '' : "visit project";
    projectLinkEl.href = link;

  }

  enableScrollMode = () => {

    if ((window.hoveringLink && !window.isMobile) || (this.inViewProjectMode && !window.isMobile)) return;
    this.inScrollMode = true;
    document.body.classList.add('scrolling');
    this.viewProjectButton.stickyTransform.deActivate();
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.updateInterface({
      state: false
    });

  }

  disableScrollMode = () => {

    if ((window.hoveringLink && !window.isMobile) || (this.inViewProjectMode && !window.isMobile)) return;
    this.inScrollMode = false;
    document.body.classList.remove('scrolling');
    this.viewProjectButton.stickyTransform.activate();
    emitter.emit(events.EXIT_SCROLL_MODE);
    this.updateInterface({
      state: true
    });

  }

  playEnterAnim = () => {

    this.showScrollInterface = true;

    this.enterAnim = gsap.timeline({
      onStart: () => {
        if (this.firstReveal === false) {
          this.firstReveal = true;
          emitter.emit(events.REVEAL_QUADS);
        }
      }
    });

    const ease = "power2.out";

    const {
      height
    } = this.projectTitleTransformRect;
    const startY = height;
    const dur = !this.firstReveal ? 1.0 : 0.85

    this.enterAnim.fromTo(this.projectTitleTransform, {
      // opacity: 0,
      x: 0,
      z: 0,
      y: startY,
    }, {
      duration: dur,
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,
      ease: "power2.out"
    }, "<");

    this.enterAnim.fromTo(this.viewProjectButton, {
      opacity: 0,
      x: 0,
      z: 0,
      y: startY,
    }, {
      duration: dur,
      opacity: 0.7,
      x: 0,
      y: 0,
      z: 0,
      ease: "power1.out"
    }, "<0.1");

    this.updateViewModeStyles({
      viewing: false
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
        opacity: 0,
        duration: dur,
        ease: ease,
        z: 0
      });

      this.leaveAnim.to(this.projectContentInfo, {

        duration: dur,
        opacity: 0,
        z: 0,
        ease: ease
      }, "<");

      this.leaveAnim.to(this.projectType, {
        duration: dur,
        opacity: 0,
        z: 0,
        ease: ease
      }, "<");

      this.leaveAnim.to(this.projectYear, {
        duration: dur,
        opacity: 0,
        z: 0,
        ease: ease
      }, "<");

      this.leaveAnim.to(this.projectLink, {
        duration: dur,
        opacity: 0,
        z: 0,
        ease: ease
      }, "<");

      this.leaveAnim.to(this.exitButton, {
        duration: dur,
        opacity: 0,
        z: 0,
        ease: ease
      }, "<");

    } else {

      this.leaveAnim.to(this.projectTitleScrolling, {
        opacity: 0,
        duration: dur,
        ease: ease,
        z: 0,
      });

      this.leaveAnim.to(this.viewProjectButton, {

        duration: dur,
        opacity: 0,
        z: 0,
        ease: ease
      }, "<0.1");

    }

  }

  updateInterface = ({
    state
  }) => {

    if (this.interfaceAnim) this.interfaceAnim.kill();
    if (this.enterAnim) this.enterAnim.kill();

    this.interfaceAnim = gsap.timeline();
    this.showScrollInterface = state;
    const ease = this.showScrollInterface ? "power1.out" : "power1.in";
    const duration = 0.35;
    const {
      height
    } = this.projectTitleTransformRect;

    this.interfaceAnim.to(this.projectTitleTransform, {

      duration,
      ease,
      opacity: this.showScrollInterface ? 1 : 0,
      x: 0,
      y: this.showScrollInterface ? 0 : height * 0.1,
      z: 0

    });

    this.interfaceAnim.to(this.viewProjectButton, {

      duration,
      ease,
      opacity: this.showScrollInterface ? 1 : 0,
      x: 0,
      y: 0,
      z: 0
    }, "<0.1");

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

  revealProjectContent() {

    if (this.revealProjectContentAnim) this.revealProjectContentAnim.kill();
    this.revealProjectContentAnim = gsap.timeline({
      // delay: 1.0,
      onStart: () => {
        this.inViewProjectMode = true;
        this.viewProjectButton.stickyTransform.deActivate();
        // emitter.emit(events.SHOW_PROJECT);
      },
      onComplete: () => {
        this.exitButton.stickyTransform.activate();
        this.updateViewModeStyles({
          viewing: true
        });
        const projectLink = document.getElementById('project_link');
        if (projectLink.innerHTML === '') return;
        this.projectLink.stickyTransform.activate();
      }
    });

    const pow = "linear";
    const duration = 1.0;
    this.revealProjectContentAnim.add(() => {
      emitter.emit(events.SHOW_PROJECT);
    }, "<")
    this.revealProjectContentAnim.to(this.projectTitle, {
      duration,
      opacity: 1,
      ease: pow,
      z: 0,
    }, "<0.5");
    this.revealProjectContentAnim.to(this.projectType, {
      duration,
      opacity: 1,
      ease: pow,
      z: 0,
    }, "<0.02");
    this.revealProjectContentAnim.to(this.projectYear, {
      duration,
      opacity: 1,
      ease: pow,
      z: 0,
    }, "<0.02");
    this.revealProjectContentAnim.to(this.projectContentInfo, {
      opacity: 1,
      duration,
      z: 0,
      // stagger: 0.1,
    }, "<0.02")
    this.revealProjectContentAnim.to(this.projectLink, {
      duration,
      opacity: 1,
      ease: pow,
      z: 0,
    }, "<0.02");

    this.revealProjectContentAnim.to(this.exitButton, {

      duration,
      ease: pow,
      opacity: 1,
      z: 0,

    }, "<0.02");

  }

  hideProjectContent = () => {

    if (this.hideProjectContentAnim) this.hideProjectContentAnim.kill();
    this.hideProjectContentAnim = gsap.timeline({
      onStart: () => {
        this.exitButton.stickyTransform.deActivate();
        this.projectLink.stickyTransform.deActivate();
        emitter.emit(events.CLOSE_PROJECT);
      },
      onComplete: () => {

        gsap.delayedCall(0.5, () => {
          this.inViewProjectMode = false;
          this.viewProjectButton.stickyTransform.activate();
          this.playEnterAnim();
        })
      }
    });

    const pow = "linear";
    const duration = 0.4;

    this.hideProjectContentAnim.to(this.projectTitle, {
      duration,
      opacity: 0,
      z: 0,
      ease: pow
    }, "<");
    this.hideProjectContentAnim.to(this.projectType, {
      duration,
      opacity: 0,
      z: 0,
      ease: pow
    }, "<");
    this.hideProjectContentAnim.to(this.projectYear, {
      duration,
      opacity: 0,
      z: 0,
      ease: pow
    }, "<");
    this.hideProjectContentAnim.to(this.projectContentInfo, {
      duration,
      opacity: 0,
      z: 0,
    }, "<")
    this.hideProjectContentAnim.to(this.projectLink, {
      duration,
      opacity: 0,
      z: 0,
      ease: pow
    }, "<");

    this.hideProjectContentAnim.to(this.exitButton, {

      duration,
      ease: pow,
      opacity: 0,
      z: 0,

    }, "<");

  }

  updateViewModeStyles({
    viewing
  }) {

    if (!viewing) {

      this.projectTitle.classList.add('not-viewing');

      this.projectContentInfo.forEach((info) => {
        info.classList.add('not-viewing');
      })


      this.projectType.classList.add('not-viewing');
      this.projectYear.classList.add('not-viewing');
      this.projectLink.classList.add('not-viewing');
      this.exitButton.classList.add('not-viewing');

    } else {

      this.projectTitle.classList.remove('not-viewing');

      this.projectContentInfo.forEach((info) => {
        info.classList.remove('not-viewing');
      })

      this.projectType.classList.remove('not-viewing');
      this.projectYear.classList.remove('not-viewing');
      this.projectLink.classList.remove('not-viewing');
      this.exitButton.classList.remove('not-viewing');

    }

  }
}