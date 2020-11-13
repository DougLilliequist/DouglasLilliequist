import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../../../utils/events.js';

import {
    ProjectContent
  } from '../../../static/ProjectContent.js';

import {gsap} from 'gsap';
import {SplitText} from '../../../vendors/gsap/SplitText.js';
gsap.registerPlugin(SplitText);

export class ProjectLink {

    constructor(project) {

        this.project = project;

        this.el = document.createElement('div');
        this.el.classList.add('project-title');

        this.initLinks();
        // this.initEvents();

    }

    initLinks() {

        this.link = []

        ProjectContent.map((content) => {

            const {title} = content;

            const projectLink = document.createElement('h1');
            projectLink.classList.add('project-title__title');
            projectLink.innerText = title;
            
            projectLink.addEventListener('click', ()=> {
                emitter.emit(events.SHOW_PROJECT, {desiredProject: title})
            });

            projectLink.addEventListener('mouseenter', () => {
                globals.HOVERING_LINK = true;
                emitter.emit(events.HOVERING_LINK);
            });
            
            projectLink.addEventListener('mouseleave', () => {
                globals.HOVERING_LINK = false;
                emitter.emit(events.LEAVING_LINK);
            });

            gsap.set(projectLink, {
                yPercent: 100
            });

            this.link.push(projectLink);
            this.el.appendChild(projectLink);

        });

    }

    showLink(projectIndex) {

        gsap.to(this.link[projectLink], {
            duration: 0.5,
            yPercent: 0
        });

    }

    hideLink(projectIndex) {


    }

    // initEvents() {

    //     this.el.addEventListener('mouseenter', this.onHover);
    //     this.el.addEventListener('mouseleave', this.onLeave);

    // }

    // onClick = () => {

    //     emitter.emit(events.SHOW_PROJECT, this.project);

    // }

    // onHover = () => {

    //     globals.HOVERING_LINK = true;
    //     emitter.emit(events.HOVERING_LINK);

    //   }
  
    //   onLeave = () => {

    //     globals.HOVERING_LINK = false;
    //     emitter.emit(events.LEAVING_LINK);

    //   }

}