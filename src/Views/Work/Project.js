import events from '../../../utils/events.js';
import globals from '../../../utils/globals.js';
import eventEmitter from '../../EventEmitter.js';
const emitter = eventEmitter.emitter;

import {gsap} from 'gsap';
import {SplitText} from '../../../vendors/gsap/SplitText.js';
gsap.registerPlugin(SplitText);

/**
 * 
 * TODO:
 * 
 * Import split text
 * import exit button SVG
 * 
 * build animation functions
 * 
 */

export class Project {

    constructor(projectID,{
        viewing = false,
        title = '',
        year = '',
        type = '',
        role = '',
        description = '',
        tech = '',
        link = ''
    }) {

      /**
       * @param projectID : string
       * @param title : string
       * @param year : string
       * @param type : string
       * @param role : string
       * @param description : string
       * @param tech : string
       * @param link : url if available
       */

      this.projectID = projectID + 1;
      this.title = title;
      this.year = year;
      this.type = type;
      this.role = role;
      this.description = description;
      this.tech = tech;
      this.link = link;

      console.log(SplitText)

      this.el = document.createElement('div');
      this.el.classList.add('project-content');

      this.projectInfo = document.createElement('div');
      this.projectInfo.classList.add('project-info');
      this.el.appendChild(this.projectInfo);

      this.projectInfoElements = [];

      this.initProjectTitle();
      this.initViewbutton();
      this.initProjectNumber();
      this.initMiscInfoElements();
      this.initProjectDescription();
      this.initProjectTech();
      this.initProjectLink();
      this.initExitButton();

      this.projectInfoElements.map((container) => {
        this.splitTextElements(container);
        this.projectInfo.appendChild(container.el);
      });

      this.viewing = viewing;
      if(this.viewing) {
        this.el.classList.add('project-content__in-view');
      }

      this.initEvents();

    }

    initProjectTitle() {

      this.projectTitleContainer = this.createContainerElement({className: 'project-title'});
      this.projectTitle = document.createElement('h1');
      this.projectTitle.classList.add('project-title__title');
      this.projectTitle.innerText = this.title;
      this.projectTitleContainer.el.appendChild(this.projectTitle);
      // this.splitTextElements(this.projectTitleContainer);
      gsap.set(this.projectTitle, {
        yPercent: 100
      });

      this.el.appendChild(this.projectTitleContainer.el);

    }

    initViewbutton() {

      this.viewButtonContainer = this.createContainerElement({className: 'view-button'});
      this.viewButton = document.createElement('p');
      this.viewButton.classList.add('view-button__button');
      this.viewButton.innerText = "view";
      this.viewButtonContainer.el.appendChild(this.viewButton);

      gsap.set(this.viewButton, {
        yPercent: -100
      });
      this.el.appendChild(this.viewButtonContainer.el);

    }

    initProjectNumber() {

      this.projectNumberContainer = this.createContainerElement({className: 'project-number'});
      this.projectNumber = document.createElement('h1');
      this.projectNumber.classList.add('project-number__number');
      this.projectNumber.innerText = this.projectID < 10 ? "0"+this.projectID : this.projectID;
      this.projectNumberContainer.el.appendChild(this.projectNumber);

      gsap.set(this.projectNumber, {
        yPercent: -100
      });
      this.el.appendChild(this.projectNumberContainer.el);

    }

    initMiscInfoElements() {

      this.miscInfoContainer = this.createContainerElement({className: 'project-misc'});

      this.projectYearContainer = this.createContainerElement({className: 'project-misc__item'});
      this.projectYear = document.createElement('p');
      this.projectYear.innerText = this.year;
      this.projectYear.classList.add('project-misc__item__copy');
      this.projectYear.id = "project-year";
      this.projectYearContainer.el.appendChild(this.projectYear);
      // this.splitTextElements(this.projectYearContainer);

      this.projectTypeContainer = this.createContainerElement({className: 'project-misc__item'});
      this.projectType = document.createElement('p');
      this.projectType.innerText = this.type;
      this.projectType.classList.add('project-misc__item__copy');
      this.projectType.id = "project-type";
      this.projectTypeContainer.el.appendChild(this.projectType);
      // this.splitTextElements(this.projectTypeContainer);

      this.projectRoleContainer = this.createContainerElement({className: 'project-misc__item'});
      this.projectRole = document.createElement('p');
      this.projectRole.innerText = this.role;
      this.projectRole.classList.add('project-misc__item__copy');
      this.projectRole.id = "project-role";
      this.projectRoleContainer.el.appendChild(this.projectRole);
      // this.splitTextElements(this.projectRoleContainer);

      this.miscInfoContainer.el.appendChild(this.projectYearContainer.el);
      this.miscInfoContainer.el.appendChild(this.projectTypeContainer.el);
      this.miscInfoContainer.el.appendChild(this.projectRoleContainer.el);

      this.projectInfoElements.push(this.miscInfoContainer);

    }

    initProjectDescription() {

      this.projecDescriptionContainer = this.createContainerElement({className: 'project-description'});
      this.projectDescription = document.createElement('p');
      this.projectDescription.classList.add('project-description__copy')
      this.projectDescription.innerHTML = this.description;
      this.projecDescriptionContainer.el.appendChild(this.projectDescription);
      // this.splitTextElements(this.projecDescriptionContainer);

      this.projectInfoElements.push(this.projecDescriptionContainer);

    }

    initProjectTech() {

      this.projectTechContainer = this.createContainerElement({className: 'project-tech'});
      this.projectTech = document.createElement('p');
      this.projectTech.classList.add('project-tech__copy')
      this.projectTech.innerText = this.tech;
      this.projectTechContainer.el.appendChild(this.projectTech);
      // this.splitTextElements(this.projectTechContainer);

      this.projectInfoElements.push(this.projectTechContainer);

    }

    initProjectLink() {

      this.projectLinkContainer = this.createContainerElement({className: 'project-link'});
      if(this.link === '') return;
      this.projectLink = document.createElement('a');
      this.projectLink.classList.add('project-link__link');
      this.projectLink.href = this.link;
      this.projectLink.target = "_blank";
      this.projectLink.innerText = "visit project";
      this.projectLinkContainer.el.appendChild(this.projectLink);
      this.el.appendChild(this.projectLinkContainer.el);

      gsap.set(this.projectLink, {
        opacity: 0
      });

    }

    initExitButton() {

      this.exitButton = this.createContainerElement({className: 'exit-button'});
      this.exitButton.el.classList.add('exit-button');
      this.exitButton.el.innerHTML = '<svg class = "exit-button__icon" width="12" height="12" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M0.292893 1.70711L24.2929 25.7071L25.7071 24.2929L1.70711 0.292893L0.292893 1.70711ZM24.2929 0.292893L0.292893 24.2929L1.70711 25.7071L25.7071 1.70711L24.2929 0.292893Z" fill="white"/></svg>'
      this.el.appendChild(this.exitButton.el);

      gsap.set(this.exitButton.el, {
        opacity: 0
      });
      
    }

    initEvents() {

      // this.projectTitle.addEventListener('click', this.onClick);
      // this.projectTitle.addEventListener('mouseenter', this.onHover);
      // this.projectTitle.addEventListener('mouseleave', this.onLeave);
      
      this.viewButton.addEventListener('click', this.onClick);
      this.viewButton.addEventListener('mouseenter', this.onHover);
      this.viewButton.addEventListener('mouseleave', this.onLeave);
      // emitter.on(events.SHOW_PROJECT, event => {

      //   const {desiredProject}  = event
      //   if(desiredProject === this.projectID) {
      //     this.revealContent();
      //   }

      // });
      
      this.exitButton.el.addEventListener('click', this.onExitClicked);
      this.exitButton.el.addEventListener('mouseenter', this.onHover);
      this.exitButton.el.addEventListener('mouseleave', this.onLeave);

      if(this.projectLink) {
        this.projectLink.addEventListener('mouseenter', this.onHover);
        this.projectLink.addEventListener('mouseleave', this.onLeave);
      }

    }


    onClick = () => {
      emitter.emit(events.SHOW_PROJECT);
    }

    onExitClicked = () => {
      emitter.emit(events.CLOSE_PROJECT);
    }

    onHover = () => {
      globals.HOVERING_LINK = true;
      emitter.emit(events.HOVERING_LINK);
    }

    onLeave = () => {
      globals.HOVERING_LINK = false;
      emitter.emit(events.LEAVING_LINK);
    }

    showTitle = () => {

      gsap.to(this.projectTitle, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 0,
        onComplete: () => {
          this.el.classList.add('project-content__in-view');
        }
      });

      gsap.to(this.projectNumber, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 0,
      });

      gsap.to(this.viewButton, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 0,
      });

    }

    hideTitle = () => {
      gsap.to(this.projectTitle, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: -100,
        onComplete: () => {
          gsap.set(this.projectTitle, {
            yPercent: 100
          });
          this.el.classList.remove('project-content__in-view');
        }
      });

      gsap.to(this.projectNumber, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 100,
        onComplete: () => {
          gsap.set(this.projectNumber, {
            yPercent: -100
          });
        }
      });

      gsap.to(this.viewButton, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 100,
        onComplete: () => {
          gsap.set(this.viewButton, {
            yPercent: -100
          });
        }
      });

    }

    revealContent = () => {

      gsap.to(this.projectTitle, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: -100,
        onComplete: () => {
          gsap.set(this.projectTitle, {
            yPercent: -100
          });
        }
      });

      this.projectInfoElements.map((el) => {

        gsap.fromTo(el.text, 
          {
            yPercent: 100 * (Math.random() > 0.5 ? 1.0 : -1.0) 
          },
          {
          yPercent: 0,
          duration: 0.5,
          stagger: 0.05
        });

      });

      gsap.to(this.exitButton.el, {
        opacity: 1,
        duration: 0.5
    });

      gsap.to(this.projectLink, {
          opacity: 1,
          duration: 0.5
      });

      
      gsap.to(this.projectNumber, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 100,
        onComplete: () => {
          gsap.set(this.projectNumber, {
            yPercent: -100
          });
        }
      });

      gsap.to(this.viewButton, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 100,
        onComplete: () => {
          gsap.set(this.viewButton, {
            yPercent: -100
          });
        }
      });
        
    }

    hideContent() {

      this.showTitle();
      this.projectInfoElements.map((el) => {

        gsap.to(el.text, {
          yPercent: 100 * (Math.random() > 0.5 ? 1.0 : -1.0), 
          duration: 0.5,
          stagger: 0.05,
          onComplete: () => {
            gsap.set(el.text, {
              yPercent: 100
            });
          }
        });

      });

      gsap.to(this.exitButton.el, {
        opacity: 0,
        duration: 0.5
    });

      gsap.to(this.projectLink, {
          opacity: 0,
          duration: 0.5
      });

    }

    splitTextElements(container) {

      container.textClip = new SplitText(container.el, {type: "words"}).words,
      container.text = new SplitText(container.el, {type: "words"}).words 
      
      container.textClip.forEach((word, i) => {
          word.innerText = "";
          word.style.overflow = "hidden";
          word.appendChild(container.text[i]);
      });

      container.text.forEach((word) => {
        gsap.set(word, {
          yPercent: 100
        })
      });

    }

    updateLinkState(state) {

      if(state) {
        this.projectTitleContainer.classList.add('active')
      } else {
        this.projectTitleContainer.classList.remove('active')
      }

    }

    /**
     * Will be used to define bounds that will be needed for clip reveal animations
     * @param className : string
     */
    createContainerElement({className}) {

      const el = document.createElement('div');
      el.classList.add(className);
      return {
        el,
        bounds: {},
        textClip: [],
        text: []
      };

    }

    // computeBounds() {

    //   this.projectInfoElements.map((container) => {

    //     container.bounds = container.el.getBoundingClientRect();

    //   });

    // }

    updateViewModeStyles() {
    
        if (this.viewing) {
          this.el.classList.remove('not-viewing');
        } else {
          this.el.classList.add('not-viewing');
        }
    
      }

}