import StartButton from "../elements/StartButton"
import WordSelector from "../elements/WordSelector"
import Letter from "./Letter"
import Row from "./Row"
import { LetterState } from "../types/LetterState"

/**
 * Stores the current state of the game
 */
export default class Board {
  boardElem: HTMLElement
  startButton: StartButton
  wordSelector: WordSelector
  board: Row[]
  readonly MAX_ROWS = 6

  constructor(startButton: StartButton, wordSelector: WordSelector) {
    this.startButton = startButton
    this.wordSelector = wordSelector
    this.board = Array(6);
    this.boardElem = document.querySelector('.Board-module_boardContainer__TBHNL') as HTMLElement;

    // get data on each row
    const rowElems = this.boardElem.querySelectorAll('.Row-module_row__pwpBq');
    rowElems.forEach(function (rowElem: Element, rowIndex: number) {
      const row = new Row(rowElem);
      rowElem.querySelectorAll('div.Tile-module_tile__UWEHN').forEach(function (letterElem: Element, letterIndex: number) {
        const state: LetterState = letterElem.getAttribute('data-state') as LetterState;
        if (state !== 'empty') {
          const letter = letterElem.innerHTML;
          row.addLetter(new Letter(letterElem, letter, state));
        }
      }, this);
      this.board[rowIndex] = row;
    }, this)
  }

  get nextRow(): Row {
    return this.board.find((row) => row?.is('empty')) as Row;
  }

  showStartButton() {
    // get position of empty row
    const boundRect: DOMRect = this.nextRow.element.getBoundingClientRect()

    // append button to row
    const wrapper = document.createElement('div');
    wrapper.setAttribute('style', `
       position: absolute;
       top: ${boundRect.top + 5}px;
       left: ${boundRect.right + 10}px;
     `);

    this.startButton.addEventListener('click', () => {
      this.showWordSelector()
    })

    wrapper.appendChild(this.startButton);
    document.body.appendChild(wrapper);
  }

  showWordSelector() {
    // get position of empty row
    const boundRect: DOMRect = this.nextRow.element.getBoundingClientRect()

    // append button to row
    const wrapper = document.createElement('div');
    wrapper.setAttribute('style', `
       position: absolute;
       top: ${boundRect.top + 5}px;
       left: ${boundRect.right + 80}px;
     `);
    this.wordSelector.words = [
      {
        word: 'slate',
        accuracy: '100',
      },
      {
        word: 'miaou',
        accuracy: '98.3'
      }
    ]
    wrapper.appendChild(this.wordSelector);
    document.body.appendChild(wrapper);


  }
}