import WebGLContext from "./Webgl/WebGLContext.js";

import Home from "./Views/Home/Home.js";
import Projects from "./Views/Projects/Projects.js";
import About from "./Views/About/About.js";

import Cursor from '../src/CanvasComponents/Cursor.js';

import Transition from "./Transitions/Transition.js";
import ViewMediator from './ViewMediator.js';

// import viewMediator from "./ViewMediator";

export default class App {
    constructor() {
        
        const cursor = new Cursor();
        const webGLCTX = new WebGLContext();

        window.viewMediator = new ViewMediator({
            home: Home,
            projects: Projects,
            about: About,
            transition: Transition
        });

    }
}

window.onload = () => new App();