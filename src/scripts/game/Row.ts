import { RowState } from "../types/RowState";
import Column from "./Column";
import Keyboard from "./Keyboard";
import Letter from "./Letter"

export default class Row
{
  readonly _element: Element
  columns: Column[] = [];
  isValid = true;
  statusInterval: number;
  name: string = ''
  element: HTMLElement

  constructor(element: HTMLElement) {
    this.element = element;
  }

  resetValidity() {
    this.isValid = true;
    if(this.element.classList.contains('Row-module_invalid__RNDXZ')) {
      this.isValid = false;
    }
  }

  insertWord(word: string) {
    this.clear();
    word.split('').forEach((letter: string, index: number) => {
      this.columns[index].insert(letter)
    });

    Keyboard.enter();
    this.resetValidity();
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

  get filledLetters(): Column[] {
    return this.columns.filter((column: Column) => !(column.isState('empty') || column.isState('tbd')) )
  }

  get emptyLetters(): Column[] {
    return this.columns.filter((column: Column) => column.isState('empty'))
  }

  get state(): RowState {
    return this.filledLetters.length > 0 ? 'filled' : 'empty';
  }

  get word(): string {
    return this.columns.map((column: Column) => column.letter.letter).join('')
  }
}