import View from "../View.js";

import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import {
  AboutContent
} from '../../../static/AboutContent.js';

import StickyComponent from '../../StickyComponent.js';

import {
  gsap
} from 'gsap';

import {SplitText} from '../../../vendors/gsap/SplitText.js';
gsap.registerPlugin(SplitText);

import globals from "../../../utils/globals.js";

export default class About extends View {
  onEnter() {
    super.onEnter();

    globals.CURRENT_VIEW = "about";
    emitter.emit(events.UPDATE_CURRENT_VIEW);

    this.initReferences();
    this.populateContent();
    this.initEvents();
    this.initDomGL();
  }
  onEnterCompleted() {
    super.onEnterCompleted();
    if (globals.CONTENT_LOADED) {
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
    
    this.resetTextSplit(this.header);
    this.resetTextSplit(this.introText);
    this.resetTextSplit(this.contactHeader);

  }

  initOnComplete() {
    super.initOnComplete();
  }

  initReferences() {

    this.domGLReferenceElement = this.el.querySelector('.portrait-container__portrait');
    this.header = document.querySelector('.about-copy__header');
    this.introText = document.querySelector('.about-copy__body-text');
    this.contactHeader = document.querySelector('.contact-container__header');
    this.links = document.querySelectorAll('.contact-container__methods__link');

  }

  initEvents() {

    emitter.on(events.LOADING_ANIM_COMPLETED, () => {
      this.playEnterAnim();
    });

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

    emitter.off(events.LOADING_ANIM_COMPLETED, () => {
      this.playEnterAnim();
    });

  }

  initDomGL() {

    const params = {
      referenceElement: this.domGLReferenceElement,
    }

    super.initDomGL({
      view: "ABOUT",
      params
    });

  }

  populateContent() {

    const aboutContent = AboutContent[0];
    this.header.innerHTML = aboutContent.title;
    this.introText.innerHTML = aboutContent.introText;
    this.contactHeader.innerHTML = aboutContent.contactHeader;
    this.links.forEach((link, i) => { 

      link.innerHTML = aboutContent.contactMethods[i].type;
      link.href = aboutContent.contactMethods[i].url;

    });

  }

  onLinkHover = () => {

    globals.HOVERING_LINK = true;
    emitter.emit(events.HOVERING_NAV_LINK, true);

  }

  onLinkLeave = () => {
    globals.HOVERING_LINK = false;
    emitter.emit(events.HOVERING_NAV_LINK, false);

  }

  playEnterAnim() {

    const dur = 0.85;
    const ease = "power1.out";
    emitter.emit(events.REVEAL_QUADS);

    this.splitTextElements(this.header);
    this.splitTextElements(this.introText);
    this.splitTextElements(this.contactHeader);

    // gsap.to(this.introText.text.words, {
    //   duration: 0.5,
    //   yPercent: 0,
    //   stagger: 0.015,
    // });

    // gsap.to(this.introText.text.words, {
    //   duration: 0.5,
    //   yPercent: 0,
    //   stagger: 0.015,
    // });

    // gsap.to(this.introText.text.words, {
    //   duration: 0.5,
    //   yPercent: 0,
    //   stagger: 0.015,
    // });

    const enterAnim = gsap.timeline({
      onStart: () => {
        // emitter.emit(events.REVEAL_QUADS);
      },
    });

    enterAnim.to(this.header.text.words,
      {
      duration: dur,
      yPercent: 0,
      ease: ease
    });

    enterAnim.to(this.introText.text.words,
    {
      duration: dur,
      yPercent: 0,
      stagger: 0.005,
      ease: ease
    }, "<0.5");

    enterAnim.to(this.contactHeader.text.words, 
      {
        duration: dur,
        yPercent: 0,
        ease: ease,
        stagger: 0.005
    }, "<0.5");

    enterAnim.fromTo(this.links, {
      opacity: 0,
      yPercent: 100,
    }, {
      duration: dur,
      opacity: 1.0,
      stagger: 0.1,
      yPercent: 0,
      ease
    }, "<0.5");

  }

  playLeaveAnim() {

    const dur = 0.5;
    const ease = "sine.in";

    const leaveAnim = gsap.timeline({

      onComplete: () => {
        this.links.forEach((link) => {
          link.classList.remove('link--enabled');
        });
      }

    });

    leaveAnim.to(this.links, {
      duration: dur,
      opacity: 0,
      stagger: -0.05,
      ease: ease
    }, "<");

    leaveAnim.to(this.contactHeader, {
      duration: dur,
      opacity: 0,
      ease: ease,
    }, "<0.05");

    leaveAnim.to(this.introText, {
      duration: dur,
      opacity: 0,
      ease: ease,
    }, "<0.05");

    leaveAnim.to(this.header, {
      duration: dur,
      opacity: 0,
      ease: ease,
    }, "<0.05");

  }

  splitTextElements(el, type = "words") {

    el.textClip = new SplitText(el, {type}),
    el.text = new SplitText(el, {type}) 
    
    el.textClip.words.forEach((word, i) => {
        word.innerText = "";
        word.style.overflow = "hidden";
        word.appendChild(el.text.words[i]);
    });

    el.text.words.forEach((word) => {
      gsap.set(word, {
        yPercent: 100
      })
    }); 

  }

  resetTextSplit(el) {

    el.textClip.revert();
    el.text.revert();

  }

}