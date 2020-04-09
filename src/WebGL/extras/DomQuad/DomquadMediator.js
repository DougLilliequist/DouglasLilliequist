import { Transform } from "../../../../vendors/ogl/src/core/Transform";
import eventEmitter from "../../../EventEmitter";
import events from "../../../../utils/events";
const emitter = eventEmitter.emitter;

export default class DomquadMediator extends Transform {

    constructor(gl, scene, camera) {

        super();

        this.scene = scene;

        this.camera = camera;

        this.quadsLoaded = false;

    }
    
    unloadQuads = () => {

        let quads = [...this.children];
        
        quads.forEach((quad) => {
            quad.dispose();
            this.removeChild(quad);
        });

        quads.legth = 0;
        quads = null;

    }

}