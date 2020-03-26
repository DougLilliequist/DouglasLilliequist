import Highway from "@dogstudio/highway";
import Home from "./Views/Home/Home.js";
import Projects from "./Views/Projects/Projects.js";
import About from "./Views/About/About.js";

import Transition from "./Transitions/Transition.js";

class ViewMediator extends Highway.Core {
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

const viewMediator = new ViewMediator({
  home: Home,
  projects: Projects,
  about: About,
  transition: Transition
});
export default viewMediator;
