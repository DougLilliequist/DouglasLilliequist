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
        
        this.children.map((quad) => {
            quad.visible = false;
        });

    }

}