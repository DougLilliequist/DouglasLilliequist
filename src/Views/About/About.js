import View from "../View.js";

import mediaManager from '../../MediaManager.js';

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import {gsap} from 'gsap';

export default class About extends View {
  onEnter() {
    super.onEnter();

    this.domGLReferenceElement = this.el.querySelector('.portrait-container__portrait');
    
    this.initReferences();

    this.initEvents();

  }
  onEnterCompleted() {
    super.onEnterCompleted();
    emitter.emit(events.INIT_DOMGL, {view: "ABOUT", params: {referenceElement: this.domGLReferenceElement, media: mediaManager.images[0]}});
    this.playEnterAnim();
  }

  onLeave() {
    super.onLeave();
    this.playLeaveAnim();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    emitter.emit(events.REMOVE_DOMGL);
  }

  initOnComplete() {
    // super.initOnComplete();
  }

  initReferences() {

    this.header = document.querySelector('.about-copy__intro__header');
    this.introText = document.querySelector('.about-copy__intro__body-text');
    this.contactHeader = document.querySelector('.contact-container__header');
    this.links = document.querySelectorAll('.contact-container__methods__wrapper');

  }

  initEvents() {

    this.links.forEach((link) => {

      link.addEventListener('mouseenter', this.onLinkHover);
      link.addEventListener('mouseleave', this.onLinkLeave);

    });

  }

  removeEvents() {

    this.links.forEach((link) => {

      link.removeEventListener('mouseenter', this.onLinkHover);
      link.removeEventListener('mouseleave', this.onLinkLeave);

    });

  }

  onLinkHover = () => {

    emitter.emit(events.HOVERING_LINK);

  }

  onLinkLeave = () => {

    emitter.emit(events.LEAVING_LINK);

  }

  playEnterAnim() {

    const dur = 0.85;
    const startY = 10;
    const ease = "linear";

    const enterAnim = gsap.timeline(
      {
      onComplete: () => {
        this.links.forEach((link) => {
          link.children[0].classList.add('link--enabled');
        });
      }
    });
    
    enterAnim.fromTo(this.header, {
      opacity: 0.01,
      y: startY
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      // ease: ease
    }, "<0.1");

    enterAnim.fromTo(this.introText, {
      opacity: 0.01,
      y: startY
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      // ease: ease
    }, "<0.05");

    enterAnim.fromTo(this.contactHeader, {
      opacity: 0.01,
      y: startY
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      // ease: ease
    }, "<0.05");

    enterAnim.fromTo(this.links, {
      opacity: 0.01,
      y: startY
    }, {
      duration: dur,
      opacity: 0.99,
      y: 0,
      stagger: 0.1,
      // ease: ease
    }, "<0.05");

  }

  playLeaveAnim() {

    const dur = 0.5;
    const textY = 10;
    const ease = "sine.inOut";

    const leaveAnim = gsap.timeline({

      onComplete: () => {
        this.links.forEach((link) => {
          link.children[0].remove('link--enabled');
        });
      }

    });
    
    // leaveAnim.to(this.header, {
    //   duration: dur,
    //   opacity: 0.01,
    //   y: textY,
    //   ease: ease
    // }, "<");

    // leaveAnim.to(this.introText, {
    //   duration: dur,
    //   opacity: 0.01,
    //   y: textY,
    //   ease: ease
    // }, "<0.05");

    // leaveAnim.to(this.contactHeader, {
    //   duration: dur,
    //   opacity: 0.01,
    //   y: textY,
    //   ease: ease
    // }, "<0.05");

    // leaveAnim.to(this.links, {
    //   duration: dur,
    //   opacity: 0.01,
    //   y: textY,
    //   stagger: -0.05,
    //   ease: ease
    // }, "<0.05");

    leaveAnim.to(this.links, {
      duration: dur,
      opacity: 0.01,
      y: textY,
      stagger: -0.05,
      ease: ease
    }, "<");

    leaveAnim.to(this.contactHeader, {
      duration: dur,
      opacity: 0.01,
      y: textY,
      ease: ease
    }, "<0.1");

    leaveAnim.to(this.introText, {
      duration: dur,
      opacity: 0.01,
      y: textY,
      ease: ease
    }, "<0.1");

    leaveAnim.to(this.header, {
      duration: dur,
      opacity: 0.01,
      y: textY,
      ease: ease
    }, "<0.1");

  }

}
