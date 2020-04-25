import Highway from "@dogstudio/highway";
import eventEmitter from '../EventEmitter';
const emitter = eventEmitter.emitter;
import events from '../../utils/events.js'

import {gsap} from 'gsap';

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

        gsap.to(from, {
            duration: 1.0,
            onStart: () => {
                emitter.emit(events.PREPARE_UNMOUNT);
            },
            onComplete: () => {
                // gsap.delayedCall(0.1, () => {
                    done();
                // });
            }
        })
        // emitter.emit(events.PREPARE_UNMOUNT);
        // gsap.delayedCall(1.1, () => {
        //     done();
        // });

    }

}