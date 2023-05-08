// wrap elements into class that will allow you to add and remove them from the DOM
import Board from "./game/Board";
import StartButton from "./elements/StartButton"
import WordSelector from "./elements/WordSelector"
import Keyboard from "./game/Keyboard";

setTimeout(() => {
  // is game completed
  const keyboard = new Keyboard;
  if (keyboard.allLettersFound()) {
    return;
  }
  new StartButton; 

  const startButton: StartButton = new StartButton;
  const wordSelector: WordSelector = new WordSelector;
  const board: Board = new Board(startButton, wordSelector);
  board.showStartButton();
  // if not find empty row - and insert button

  // count the number of empty rows

  // insert button
}, 500)