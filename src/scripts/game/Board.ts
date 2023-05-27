import Letter from "./Letter"
import Row from "./Row"
import { LetterState } from "../types/LetterState"
import WrapperElement from "../elements/WrapperElement"
import { LetterStatePosition } from "../types/LetterStatePosition"

/**
 * Stores the current state of the game
 */
export default class Board {
  static _boardElem: HTMLElement
  static _board: Row[]
  static readonly MAX_ROWS = 6

  static get boardElem(): HTMLElement {
    if (!Board._boardElem) {
      Board._boardElem = document.querySelector('.Board-module_boardContainer__TBHNL') as HTMLElement;
    }

    return Board._boardElem;
  }

  static get board(): Row[] {
    if (!Board._board){
      Board._board = Array(6);
    }

    return Board._board
  }

  // TODO: run when certain DOM events are triggered
  static refreshState() {
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

  static get loaded (): Boolean {
    return Boolean(this.boardElem);
  }

  static get letters (): LetterStatePosition {
    Board.refreshState()
    const letters: LetterStatePosition = {};
    this.board.forEach((row: Row) => {
      row.letters.forEach((letter: Letter, index: number) => {
        if (!letters[letter.letter] || letter.isPriorityLowerThan(letters[letter.letter].state)) {
          letters[letter.letter] = {
            state: letter.state,
            positions: [index]
          }
        } else if (letter.state === 'present') {
          letters[letter.letter].positions.push(index)
        }
      });
    });

    return letters;
  }

  static get nextRow(): Row {
    this.refreshState()
    return this.board.find((row: Row): Boolean => row?.is('empty')) as Row;
  }

  static get lastFilledRow(): Row {
    this.refreshState()
    return this.board.toReversed().find((row: Row): Boolean => row?.is('filled')) as Row;
  }

  static isComplete(): Boolean {
    return this.lastFilledRow?.letters.every((letter: Letter) => letter.isState('correct'))
  }

  static appendToRow(row: Row, wrapper: WrapperElement, offset: number) {
    // get the position
    const boundRect: DOMRect = row.element.getBoundingClientRect()
    // append button to row
    wrapper.element.style.position = 'absolute';
    wrapper.element.style.top = `${boundRect.top + 5}px`;
    wrapper.element.style.left = `${boundRect.right + offset}px`;

    document.body.appendChild(wrapper);
  }

  static appendToEmptyRow(element: Element, offset: number) {
    this.appendToRow(this.nextRow, element, offset);
  }
}
