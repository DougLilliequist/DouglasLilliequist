import Highway from "@dogstudio/highway";

export default class View extends Highway.Renderer {
    onEnter() {
        this.el = this.wrap.lastElementChild;
    }

    onLeave() {}

    onEnterCompleted() {}

    onLeaveCompleted() {}
}