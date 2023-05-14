import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import WrapperElement from "./elements/WrapperElement"
import Board from "./game/Board"
import Keyboard from "./game/Keyboard"
import Row from "./game/Row"

/**
 * Stores the current state of the game
 */
export default class App {
  protected readonly button: WrapperElement
  protected readonly wordSelector: WrapperElement
  protected readonly board: Board

  constructor(
    button: StartButtonElement,
    wordSelector: WordSelectorElement,
    board: Board
  ) {
    this.button = new WrapperElement(button);
    this.wordSelector = new WrapperElement(wordSelector);
    this.board = board;
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

  static get isGameComplete (): Boolean {
    const keyboard = new Keyboard;
    return keyboard.allLettersFound()
  }

  appendToRow(row: Row, wrapper: WrapperElement, offset: number) {
    // get the position
    const boundRect: DOMRect = row.element.getBoundingClientRect()
    // append button to row
    wrapper.element.style.position = 'absolute';
    wrapper.element.style.top = `${boundRect.top + 5}px`;
    wrapper.element.style.left = `${boundRect.right + offset}px`;

    document.body.appendChild(wrapper);
  }

  appendToEmptyRow(element: Element, offset: number) {
    this.appendToRow(this.board.nextRow, element, offset);
  }

  initExtension() {
    this.wordSelector.hide();
    this.button.addEventListener('click', () => {
      this.wordSelector.toggleDisplay()
    })
    this.wordSelector.addEventListener('selected', (event) => {
      this.board.nextRow.insertWord(event.detail.word)

      setTimeout(() => {
        console.log('remove');
        this.wordSelector.remove()
        this.button.remove()

        this.appendToEmptyRow(this.wordSelector, 80)
        this.appendToEmptyRow(this.button, 10)
      }, 3000)
    })
    this.wordSelector.addEventListener('hinted', (event) => {
      this.board.nextRow.hintWord(event.detail.word)
    })
    this.wordSelector.addEventListener('clear', (event) => {
      this.board.nextRow.clear()
    })

    this.appendToEmptyRow(this.wordSelector, 80)
    this.appendToEmptyRow(this.button, 10)
  }

  runPrediction() {
    this.wordSelector.element.words = [
      {
        word: 'slate',
        accuracy: '100',
      },
      {
        word: 'miaou',
        accuracy: '98.3'
      }
    ]
  }
}