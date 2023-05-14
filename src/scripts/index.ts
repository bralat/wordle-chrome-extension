import Board from "./game/Board";
import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import App from "./App";

App.onLoad()
  .then(() => {
    // is game completed
    if (App.isGameComplete) {
      return;
    }

    const startButton: StartButtonElement = new StartButtonElement;
    const wordSelector: WordSelectorElement = new WordSelectorElement;
    const board: Board = new Board();

    const app: App = new App(startButton, wordSelector, board)
    app.initExtension()
    app.runPrediction()
  })