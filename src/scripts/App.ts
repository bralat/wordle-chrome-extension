import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import Board from "./game/Board"
import Predictor from "./predictor/Predictor"
import { VariableArgumentsType } from "./types/VariableArgumentsType"

/**
 * Stores the current state of the game
 */
export default class App {
  protected readonly button: StartButtonElement
  protected readonly wordSelector: WordSelectorElement
  protected predictor: Predictor
  protected static gTagLoaded: Boolean = true
  protected appTimeout: ReturnType<typeof setTimeout>
  protected board: Board

  constructor(
    board: Board
  ) {
    this.button = new StartButtonElement;
    this.wordSelector = new WordSelectorElement;
    this.board = board

    // initialise predictor
    this.predictor = new Predictor()
    this.initExtension()
  }

  static loadGTag() {
    window.dataLayer = window.dataLayer || [];

    const gtag: VariableArgumentsType = () => window.dataLayer.push(arguments);
    gtag('js', new Date());

    gtag('config', `${window.GTAG_ID}`);
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
    this.wordSelector.addEventListener('selected', (event: CustomEvent) => {
      this.board.nextRow.insertWord(event.detail.word)

      this.reset()
    })
    this.wordSelector.addEventListener('hinted', (event: CustomEvent) => {
      this.board.nextRow.hintWord(event.detail.word)
    })
    this.wordSelector.addEventListener('clear', (event: CustomEvent) => {
      this.board.nextRow.clear()
    })
  }

  removeView() {
    this.wordSelector.remove()
    this.button.remove()
  }

  appendView() {
    this.board.appendToEmptyRow(this.wordSelector, 80)
    this.board.appendToEmptyRow(this.button, 10)
  }

  runPrediction() {
    this.predictor = new Predictor();
    this.wordSelector.hideNote();
    this.wordSelector.words = this.predictor.predict()
  }

  reset() {
    clearTimeout(this.appTimeout);
    this.appTimeout = setTimeout(() => {
      this.removeView()

      if (this.board.isComplete()) {
        clearTimeout(this.appTimeout);
        return;
      }

      this.runPrediction()
      this.appendView()
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

    if (this.board.isEmpty) {
      // set starter words
      // source: https://www.gamespot.com/articles/wordle-best-starting-words-to-use-and-other-game-tips/1100-6499460/
      this.wordSelector.words = Predictor.starterWords;
    } else {
      this.runPrediction();
    }

    this.initEventListeners()
    this.appendView()
  }
}
