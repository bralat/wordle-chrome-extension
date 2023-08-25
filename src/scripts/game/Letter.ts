import { InsertModeType } from "../types/InsertModeType";
import { LetterState } from "../types/LetterState";
import { LetterInfo } from "../types/LetterStatePosition";
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
  statePosition: LetterInfo = {
    state: 'tbd',
    positions: []
  }
  handlers: Array<{}> = [];

  constructor(element: HTMLElement) {
    this.element = element;
    this.statePosition.state = this.element.getAttribute('data-state') as LetterState;
    this.letter = this.element.getAttribute('data-key') as string;
    if (this.letter === 'a') {
      console.log('a', this.statePosition.state);
    }
  }

  isState(state: LetterState): Boolean {
    return this._state === state;
  }

  get state(): LetterState {
    // this._state = this.element.getAttribute('data-state') as LetterState;
    return this.statePosition.state
  }

  isPriorityLowerThan(state: LetterState) {
    return Letter.statePriority[this.state] < Letter.statePriority[state]
  }

  click(selectorPrefix: string = '') {
    (document.querySelector(`${selectorPrefix} button[data-key='${this.letter}']`) as HTMLButtonElement)?.click();
    this.executeHandlers();
  }

  executeHandlers() {
    this.handlers.forEach((handler: () => void) => handler())
  }

  appendState(state: LetterState, position: number) {
    
    if (!this.isPriorityLowerThan(state)) {
      this.statePosition = {state, positions: [position]};
    }  else if (state === 'present') {
      this.statePosition.positions.push(position)
    }

    if (this.letter === 'a') {
      console.log('a', this.statePosition, state);
    }
  }

  onClick(fn: () => void) {
    this.handlers.push(fn);
  }
}