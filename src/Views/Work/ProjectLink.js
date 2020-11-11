import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import {gsap} from 'gsap';
import {SplitText} from '../../../vendors/gsap/SplitText.js';
gsap.registerPlugin(SplitText);

export class ProjectLink {

    constructor(project) {

        this.project = project;
        this.initElement();
        this.initEvents();

    }

    initElement() {

        this.el = document.createElement('div');
        this.el.classList.add('project-title');
        this.projectTitle = document.createElement('h1');
        this.projectTitle.classList.add('project-title__title');
        this.projectTitle.innerText = this.project;
        this.el.appendChild(this.projectTitle);

    }

    initEvents() {

        this.el.addEventListener('click', this.onClick);
        this.el.addEventListener('mouseenter', this.onHover);
        this.el.addEventListener('mouseleave', this.onLeave);

    }

    onClick = () => {

        emitter.emit(events.SHOW_PROJECT, this.project);

    }

    onHover = () => {

        globals.HOVERING_LINK = true;
        emitter.emit(events.HOVERING_LINK);

      }
  
      onLeave = () => {

        globals.HOVERING_LINK = false;
        emitter.emit(events.LEAVING_LINK);

      }

}