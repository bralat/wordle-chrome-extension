import StartButtonElement from "./StartButtonElement"
import WordSelectorElement from "./WordSelectorElement"
import Board from "../game/Board"
import Predictor from "../predictor/Predictor"
import BaseElement from "./BaseElement"
import Keyboard from "../game/Keyboard"


export default class App extends BaseElement
{
  protected readonly button: StartButtonElement
  protected readonly wordSelector: WordSelectorElement
  protected predictor: Predictor
  protected appTimeout: ReturnType<typeof setTimeout>
  protected board: Board

  constructor() {
    super()

    this.board = new Board();
    this.eventHandlers = {
      'click': this.clickHandler.bind(this),
      'selected': this.selectedHandler.bind(this),
      'hinted': this.hintedHandler.bind(this),
      'clear': this.clearHandler.bind(this),
    }
    App.getDictionary()
    this.render()
    this.button = this.shadow.querySelector('start-button') as StartButtonElement;
    this.wordSelector = this.shadow.querySelector('word-selector') as WordSelectorElement;
    this.wordSelector.hide();   

    // initialise predictor
    this.predictor = new Predictor()
  }

  static ready(): Promise<{}> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.isLoaded && Predictor.ready) {
          clearInterval(interval)
          setTimeout(() => {
            resolve(true);
          }, 2000)
        }
      }, 300);
    })
  }

  static get isLoaded () {
    return document.querySelectorAll('div.Tile-module_tile__UWEHN').length > 0;
  }

  clickHandler(e: Event) {
    this.wordSelector.toggleDisplay()
  }

  selectedHandler(e: Event) {
    this.board.nextRow.insertWord((e as CustomEvent).detail.word)

    this.reset()
  }

  hintedHandler(e: Event) {
    this.board.nextRow.hintWord((e as CustomEvent).detail.word)
  }

  clearHandler(e: Event) {
    this.board.nextRow.clear()
  }

  attachToEmptyRow() {
    // get the position
    const boundRect: DOMRect = this.board.nextRow.element.getBoundingClientRect()
    // append button to row
    this.style.position = 'absolute';
    this.style.top = `${boundRect.top + 5}px`;
    this.style.left = `${boundRect.right + 10}px`;
  }

  runPrediction() {
    this.predictor = new Predictor();
    this.wordSelector.hideNote();
    this.wordSelector.words = this.predictor.predict()
  }

  reset() {
    clearTimeout(this.appTimeout);
    this.appTimeout = setTimeout(() => {
      if (this.board.isComplete()) {
        clearTimeout(this.appTimeout);
        return;
      }

      this.runPrediction()
      this.attachToEmptyRow()
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
    // is game complete
    if (this.board.isComplete()) {
      return;
    }
  
    if (this.board.isEmpty) {
      // set starter words
      // source: https://www.gamespot.com/articles/wordle-best-starting-words-to-use-and-other-game-tips/1100-6499460/
      this.wordSelector.words = Predictor.starterWords;
    } else {
      this.runPrediction();
    }

    this.attachToEmptyRow()
    this.show();
  }

  connectedCallback() {
    Keyboard.ENTER_KEY.onClick(() => this.reset())
    
    this.hide();
    setTimeout(() => {
      this.initExtension();
    }, 350);
  }

  get css(): string {
    return `
      .app {
        position: absolute;
        z-index: 100;
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: center;
        transition: all 0.3s ease-in-out;
      }

      word-selector {
        margin-left: 50px;
        transition: all 0.3s ease-in-out;
      }

      start-button {
        transition: all 0.3s ease-in-out;
      }
    `
  }

  get view(): string {
    return `
      <div class="app" data-subscribe="eventHandlers">
        <start-button></start-button>
        <word-selector></word-selector>
      </div>
    `
  }
}
