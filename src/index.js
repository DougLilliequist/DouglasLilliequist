// import Home from "./Views/Home/Home.js";
import Work from "./Views/Work/Work.js";
import About from "./Views/About/About.js";

import WebGLContext from "./Webgl/WebGLContext.js";

import LoadingScreen from './LoadingScreen.js'; 
import Navigation from './Navigation.js';
import Cursor from '../src/CanvasComponents/Cursor.js';

import Transition from "./Transitions/Transition.js";
import ViewMediator from "./Views/ViewMediator.js";

import contentManager from './ContentManager.js'

export default class App {
    constructor() {

        window.viewMediator = new ViewMediator({
            work: Work,
            about: About,
            transition: Transition
        });

        this.loadingScreen = new LoadingScreen();
        
        window.contentLoaded = false;

        this.cursor = new Cursor();

        this.navigation = new Navigation();

        this.webGLCTX = new WebGLContext();
        
        contentManager.initContent();

    }

}

window.onload = () => new App();