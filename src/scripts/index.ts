import Board from "./game/Board";
import App from "./App";
import Keyboard from "./game/Keyboard";

App.getDictionary()
// App.loadGTag()
App.ready().then(() => {
  const board = new Board();

  // is game complete
  if (board.isComplete()) {
    return;
  }

  const app: App = new App(board);

  Keyboard.ENTER_KEY.onClick(() => app.reset())
})