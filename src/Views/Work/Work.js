import View from "../View.js";
import contentManager from '../../ContentManager';

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import {gsap} from 'gsap';


export default class Work extends View {

  onEnter() {
  
    super.onEnter();
    this.initReferences();
    this.initEvents();

    if(window.contentLoaded) {
      this.initDomGL();
    }

  }

  onEnterCompleted() {
    super.onEnterCompleted();

    if(window.contentLoaded) {
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
    this.projectTitle = this.el.querySelector('.title-container__title');
    this.projectContentInfo = this.el.querySelectorAll('.project-info');
    this.projectLink = this.el.querySelector(".project-link");

  }

  initEvents() {

    this.enableUserInteraction = true;
    this.inScrollMode = false;
    this.inTraverseMode = false;
    
    emitter.on(events.CONTENT_LOADED,this.initDomGL);
    emitter.on(events.LOADING_ANIM_COMPLETED, () => { //RENAME FUNCTION
      this.playEnterAnim();
      emitter.emit(events.SHOW_CLICKDRAG_CTA);
    });
    
    emitter.on(events.LOAD_PROJECT_CONTENT, this.populateContent);
    emitter.on(events.MOUSE_DOWN, this.enableScrollMode);
    emitter.on(events.MOUSE_UP, this.disableScrollMode);

    this.projectLink.addEventListener('mouseenter', () => {
      this.updateLinkHoverState({hovering: true});
    });
    this.projectLink.addEventListener('mouseleave', () => {
      this.updateLinkHoverState({hovering: false});
    });
  
  }

  removeEvents() {

    this.enableUserInteraction = false;

    emitter.off(events.CONTENT_LOADED, this.initDomGL);
    emitter.off(events.LOADING_ANIM_COMPLETED, this.playEnterAnim);
    emitter.off(events.LOAD_PROJECT_CONTENT, this.populateContent);
    emitter.off(events.MOUSE_DOWN, this.enableScrollMode);
    emitter.off(events.MOUSE_UP, this.disableScrollMode);
    
    this.projectLink.removeEventListener('mouseenter', () => {
      this.updateLinkHoverState({hovering: true});
    });
    this.projectLink.removeEventListener('mouseleave', () => {
      this.updateLinkHoverState({hovering: false});
    });

  }

  initDomGL = () => {

    const params = {
      referenceElement: this.domGLReferenceElement,
      media: contentManager.ProjectMedia, 
      getFirstQuad: true
    }

    super.initDomGL({view: "PROJECTS", params});

  }

  populateContent = (contentIndex) => {

    const projectContent = contentManager.Projects[contentIndex];
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
    document.querySelector('.project-container').classList.add('project-container--scrolling');
    this.inScrollMode = true;
    this.enableUserInteraction = false;
    emitter.emit(events.ENTER_SCROLL_MODE);
    this.animateProjectContent();

  }

  disableScrollMode = () => {

    if(window.hoveringLink) return;
    document.querySelector('.project-container').classList.remove('project-container--scrolling');
    this.inScrollMode = false;
    this.enableUserInteraction = true;
    emitter.emit(events.EXIT_SCROLL_MODE);
    this.animateProjectContent();

  }

  playEnterAnim = () => {

    if(this.enterAnim) this.enterAnim.kill();
    this.enterAnim = gsap.timeline({
      onStart: () => {
        emitter.emit(events.REVEAL_QUADS);
      }
    });

    const ease = "sine.inOut";
    const startX = 20;
    const dur = 0.85

    this.enterAnim.fromTo(this.projectTitle, {
      opacity: 0.01,
      y: -startX,
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      ease: ease
    }, "<");

    this.enterAnim.fromTo(this.projectContentInfo, {

      opacity: 0.01,
      y: startX

    }, {

      duration: dur,
      opacity: 0.99,
      y: 0,
      stagger: 0.05,
      // ease: ease

    // }, "<0.3");
    }, "<0.05");

    this.enterAnim.fromTo(this.projectLink, {
      opacity: 0.01,
      y: startX
    },
    {
      duration: dur,
      opacity: 0.99,
      y: 0,
      ease: ease
    }, "<0.01");

  }

  playLeaveAnim = () => {

    if(this.leaveAnim) this.leaveAnim.kill();
    this.leaveAnim = gsap.timeline();
    const ease = "sine.inOut";
    const dur = 0.75;
    const targetX = -20;

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
    }, "<0.01");

    this.leaveAnim.to(this.projectLink,
    {
      duration: dur,
      opacity: 0.01,
      ease: ease
    }, "<0.01");

  }

  animateProjectContent() {

    const scrolling = this.inScrollMode;
    const pow =  "power1.out";

    if(this.scrollAnim) this.scrollAnim.kill();
    this.scrollAnim = gsap.timeline({});
    this.scrollAnim.fromTo(this.projectTitle, {
      y: scrolling ? 0 : -10
    },
    {
      duration: scrolling ? 0.1 : 0.75,
      y: 0,
      opacity: scrolling ? 0.01 : 0.99,
      ease: pow
    }, "<");
    this.scrollAnim.to(this.projectContentInfo, {
      opacity: scrolling ? 0.01 : 0.99,
      duration: scrolling ? 0.1 : 1.0,
      stagger: scrolling ? 0.0 : 0.1,
    }, scrolling ? "<" : "<0.05")
    this.scrollAnim.to(this.projectLink,
    {
      duration: scrolling ? 0.1 : 0.5,
      opacity: scrolling ? 0.01 : 0.99,
      ease: pow
    }, scrolling ? "<" : "<0.05");

  }

  updateLinkHoverState({hovering}) {

    if(this.inScrollMode === false) {
      if(hovering) {
        emitter.emit(events.HOVERING_LINK)
        window.hoveringLink = hovering;
      } else {
        emitter.emit(events.LEAVING_LINK)
        window.hoveringLink = false;
      }

    }

  }

}
