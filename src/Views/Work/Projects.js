import {
    ProjectContent
  } from '../../../static/ProjectContent.js';
  
  import {Project} from './Project.js';
  import {ProjectLink} from './ProjectLink.js';


class Projects {

    constructor() {

        this.el = document.createElement('div');
        this.el.classList.add('projects');
        
        this.project = [];
        // this.link = [];

        this.initProjects();

        this.project.map((project) => {
            this.el.appendChild(project.el);
        });

    }

    initProjects() {

        ProjectContent.map((content, i) => {

            const {title, type, description, tech, year, role, link} = content;

            const initState = i > 0 ? false : true;

            const project = new Project(i, {
                viewing: initState,
                title,
                type,
                year,
                role,
                description,
                tech,
                link
            });

            this.project.push(project);

        });

    }

}

const projects = new Projects();
export default projects;