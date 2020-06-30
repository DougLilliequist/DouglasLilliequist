import Work from "./Views/Work/Work.js";
import About from "./Views/About/About.js";

import WebGLContext from "./Webgl/WebGLContext.js";

import LoadingScreen from './LoadingScreen.js';
import Navigation from './Navigation.js';
import Cursor from '../src/CanvasComponents/Cursor.js';

import Transition from "./Transitions/Transition.js";
import ViewMediator from "./Views/ViewMediator.js";
import Bowser from "bowser";

import contentManager from './ContentManager.js'

export default class App {
    constructor() {

        window.viewMediator = new ViewMediator({
            work: Work,
            about: About,
            transition: Transition
        });

        this.navigation = new Navigation();

        this.loadingScreen = new LoadingScreen();

        window.contentLoaded = false;

        const browser = Bowser.getParser(window.navigator.userAgent);
        const {
            type
        } = browser.parsedResult.platform;

        window.isMobile = type !== "desktop";

        if (!window.isMobile) {
            this.cursor = new Cursor();
        }

        this.webGLCTX = new WebGLContext({
            canvas: document.querySelector('.webgl-canvas')
        });

        contentManager.initContent();

    }

}

window.onload = () => new App();