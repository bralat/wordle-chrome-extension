import Letter from "./Letter"
import Row from "./Row"
import { LetterState } from "../types/LetterState"

/**
 * Stores the current state of the game
 */
export default class Board {
  boardElem: HTMLElement
  board: Row[]
  readonly MAX_ROWS = 6

  constructor() {
    this.board = Array(6);
    this.boardElem = document.querySelector('.Board-module_boardContainer__TBHNL') as HTMLElement;

    // get data on each row
    this.refreshState()
  }

  refreshState() {
    const rowElems = this.boardElem.querySelectorAll('.Row-module_row__pwpBq');
    rowElems.forEach(function (rowElem: Element, rowIndex: number) {
      const row = new Row(rowElem);
      rowElem.querySelectorAll('div.Tile-module_tile__UWEHN').forEach(function (letterElem: Element, letterIndex: number) {
        const state: LetterState = letterElem.getAttribute('data-state') as LetterState;
        const letter = letterElem.innerHTML;
        row.addLetter(new Letter(letterElem, letter, state));
      }, this);
      this.board[rowIndex] = row;
    }, this)
  }

  get loaded (): Boolean {
    return Boolean(this.boardElem);
  }

  get nextRow(): Row {
    this.refreshState()
    return this.board.find((row) => row?.is('empty')) as Row;
  }
}