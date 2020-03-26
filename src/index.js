import WebGLContext from "./Webgl/WebGLContext.js";

import viewMediator from "./ViewMediator";

window.viewMediator = viewMediator;

export default class App {
    constructor() {
        const webGLCTX = new WebGLContext();
    }
}

window.onload = () => new App();