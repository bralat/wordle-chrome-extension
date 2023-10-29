import { RowState } from "../types/RowState";
import Column from "./Column";
import Keyboard from "./Keyboard";

export default class Row
{
  columns: Column[] = [];
  element: HTMLElement
  static selector: string = '.Row-module_row__pwpBq'

  constructor(element: HTMLElement) {
    this.element = element;
    this.initState();
  }

  initState() {
    this.columns = Array.from(
        this.element.querySelectorAll(Column.selector)
      )
      .map((columnElem: HTMLElement, columnIndex: number) => new Column(columnElem, columnIndex))
  }

  insertWord(word: string) {
    this.clear();
    word.split('').forEach((letter: string, index: number) => {
      this.columns[index].insert(letter)
    });

    Keyboard.enter();
  }

  hintWord(word: string) {
    word.split('').forEach((letter: string, index: number) => {
      this.columns[index].hint(letter)
    })
  }

  is(state: RowState): Boolean {
    return this.state === state;
  }

  clear () {
    this.columns.forEach((column: Column) => column.clear());
  }

  get filledColumns(): Column[] {
    return this.columns.filter((column: Column) => !(column.isState('empty') || column.isState('tbd')) )
  }

  get state(): RowState {
    return this.filledColumns.length > 0 ? 'filled' : 'empty';
  }

  get word(): string {
    return this.columns.map((column: Column) => column.letter.letter).join('')
  }
}