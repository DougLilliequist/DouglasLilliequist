import Home from "./Views/Home/Home.js";
import Projects from "./Views/Projects/Projects.js";
import About from "./Views/About/About.js";

import WebGLContext from "./Webgl/WebGLContext.js";

import LoadingScreen from './LoadingScreen.js'; 
import navigation from './Navigation.js';
import Cursor from '../src/CanvasComponents/Cursor.js';

import Transition from "./Transitions/Transition.js";
import ViewMediator from "./Views/ViewMediator.js";

import contentManager from './ContentManager.js'

import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

export default class App {
    constructor() {

        window.viewMediator = new ViewMediator({
            // home: Home,
            projects: Projects,
            about: About,
            transition: Transition
        });

        this.loadingScreen = new LoadingScreen();

        window.navigation = navigation;
        
        window.contentLoaded = false;

        this.cursor = new Cursor();

        this.webGLCTX = new WebGLContext();
        
        this.initEvents();

        contentManager.initContent();

    }

    initEvents() {

        viewMediator.on('NAVIGATE_IN', ({to, location}) => {

            this.updateNavigation(location);

        });

        emitter.on(events.CONTENT_LOADED, () => {
        
        });

    }

    updateNavigation(location) {

        window.navigation.links.forEach((link) => {

            link.classList.remove('link--active');

            if(link.href === location.href) link.classList.add('link--active');

        })

    }

}

window.onload = () => new App();