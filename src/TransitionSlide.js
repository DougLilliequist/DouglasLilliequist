import {
    gsap
} from 'gsap';

class TransitionSlide {

    constructor() {

        this.el = document.querySelector('.transition-slide');

        gsap.set(this.el, {
            xPercent: 0,
            yPercent: 100,
            zPercent: 0
        });

    }

    animate({
        leaving
    }) {

        return new Promise((resolve) => {

            const ease = leaving ? "power1.in" : "power1.out";
            const duration = 1.0

            gsap.to(this.el, {
                xPercent: 0,
                yPercent: leaving ? 0 : -100,
                zPercent: 0,
                ease,
                duration,
                onComplete: () => {

                    gsap.set(this.el, {
                        xPercent: 0,
                        yPercent: leaving ? 0 : 100,
                        zPercent: 0
                    });

                    resolve();

                }
            });

        });

    }

}

const transitionSlide = new TransitionSlide();
export default transitionSlide;