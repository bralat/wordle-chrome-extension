import { LetterState } from "../types/LetterState";

export default class Letter
{
  readonly element: Element
  readonly letter: string
  readonly _state: LetterState

  constructor(element: Element, letter: string, state: LetterState) {
    this.element = element;
    this.letter = letter;
    this._state = state;
  }

  is(state: LetterState): Boolean {
    return this._state === state;
  }
}