import WebGLContext from "./Webgl/WebGLContext.js";

import Home from "./Views/Home/Home.js";
import Projects from "./Views/Projects/Projects.js";
import About from "./Views/About/About.js";

import navigation from './Navigation.js';
import Cursor from '../src/CanvasComponents/Cursor.js';

import Transition from "./Transitions/Transition.js";
import ViewMediator from "./Views/ViewMediator.js";

import eventEmitter from './EventEmitter';
const emitter = eventEmitter.emitter;

export default class App {
    constructor() {
        
        window.viewMediator = new ViewMediator({
            // home: Home,
            projects: Projects,
            about: About,
            transition: Transition
        });

        window.navigation = navigation;

        const cursor = new Cursor();
        const webGLCTX = new WebGLContext();

        this.initEvents();

    }

    initEvents() {

        viewMediator.on('NAVIGATE_IN', ({to, location}) => {

            this.updateNavigation(location);

        });

        emitter.on("show", () =>{
            console.log('drrrr');
        })

    }

    updateNavigation(location) {

        window.navigation.links.forEach((link) => {

            link.classList.remove('link--active');

            if(link.href === location.href) link.classList.add('link--active');

        })

    }

}

window.onload = () => new App();