import Highway from "@dogstudio/highway";
import eventEmitter from '../EventEmitter';
const emitter = eventEmitter.emitter;
import events from '../../utils/events.js'
import transitionSlide from '../TransitionSlide';

import {
    gsap
} from 'gsap';

export default class Transition extends Highway.Transition {

    in ({
        from,
        to,
        done
    }) {

        from.remove();
        done();

    }

    out({
        from,
        done
    }) {

        emitter.emit(events.PREPARE_UNMOUNT);
        gsap.to(this, {
            duration: 1.0,
            onComplete: () => {
                done();
            }
        });

    }

}