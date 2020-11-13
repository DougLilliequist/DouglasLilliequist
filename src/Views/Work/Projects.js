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
        this.link = [];

        // this.initLinks();
        this.initProjects();

        // this.link.map((link) => {
        //     this.el.appendChild(link.el);
        // });

        this.project.map((project) => {
            this.el.appendChild(project.el);
        });

    }

    initLinks() {

        ProjectContent.map((content, i) => {

            const {title} = content;
            const link = new ProjectLink(title);
            this.link.push(link);

        });


    }

    initProjects() {

        ProjectContent.map((content, i) => {

            // if(i !== 3) return;

            const {title, type, description, tech, year, role, link} = content;

            // const projectLink = new ProjectLink(title);
            // this.link.push(projectLink);

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