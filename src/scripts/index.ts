import Board from "./game/Board";
import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import Keyboard from "./game/Keyboard";
import Handler from "./Handler";

setTimeout(() => {
  // is game completed
  const keyboard = new Keyboard;
  if (keyboard.allLettersFound()) {
    return;
  }

  const startButton: StartButtonElement = new StartButtonElement;
  const wordSelector: WordSelectorElement = new WordSelectorElement;
  const board: Board = new Board();

  const handler: Handler = new Handler(startButton, wordSelector, board)

  handler.initExtension()
  handler.runPrediction()
}, 500)