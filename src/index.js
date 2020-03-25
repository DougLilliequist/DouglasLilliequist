import App from "./App.svelte";

import "../styles/main.scss";

const app = new App({
  target: document.querySelector(".app"),
  props: {
    name: "Douglas"
  }
});

export default app;
