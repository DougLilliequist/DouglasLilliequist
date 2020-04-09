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
        gsap.fromTo(to, 
        {
            opacity: 0
        },{
            duration: 1.0,
            opacity: 1,
            onComplete: () => {
                done();
            }
        })

    }

    out({
        from,
        done
    }) {

        gsap.to(from, {
            duration: 1.0,
            opacity: 0,
            onStart: () => {
                emitter.emit(events.PREPARE_UNMOUNT);
            },
            onComplete: () => {
                done();
            }
        })

    }

}