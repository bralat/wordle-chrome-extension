import { RowState } from "../types/RowState";
import Keyboard from "./Keyboard";
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

  insertWord(word: string) {
    word.split('').forEach((letter: string, index: number) => {
      this.letters[index].insert(letter)
    });

    Keyboard.hit(Keyboard.ENTER_KEY);
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

  get state(): RowState
  {
    // console.log(this.filledLetters.length, this.filledLetters)
    return this.filledLetters.length > 0 ? 'filled' : 'empty';
  }
}