import Board from "./game/Board";
import App from "./elements/App";
import Keyboard from "./game/Keyboard";
import StartButtonElement from "./elements/StartButtonElement";
import WordSelectorElement from "./elements/WordSelectorElement";

App.getDictionary()
// App.loadGTag()
App.ready().then(() => {
  const board = new Board();

  // is game complete
  if (board.isComplete()) {
    return;
  }

  // register custom elements
  customElements.define('start-button', StartButtonElement);
  customElements.define('word-selector', WordSelectorElement);
  const app: App = new App(board);

  Keyboard.ENTER_KEY.onClick(() => app.reset())

  document.body.appendChild(app)
})