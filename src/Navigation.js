import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events';

import StickyComponent from './StickyComponent.js';

import {
    gsap
} from 'gsap';

export default class Navigation {

    constructor() {

        this.el = document.querySelector('.navigation__links');

        this.links = this.el.querySelectorAll('.link');

        // this.linkTransforms = this.el.querySelectorAll('.navigation__links__transform');

        // this.links.forEach((link) => {
        //     link.stickyComponent = new StickyComponent({
        //         domElement: link,
        //         enable: true,
        //         includeHoverAnim: true
        //     });
        // });

        this.active = false;

        this.initEvents();

        // this.updateSelectionState();

        // this.updateActiveState();

    }

    initEvents() {

        window.hoveringLink = false;

        this.links.forEach((link) => {
            link.addEventListener('mouseenter', () => {
                this.onHover(link);
            });
            link.addEventListener('mouseleave', () => {
                this.onLeave(link);
            });
            link.addEventListener('click', () => {
                this.onSelect(link);
            });
        })

        emitter.on(events.ENTER_SCROLL_MODE, () => {
            this.links.forEach((link) => {
                link.classList.add('deactivated');
                // link.stickyComponent.enable = false;
            });
        });
        emitter.on(events.EXIT_SCROLL_MODE, () => {
            this.links.forEach((link) => {
                link.classList.remove('deactivated');
                // link.stickyComponent.enable = true;
            });
        });

        window.viewMediator.on('NAVIGATE_IN', ({
            to,
            location
        }) => {
            // this.updateSelectionState(location);

        });

        emitter.on(events.LOADING_ANIM_COMPLETED, this.enableLinks);
        emitter.on(events.TRANSITIONING, this.updateActiveState);

    }

    updateSelectionState(location = null) {

        this.links.forEach((link) => {

            link.classList.remove('link--active');
            link.selected = false;

            const currentLocation = location ? location.href : window.location.href;

            if (link.href === currentLocation) {
                link.classList.add('link--active');
                link.selected = true;
            }

        })

    }

    enableLinks = () => {

        gsap.fromTo(this.el, {
            opacity: 0.0
        }, {
            opacity: 1.0,
            duration: 0.8,
            z: 0,
            onStart: () => {
                this.links.forEach((link) => {
                    if (link.href === window.location.href) {
                        link.selected = true;
                        gsap.set(link, {
                            opacity: 1.0
                        });
                    }
                })
            },
            onComplete: () => {
                this.updateActiveState({
                    state: true
                });
            }
        })

    }

    updateActiveState = ({
        state
    }) => {

        this.active = state;

        this.links.forEach((link) => {

            if (this.active) {
                link.classList.remove('link--disabled');
            } else {
                link.classList.add('link--disabled');
            }

        });

    }

    animateHoverState({
        link,
        state
    }) {
        if (link.selected) return;
        if (this.hoverAnim) this.hoverAnim.kill();
        this.hoverAnim = gsap.to(link, {
            duration: 0.1,
            ease: state ? "power1.out" : "power1.in",
            opacity: state ? 1.0 : 0.4,
            z: 0
        });

    }

    onHover = (link) => {
        window.hoveringLink = true;
        emitter.emit(events.HOVERING_NAV_LINK, true);
        this.animateHoverState({
            link,
            state: true
        });

    }

    onLeave = (link) => {

        window.hoveringLink = false;
        emitter.emit(events.HOVERING_NAV_LINK, false);
        this.animateHoverState({
            link,
            state: false
        });

    }

    onSelect = (selectedLink) => {

        this.links.forEach((link) => {
            if (link === selectedLink) {
                link.selected = true;
                gsap.set(link, {
                    opacity: 1
                });
            } else {
                link.selected = false;
                gsap.to(link, {
                    duration: 0.2,
                    ease: "power1.out",
                    opacity: 0.4,
                    z: 0
                })
            }

        })

    }

}