import Highway from "@dogstudio/highway";

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
        console.log('loaded');
    }

    onLeaveCompleted() {}
}