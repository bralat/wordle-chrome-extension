import Row from "./Row"
import Column from "./Column"
import BaseElement from "../elements/BaseElement";

/**
 * Stores the current state of the game
 */
export default class Board {
  element: HTMLElement
  rows: Array<Row>;
  static MAX_ROWS = 6
  static selector: string = '.Board-module_boardContainer__TBHNL'

  constructor() {
    this.element = document.querySelector(Board.selector) as HTMLElement;
    this.initState();
  }

  initState() {
    this.rows = Array.from(
        this.element.querySelectorAll(Row.selector)
      )
      .map((rowElem: HTMLElement) => new Row(rowElem))
  }

  get nextRow(): Row {
    return this.rows.find((row: Row): Boolean => row?.is('empty')) as Row;
  }

  get lastFilledRow(): Row {
    return [...this.rows].reverse().find((row: Row): Boolean => row?.is('filled')) as Row;
  }

  isComplete(): Boolean {
    return this.lastFilledRow?.columns.every((column: Column) => column.isState('correct'))
  }

  get isEmpty(): Boolean {
    return this.rows.every((row: Row): Boolean => row?.is('empty')) as Boolean;
  }

  appendToRow(row: Row, element: BaseElement) {
    // get the position
    const boundRect: DOMRect = row.element.getBoundingClientRect()
    // append button to row
    element.style.position = 'absolute';
    element.style.top = `${boundRect.top + 5}px`;
    element.style.left = `${boundRect.right + 10}px`;

    document.body.appendChild(element);
  }

  appendToEmptyRow(element: BaseElement) {
    this.appendToRow(this.nextRow, element);
  }
}
