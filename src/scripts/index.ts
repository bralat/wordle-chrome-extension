import Board from "./game/Board";
import App from "./elements/App";
import Keyboard from "./game/Keyboard";
import StartButtonElement from "./elements/StartButtonElement";
import WordSelectorElement from "./elements/WordSelectorElement";

App.getDictionary()
App.ready().then(() => {
  // register custom elements
  customElements.define('start-button', StartButtonElement);
  customElements.define('word-selector', WordSelectorElement);
  const app: App = new App();

  document.body.appendChild(app)
})