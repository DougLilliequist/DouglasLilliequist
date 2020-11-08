import {
    ProjectContent
  } from '../../../static/ProjectContent.js';
  
  import {Project} from './Project.js';


class Projects {

    constructor() {

        this.el = document.createElement('div');
        this.el.classList.add('projects');
        
        this.project = [];

        this.initProjects();

        this.project.map((project) => {

            this.el.appendChild(project.el);

        });

    }

    initProjects() {

        // ProjectContent.map((content, i) => {

            const {title, type, description, tech, year, role, link} = ProjectContent[0];

            // const initState = i > 0 ? false : true;

            const project = new Project(0, true, {
                title,
                type,
                year,
                role,
                description,
                tech,
                link
            });

            this.project.push(project);


        // });

    }

    computeBounds() {

        this.project.map((project) => {

            project.computeBounds();

        }); 

    }

}

const projects = new Projects();
export default projects;