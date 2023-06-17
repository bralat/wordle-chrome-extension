import { RowState } from "../types/RowState";
import Keyboard from "./Keyboard";
import Letter from "./Letter"

export default class Row
{
  readonly element: Element
  readonly letters: Letter[] = [];
  isValid = true;
  statusInterval: number;
  name: string = ''

  constructor(element: Element) {
    this.element = element;
  }

  addLetter(letter: Letter) {
    this.letters.push(letter);
  }

  resetValidity() {
    this.isValid = true;
    if(this.element.classList.contains('Row-module_invalid__RNDXZ')) {
      console.log('not valid');
      this.isValid = false;
    }
  }

  insertWord(word: string) {
    this.clear();
    word.split('').forEach((letter: string, index: number) => {
      this.letters[index].insert(letter)
    });

    Keyboard.enter();
    this.resetValidity();
  }

  hintWord(word: string) {
    word.split('').forEach((letter: string, index: number) => {
      this.letters[index].hint(letter)
    })
  }

  is(state: RowState): Boolean {
    return this.state === state;
  }

  clear () {
    this.letters.forEach((letter: Letter) => letter.clear());
  }

  get filledLetters(): Letter[] {
    return this.letters.filter((letter: Letter) => !(letter.isState('empty') || letter.isState('tbd')) )
  }

  get emptyLetters(): Letter[] {
    return this.letters.filter((letter: Letter) => letter.isState('empty'))
  }

  get state(): RowState {
    return this.filledLetters.length > 0 ? 'filled' : 'empty';
  }

  get word(): string {
    return this.letters.map((letter: Letter) => letter.letter).join('')
  }
}