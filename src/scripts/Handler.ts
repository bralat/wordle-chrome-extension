import StartButtonElement from "./elements/StartButtonElement"
import WordSelectorElement from "./elements/WordSelectorElement"
import WrapperElement from "./elements/WrapperElement"
import Board from "./game/Board"
import Row from "./game/Row"

/**
 * Stores the current state of the game
 */
export default class Handler {
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