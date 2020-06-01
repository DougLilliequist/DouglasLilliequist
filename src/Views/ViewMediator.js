import Highway from "@dogstudio/highway";

export default class ViewMediator extends Highway.Core {
  constructor({ home, work, about, transition} = {}) {
    const highwayArgs = {
      renderers: {
        work: work,
        about: about
      },
      transitions: {
        default: transition
      }
    };

    super(highwayArgs);
    
  }
}
