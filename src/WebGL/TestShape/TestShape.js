import {
    Box
} from '../../../vendors/ogl/src/extras/Box';
import {
    Mesh
} from '../../../vendors/ogl/src/core/Mesh';
import {
    Program
} from '../../../vendors/ogl/src/core/Program';

import vert from './shaders/testShape.vert';
import frag from './shaders/testShape.frag';

export default class TestShape extends Mesh {

    constructor(gl) {

        super(gl);

        this.geometry = new Box(this.gl, .1, .1, .1);

        this.program = new Program(this.gl, {
            vertex: vert,
            fragment: frag
        });

    }

}