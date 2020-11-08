import {gsap} from 'gsap';

/**
 * 
 * TODO:
 * 
 * Import split text
 * import exit button SVG
 * 
 * create click event on project title
 * build animation functions
 * 
 */

export class Project {

    constructor(projectID, initState, {
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

      this.projectID = projectID;
      this.title = title;
      this.year = year;
      this.type = type;
      this.role = role;
      this.description = description;
      this.tech = tech;
      this.link = link;

      this.el = document.createElement('div');
      this.el.classList.add('project-content');

      this.containerElements = [];

      this.initSelectionStateElements();
      this.initMiscInfoElements();
      this.initProjectDescription();
      this.initProjectTech();
      this.initProjectLink();
      this.initExitButton();

      this.containerElements.map((container) => {

        this.el.appendChild(container.el);

      });

      this.state = initState;

      console.log(this.containerElements);

      // this.initEvents();

    }

    initSelectionStateElements() {

      this.projectTitleContainer = this.createContainerElement({className: 'project-title'});
      this.projectTitle = document.createElement('h1');
      this.projectTitle.classList.add('project-title__title');
      this.projectTitle.innerText = this.title;
      this.projectTitleContainer.el.appendChild(this.projectTitle);

      this.containerElements.push(this.projectTitleContainer);

    }

    initMiscInfoElements() {

      this.miscInfoContainer = this.createContainerElement({className: 'project-misc'});

      this.projectYearContainer = this.createContainerElement({className: 'project-misc__item'});
      this.projectYear = document.createElement('p');
      this.projectYear.innerText = this.year;
      this.projectYear.classList.add('project-misc__item__copy');
      this.projectYear.id = "project-year";
      this.projectYearContainer.el.appendChild(this.projectYear);

      this.projectTypeContainer = this.createContainerElement({className: 'project-misc__item'});
      this.projectType = document.createElement('p');
      this.projectType.innerText = this.type;
      this.projectType.classList.add('project-misc__item__copy');
      this.projectType.id = "project-type";
      this.projectTypeContainer.el.appendChild(this.projectType);

      this.projectRoleContainer = this.createContainerElement({className: 'project-misc__item'});
      this.projectRole = document.createElement('p');
      this.projectRole.innerText = this.role;
      this.projectRole.classList.add('project-misc__item__copy');
      this.projectRole.id = "project-role";
      this.projectRoleContainer.el.appendChild(this.projectRole);

      this.miscInfoContainer.el.appendChild(this.projectYearContainer.el);
      this.miscInfoContainer.el.appendChild(this.projectTypeContainer.el);
      this.miscInfoContainer.el.appendChild(this.projectRoleContainer.el);

      // this.containerElements.push(this.miscInfoContainer);

    }

    initProjectDescription() {

      this.projecDescriptionContainer = this.createContainerElement({className: 'project-description'});
      this.projectDescription = document.createElement('p');
      this.projectDescription.classList.add('project-description__copy')
      this.projectDescription.innerText = this.description;
      this.projecDescriptionContainer.el.appendChild(this.projectDescription);

      // this.containerElements.push(this.projecDescriptionContainer);

    }

    initProjectTech() {

      this.projectTechContainer = this.createContainerElement({className: 'project-tech'});
      this.projectTech = document.createElement('p');
      this.projectTech.classList.add('project-tech__copy')
      this.projectTech.innerText = this.tech;
      this.projectTechContainer.el.appendChild(this.projectTech);

      // this.containerElements.push(this.projectTechContainer);

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

      // this.containerElements.push(this.projectLinkContainer);

    }

    initExitButton() {

      this.exitButton = this.createContainerElement({className: 'exit-button'});
      this.exitButton.el.classList.add('exit-button');
      this.exitButton.innerHTML = `<svg class = "exit-button__icon" width="12" height="12" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.292893 1.70711L24.2929 25.7071L25.7071 24.2929L1.70711 0.292893L0.292893 1.70711ZM24.2929 0.292893L0.292893 24.2929L1.70711 25.7071L25.7071 1.70711L24.2929 0.292893Z" fill="black"/>
      </svg>"`
      // this.el.appendChild(this.exitButton.el);

    }

    revealContent() {

        
    }

    hideContent() {


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
        bounds: {}
      };

    }

    computeBounds() {

      this.containerElements.map((container) => {

        container.bounds = container.el.getBoundingClientRect();

      });

    }

    updateViewModeStyles({
        viewing
      }) {
    
        if (!viewing) {
    
          document.querySelector('.project-container').classList.add('not-viewing');
          this.exitButton.classList.add('not-viewing');
    
        } else {
    
          document.querySelector('.project-container').classList.remove('not-viewing');
          this.exitButton.classList.remove('not-viewing');
    
        }
    
      }

}