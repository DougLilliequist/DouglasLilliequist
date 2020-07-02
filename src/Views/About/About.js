import View from "../View.js";

import contentManager from '../../ContentManager.js';

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import StickyComponent from '../../StickyComponent.js';

import {
  gsap
} from 'gsap';

export default class About extends View {
  onEnter() {
    super.onEnter();
    this.initReferences();
    this.initEvents();
    if (window.contentLoaded) {
      this.populateContent();
      this.links.forEach((link) => {
        link.stickyTransform = new StickyComponent({
          domElement: link,
          enable: true
        });
      });
      this.initDomGL();
    }

  }
  onEnterCompleted() {
    super.onEnterCompleted();

    if (window.contentLoaded) {
      this.playEnterAnim();
    }
  }

  onLeave() {
    super.onLeave();
    this.playLeaveAnim();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    this.removeEvents();
    emitter.emit(events.REMOVE_DOMGL);
  }

  initOnComplete() {
    super.initOnComplete();
  }

  initReferences() {

    this.domGLReferenceElement = this.el.querySelector('.portrait-container__portrait');
    this.header = document.querySelector('.about-copy__intro__header');
    this.introText = document.querySelector('.about-copy__intro__body-text');
    this.contactHeader = document.querySelector('.contact-container__header');
    this.links = document.querySelectorAll('.contact-container__methods__transform');

  }

  initEvents() {

    emitter.on(events.CONTENT_LOADED, this.initDomGL);


    emitter.on(events.LOADING_ANIM_COMPLETED, () => {
      this.populateContent();
      this.playEnterAnim();
      this.links.forEach((link) => {
        link.stickyTransform = new StickyComponent({
          domElement: link,
          enable: true
        });
      });
    });

  }

  removeEvents() {

    this.links.forEach((link) => {
      link.stickyTransform.deActivate();
      link.stickyTransform = null;
    });

    emitter.off(events.LOADING_ANIM_COMPLETED, () => {
      this.populateContent();
      this.initDomGL();
      this.playEnterAnim();
    });

  }

  initDomGL = () => {

    const params = {
      referenceElement: this.domGLReferenceElement,
      media: contentManager.AboutMedia[0]
    }

    super.initDomGL({
      view: "ABOUT",
      params
    });

  }

  populateContent() {

    const aboutContent = contentManager.About[0];
    this.header.innerHTML = aboutContent.title;
    this.introText.innerHTML = aboutContent.introText;
    this.contactHeader.innerHTML = aboutContent.contactHeader;
    this.links.forEach((link, i) => {

      const anchor = link.getElementsByTagName('a')[0];
      anchor.innerHTML = aboutContent.contactMethods[i].type;
      anchor.href = aboutContent.contactMethods[i].url;

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
    const startY = -10;
    const ease = "linear";

    const enterAnim = gsap.timeline({
      onStart: () => {
        emitter.emit(events.REVEAL_QUADS);
      },
      // onComplete: () => {
      //   this.links.forEach((link) => {
      //     link.children[0].classList.add('link--enabled');
      //   });
      // }
    });

    enterAnim.fromTo(this.header, {
      opacity: 0,
      y: startY
    }, {
      duration: dur,
      opacity: 1,
      y: 0,
      z: 0,
      // ease: ease
    }, "<0.1");

    enterAnim.fromTo(this.introText, {
      opacity: 0,
      y: startY
    }, {
      duration: dur,
      opacity: 1,
      y: 0,
      z: 0,
      // ease: ease
    }, "<0.1");

    enterAnim.fromTo(this.contactHeader, {
      opacity: 0,
      y: startY
    }, {
      duration: dur,
      opacity: 1,
      y: 0,
      z: 0,
      // ease: ease
    }, "<0.1");

    enterAnim.fromTo(this.links, {
      opacity: 0,
    }, {
      duration: dur,
      opacity: 1,
      stagger: 0.1,
      z: 0
    }, "<0.1");

  }

  playLeaveAnim() {

    const dur = 0.5;
    const ease = "sine.in";

    const leaveAnim = gsap.timeline({

      onComplete: () => {
        this.links.forEach((link) => {
          link.children[0].classList.remove('link--enabled');
        });
      }

    });

    leaveAnim.to(this.links, {
      duration: dur,
      opacity: 0,
      stagger: -0.05,
      z: 0,
      ease: ease
    }, "<");

    leaveAnim.to(this.contactHeader, {
      duration: dur,
      opacity: 0,
      ease: ease,
      z: 0,
    }, "<0.05");

    leaveAnim.to(this.introText, {
      duration: dur,
      opacity: 0,
      ease: ease,
      z: 0,
    }, "<0.05");

    leaveAnim.to(this.header, {
      duration: dur,
      opacity: 0,
      ease: ease,
      z: 0
    }, "<0.05");

  }

}