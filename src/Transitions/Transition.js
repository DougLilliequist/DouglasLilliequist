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
        transitionSlide.animate({
            leaving: false
        });
    }

    out({
        from,
        done
    }) {

        emitter.emit(events.PREPARE_UNMOUNT);
        transitionSlide.animate({
            leaving: true
        }).then(() => {
            done();
        });
        // gsap.delayedCall(1.0, () => {
        //     done();
        // })

    }

}