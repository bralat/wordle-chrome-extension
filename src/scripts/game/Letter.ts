import { InsertModeType } from "../types/InsertModeType";
import { LetterState } from "../types/LetterState";
import { LetterInfo } from "../types/LetterStatePosition";

export default class Letter
{
  static statePriority = {
    'correct': 50,
    'present': 40,
    'absent': 30,
    'tbd': 20,
    'empty': 10,
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
    this.statePosition.state = this.element.getAttribute('data-state') as LetterState || 'tbd';
    this.letter = this.element.getAttribute('data-key') as string;
  }

  isState(state: LetterState): Boolean {
    return this.state === state;
  }

  get state(): LetterState {
    return this.statePosition.state
  }

  isPriorityLowerThan(state: LetterState) {
    return Letter.statePriority[this.state] < Letter.statePriority[state]
  }

  isPriorityEqualTo(state: LetterState) {
    return Letter.statePriority[this.state] === Letter.statePriority[state]
  }

  click(selectorPrefix: string = '') {
    (document.querySelector(`${selectorPrefix} button[data-key='${this.letter}']`) as HTMLButtonElement)?.click();
    this.executeHandlers();
  }

  executeHandlers() {
    this.handlers.forEach((handler: () => void) => handler())
  }

  appendState(state: LetterState, position: number) {
    // if the state is not any of the expected, do nothing
    if (!Object.keys(Letter.statePriority).includes(state)) {
      return;
    }

    if (this.isPriorityLowerThan(state)) {
      this.statePosition = {state, positions: [position]};
    }  else if (this.isPriorityEqualTo(state) && !this.statePosition.positions.includes(position)) {
      this.statePosition.positions.push(position)
      // this.statePosition.state = state;
    }

    if (this.letter === 'e') {
      console.log(this.statePosition)
    }
  }

  onClick(fn: () => void) {
    this.handlers.push(fn);
  }
}