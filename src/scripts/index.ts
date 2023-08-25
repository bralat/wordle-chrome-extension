import Board from "./game/Board";
import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import App from "./App";
import Keyboard from "./game/Keyboard";

App.getDictionary()
// App.loadGTag()
App.ready().then(() => {
  // is game complete
  const board = new Board({
    'board': '.Board-module_boardContainer__TBHNL',
    'row': '.Row-module_row__pwpBq',
    'column': 'div.Tile-module_tile__UWEHN'
  });

  if (board.isComplete()) {
    return;
  }

  const startButton: StartButtonElement = new StartButtonElement;
  const wordSelector: WordSelectorElement = new WordSelectorElement;

  const app: App = new App(startButton, wordSelector, board)
  app.initExtension()

  Keyboard.onKey('Enter', () => {
    app.resetApp()
  })
})