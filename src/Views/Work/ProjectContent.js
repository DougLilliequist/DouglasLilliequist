import {gsap} from 'gsap';

export default class ProjectContent {

    constructor(project, {
        title = '',
        year = '',
        role = '',
        description = '',
        body = '',
        link = ''
    }) {



    }

    revealContent = () => {

        
    }

    hideContent = () => {


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