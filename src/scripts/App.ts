import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import WrapperElement from "./elements/WrapperElement"
import Board from "./game/Board"
import Keyboard from "./game/Keyboard"
import Predictor from "./predictor/Predictor"

/**
 * Stores the current state of the game
 */
export default class App {
  protected readonly button: WrapperElement
  protected readonly wordSelector: WrapperElement
  protected predictor: Predictor
  protected static gTagLoaded: Boolean = true
  protected appTimeout: number

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

  static loadGTag() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', `${GTAG_ID}`);
  }

  static ready(): Promise<{}> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.isLoaded && Predictor.ready) {
          clearInterval(interval)
          setTimeout(() => { // TODO: replace with listening for end of animation
            resolve(true);
          }, 2000)
        }
      }, 300);
    })
  }

  static get isLoaded () {
    return document.querySelectorAll('div.Tile-module_tile__UWEHN').length > 0 && this.gTagLoaded;
  }

  initEventListeners() {
    this.button.addEventListener('click', () => {
      this.wordSelector.toggleDisplay()
    })
    this.wordSelector.addEventListener('selected', (event) => {
      Board.nextRow.insertWord(event.detail.word)

      this.resetApp()
    })
    this.wordSelector.addEventListener('hinted', (event) => {
      Board.nextRow.hintWord(event.detail.word)
    })
    this.wordSelector.addEventListener('clear', (event) => {
      Board.nextRow.clear()
    })
  }

  resetApp() {
    clearTimeout(this.appTimeout);
    const this.appTimeout = setTimeout(() => {
      this.wordSelector.remove()
        this.button.remove()

        if (Board.isComplete()) {
          clearTimeout(this.appTimeout);
          return;
        }

        const keyboardLetters = Keyboard.letters
        const boardLetters = Board.letters;
        this.predictor = new Predictor(Object.assign(
          keyboardLetters,
          boardLetters
        ))
        this.wordSelector.element.hideNote();
        this.wordSelector.element.words = this.predictor.predict()
        Board.appendToEmptyRow(this.wordSelector, 80)
        Board.appendToEmptyRow(this.button, 10)
      }, 3000)
  }

  static async getDictionary() {
    // check local storage
    const words = localStorage.getItem('words')
    if (!words) {
      const response = await fetch(chrome.runtime.getURL('assets/words.json'));
      const json = await response.json();
      localStorage.setItem('words', JSON.stringify(json))
    }
  }

  initExtension () {
    this.wordSelector.hide();

    if (Board.hasStarted()) {
      this.wordSelector.element.hideNote();
      this.wordSelector.element.words = this.predictor.predict();
    } else {
      // set starter words
      // source: https://www.gamespot.com/articles/wordle-best-starting-words-to-use-and-other-game-tips/1100-6499460/
      this.wordSelector.element.words = [
        { word: 'adieu' },
        { word: 'about' },
        { word: 'react' },
        { word: 'later' },
        { word: 'roast' },
      ];
    }

    this.initEventListeners();
    Board.appendToEmptyRow(this.wordSelector, 80)
    Board.appendToEmptyRow(this.button, 10)
  }
}
