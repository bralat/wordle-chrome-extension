import Row from "./Row"
import WrapperElement from "../elements/WrapperElement"
import Column from "./Column"

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

  appendToRow(row: Row, wrapper: WrapperElement, offset: number) {
    // get the position
    const boundRect: DOMRect = row.element.getBoundingClientRect()
    // append button to row
    wrapper.element.style.position = 'absolute';
    wrapper.element.style.top = `${boundRect.top + 5}px`;
    wrapper.element.style.left = `${boundRect.right + offset}px`;

    document.body.appendChild(wrapper);
  }

  appendToEmptyRow(element: WrapperElement, offset: number) {
    this.appendToRow(this.nextRow, element, offset);
  }
}
