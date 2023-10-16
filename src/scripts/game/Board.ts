import Row from "./Row"
import WrapperElement from "../elements/WrapperElement"
import { BoardSelectors } from "../types/BoardSelectors"
import Column from "./Column"

/**
 * Stores the current state of the game
 */
export default class Board {
  element: HTMLElement
  rows: Array<Row>;
  static MAX_ROWS = 6
  selectors: BoardSelectors

  constructor(selectors: BoardSelectors) {
    this.selectors = selectors
    this.rows = Array(Board.MAX_ROWS);
    this.element = document.querySelector(this.selectors.board) as HTMLElement;
    this.initState();
  }

  // TODO: run when certain DOM events are triggered
  initState() {
    const rowElems = this.element.querySelectorAll(this.selectors.row);
    rowElems.forEach((rowElem: HTMLElement, rowIndex: number) => {
      const row = new Row(rowElem);
      rowElem.querySelectorAll(this.selectors.column).forEach(
        (columnElem: HTMLElement, position: number) => row.columns.push(new Column(columnElem, position))
      );
      this.rows[rowIndex] = row;
    })
  }

  get loaded (): Boolean {
    return Boolean(this.element);
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

  inProgress(): Boolean {
    return !this.rows.every((row: Row): Boolean => row?.is('empty')) as Boolean;
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
