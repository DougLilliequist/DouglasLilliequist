import Work from "./Views/Work/Work.js";
import About from "./Views/About/About.js";

import WebGLContext from "./WebGL/WebGLContext.js";

import LoadingScreen from './LoadingScreen.js';
import NoMobileCTA from './NoMobileCTA.js';
import Navigation from './Navigation.js';
import Cursor from '../src/CanvasComponents/Cursor.js';

import Transition from "./Transitions/Transition.js";
import ViewMediator from "./Views/ViewMediator.js";
import Bowser from "bowser";

export default class App {
    constructor() {

        const browser = Bowser.getParser(window.navigator.userAgent);
        const {
            type
        } = browser.parsedResult.platform;

        window.isMobile = type !== "desktop";

        if (window.isMobile) {
            this.noMobileCTA = new NoMobileCTA();
            return;
        }

        this.loadingScreen = new LoadingScreen();

        window.contentLoaded = false;

        if (!window.isMobile) {
            this.cursor = new Cursor();
        }

        this.webGLCTX = new WebGLContext({
            canvas: document.querySelector('.webgl-canvas')
        });

        window.viewMediator = new ViewMediator({
            work: Work,
            about: About,
            transition: Transition
        });

        this.navigation = new Navigation();

    }

}

window.onload = () => new App();