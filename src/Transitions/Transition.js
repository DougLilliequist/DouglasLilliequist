import Highway from "@dogstudio/highway";

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
            duration: 0.5,
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
            onComplete: () => {
                done();
            }
        })

    }

}