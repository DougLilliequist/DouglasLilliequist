import Highway from "@dogstudio/highway";

import eventEmitter from '../EventEmitter';
const emitter = eventEmitter.emitter;
import events from '../../utils/events';

export default class View extends Highway.Renderer {
    
    onEnter() {
        this.el = this.wrap.lastElementChild;
    }

    onLeave() {}

    onEnterCompleted() {
        // document.readyState === 'complete'
        // ? this.initOnComplete()
        // : listener(window, 'a', 'load', () =>  {
            
        //     console.log('loaded');
        
        //     this.initOnComplete()
        
        // })
    }

    onLeaveCompleted() {}

    initDomGL({view, params}) {
        
        emitter.emit(events.INIT_DOMGL, {view, params});

    }
}