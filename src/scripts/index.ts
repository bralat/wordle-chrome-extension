import Board from "./game/Board";
import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import App from "./App";

App.getDictionary()
App.loadGTag()
App.ready().then(() => {
  // is game complete
  if (Board.isComplete()) {
    return;
  }

  const startButton: StartButtonElement = new StartButtonElement;
  const wordSelector: WordSelectorElement = new WordSelectorElement;

  const app: App = new App(startButton, wordSelector)
  app.initExtension()
})