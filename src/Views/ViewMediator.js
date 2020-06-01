import Highway from "@dogstudio/highway";

export default class ViewMediator extends Highway.Core {
  constructor({ home, projects, about, transition }) {
    const highwayArgs = {
      renderers: {
        home: home,
        projects: projects,
        about: about
      },
      transitions: {
        default: transition
      }
    };

    super(highwayArgs);
    
  }
}
