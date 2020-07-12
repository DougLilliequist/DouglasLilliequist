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

        this.linkTransforms = this.el.querySelectorAll('.navigation__links__transform');

        this.linkTransforms.forEach((transform) => {
            transform.stickyComponent = new StickyComponent({
                domElement: transform,
                enable: true
            });
        });

        this.active = false;

        this.initEvents();

        this.updateSelectionState();

        this.updateActiveState();

    }

    initEvents() {

        window.hoveringLink = false;

        this.el.childNodes.forEach((link) => {

            link.addEventListener('mouseenter', this.onLinkHover);
            link.addEventListener('mouseleave', this.onLinkLeave);

        });

        emitter.on(events.ENTER_SCROLL_MODE, () => {
            this.linkTransforms.forEach((transform) => {
                transform.classList.add('deactivated');
                transform.stickyComponent.enable = false;
            });
        });
        emitter.on(events.EXIT_SCROLL_MODE, () => {
            this.linkTransforms.forEach((transform) => {
                transform.classList.remove('deactivated');
                transform.stickyComponent.enable = true;
            });
        });

        window.viewMediator.on('NAVIGATE_IN', ({
            to,
            location
        }) => {

            this.updateSelectionState(location);

        });

        emitter.on(events.LOADING_ANIM_COMPLETED, this.enableLinks);

    }

    updateSelectionState(location = null) {

        this.links.forEach((link) => {

            link.classList.remove('link--active');

            const currentLocation = location ? location.href : window.location.href;

            if (link.href === currentLocation) link.classList.add('link--active');

        })

    }

    enableLinks = () => {

        gsap.fromTo(this.el, {
            opacity: 0.0
        }, {
            opacity: 1.0,
            duration: 0.8,
            // z: 0,
            onComplete: () => {
                this.active = true;
                this.updateActiveState();
            }
        })

    }

    updateActiveState = () => {

        this.links.forEach((link) => {

            if (this.active) {
                link.classList.remove('link--disabled');
            } else {
                link.classList.add('link--disabled');
            }

        });

    }

    onLinkHover = () => {

        window.hoveringLink = true;
        emitter.emit(events.HOVERING_LINK);

    }

    onLinkLeave = () => {

        window.hoveringLink = false;
        emitter.emit(events.LEAVING_LINK);

    }

}