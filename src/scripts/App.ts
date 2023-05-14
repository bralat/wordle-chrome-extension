import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import WrapperElement from "./elements/WrapperElement"
import Board from "./game/Board"
import Keyboard from "./game/Keyboard"
import Row from "./game/Row"
import Predictor from "./predictor/Predictor"

/**
 * Stores the current state of the game
 */
export default class App {
  protected readonly button: WrapperElement
  protected readonly wordSelector: WrapperElement
  protected readonly predictor: Predictor

  constructor(
    button: StartButtonElement,
    wordSelector: WordSelectorElement
  ) {
    this.button = new WrapperElement(button);
    this.wordSelector = new WrapperElement(wordSelector);

    // initialise predictor
    const keyboardLetters = Keyboard.letters
    const boardLetters = Board.letters;
    this.predictor = new Predictor(Object.assign(
      keyboardLetters,
      boardLetters
    ))
  }

  static onLoad(): Promise<{}> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.isLoaded) {
          clearInterval(interval)
          setTimeout(() => { // TODO: replace with listening for end of animation
            resolve(true);
          }, 2000)
        }
      }, 300);
    })
  }

  static get isLoaded () {
    return document.querySelectorAll('div.Tile-module_tile__UWEHN').length > 0;
  }

  initEventListeners() {
    this.button.addEventListener('click', () => {
      this.wordSelector.toggleDisplay()
    })
    this.wordSelector.addEventListener('selected', (event) => {
      Board.nextRow.insertWord(event.detail.word)

      setTimeout(() => {
        // console.log('remove');
        this.wordSelector.remove()
        this.button.remove()

        this.wordSelector.element.words = this.predictor.predict()
        Board.appendToEmptyRow(this.wordSelector, 80)
        Board.appendToEmptyRow(this.button, 10)
      }, 3000)
    })
    this.wordSelector.addEventListener('hinted', (event) => {
      Board.nextRow.hintWord(event.detail.word)
    })
    this.wordSelector.addEventListener('clear', (event) => {
      Board.nextRow.clear()
    })
  }

  initExtension () {
    this.wordSelector.hide();
    this.wordSelector.element.words = this.predictor.predict();

    this.initEventListeners();
    
    Board.appendToEmptyRow(this.wordSelector, 80)
    Board.appendToEmptyRow(this.button, 10)
  }
}