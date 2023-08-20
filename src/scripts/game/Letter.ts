import { InsertModeType } from "../types/InsertModeType";
import { LetterState } from "../types/LetterState";
import Keyboard from "./Keyboard";

export default class Letter
{
  static statePriority = {
    'correct': 10,
    'present': 20,
    'absent': 30,
    'tbd': 40,
    'empty': 50,
  }
  readonly element: HTMLElement
  letter: string
  protected _state: LetterState
  protected _mode: InsertModeType

  constructor(element: HTMLElement, letter: string, state: LetterState) {
    this.element = element;
    this.letter = letter;
    this._state = state;
  }

  isState(state: LetterState): Boolean {
    return this._state === state;
  }

  isMode(mode: InsertModeType): Boolean {
    return this._mode === mode;
  }

  insert(letter: string) {
    this.mode = 'insert';
    this.letter = letter;
    Keyboard.hit(letter);
  }

  hint(letter: string) {
    this.mode = 'hint';
    this.element.innerHTML = letter;
    // this.letter = letter;
    // Keyboard.hit(letter);
    // this.element.innerHTML = letter;
    this.element.setAttribute('aria-label', letter);
  }

  clear () {
    this.letter = '';
    Keyboard.hit(Keyboard.BACKSPACE_KEY);
    this.element.innerHTML = '';
    // this.element.setAttribute('aria-label', '');
    this.state = 'empty';
    this.mode = 'insert';
  }

  set state(state: LetterState) {
    this.element.setAttribute('data-state', state);
    this._state = state;
  }

  get state(): LetterState {
    this._state = this.element.getAttribute('data-state') as LetterState;
    return this._state
  }

  set mode(state: InsertModeType) {
    if (state === 'hint') {
      this.element.style.opacity = '0.5';
    } else {
      this.element.style.opacity = '1';
    }
  }

  isPriorityLowerThan(state: LetterState) {
    return Letter.statePriority[this.state] < Letter.statePriority[state]
  }
}