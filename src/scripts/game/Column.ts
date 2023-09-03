import { InsertModeType } from "../types/InsertModeType";
import { LetterState } from "../types/LetterState";
import Keyboard from "./Keyboard";
import Letter from "./Letter";

export default class Column
{
  readonly element: HTMLElement
  _letter?: Letter = null
  protected _mode: InsertModeType
  protected _state: LetterState = 'tbd'
  position: number
  observer: MutationObserver

  constructor(element: HTMLElement, position: number) {
    this.element = element;
    this.letter = Keyboard.getLetter(this.element.innerHTML);
    this.position = position;
    // this.refreshState();
    this.state = this.element.getAttribute('data-state') as LetterState;
    if (this.letter) {
        this.letter.appendState(this.state, this.position);
    }

    this.setUpObserver()
  }

  setUpObserver() {
    if (this.observer){
        return;
    }

    this.observer = new MutationObserver((mutationList, observer) => {
        mutationList.forEach((mutation: MutationRecord) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-state') {
                if (Keyboard.alphabet.includes(mutation.target.textContent)) {
                    this.letter = Keyboard.getLetter(mutation.target.textContent);
                }
                this.refreshState()
            }
        })
    });

    this.observer.observe(this.element, {attributes: true});
  }

  refreshState() {
    if (this.letter) {
        this.letter.appendState(this.state, this.position);
    }
  }

  isState(state: LetterState): Boolean {
    return this._state === state;
  }

  set letter(letter: Letter) {
    if (letter) {
        this._letter = letter
    }
  }

  get letter () {
    return this._letter
  }

  isMode(mode: InsertModeType): Boolean {
    return this._mode === mode;
  }

  insert(letter: Letter|string) {
    this.mode = 'insert';
    this.letter = letter instanceof Letter ? letter: Keyboard.getLetter(letter);
    this.letter.click();
    this.setUpObserver()
  }

  hint(letter: Letter|string) {
    this.mode = 'hint';
    this.element.innerHTML = letter instanceof Letter ? letter.letter : letter;
    this.element.setAttribute('aria-label', this.element.innerHTML);
  }

  clear () {
    this.letter = null;
    Keyboard.backspace();
    this.element.innerHTML = '';
    // this.element.setAttribute('aria-label', '');
    this.state = 'empty';
    this.mode = 'insert';
  }

  set state(state: LetterState) { // TODO: create column state type
    // this.element.setAttribute('data-state', state);
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