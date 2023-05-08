import { RowState } from "../types/RowState";
import Letter from "./Letter"

export default class Row
{
  readonly element: Element
  readonly letters: Letter[] = [];

  constructor(element: Element) {
    this.element = element;
  }

  addLetter(letter: Letter) {
    this.letters.push(letter);
  }

  is(state: RowState): Boolean {
    return this.state === state;
  }

  get state(): RowState
  {
    return this.letters.length > 0 ? 'filled' : 'empty';
  }
}