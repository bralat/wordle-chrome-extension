import { LetterState } from "../types/LetterState"
import { LetterStatePosition } from "../types/LetterStatePosition"
import Letter from "./Letter"

export default class Keyboard
{
  static BACKSPACE_KEY: Letter
  static ENTER_KEY: Letter
  static SPECIAL_KEYS: {[x: string]: string }  = {
    '←': 'BACKSPACE_KEY',
    '↵': 'ENTER_KEY'
  }

  static element: HTMLElement
  static keyboardClass: string = '.Keyboard-module_keyboard__uYuqf'
  static _letters: Letter[] = []
  
  // states
  static readonly EMPTY_STATE: string = 'empty'
  static readonly ABSENT_STATE: string = 'absent'
  static readonly PRESENT_STATE: string = 'present'
  static readonly CORRECT_STATE: string = 'correct'

  static categoriseLetters () {
    Keyboard._letters = [];
    Keyboard.element = document.querySelector(Keyboard.keyboardClass) as HTMLElement;
    Keyboard.element.querySelectorAll('button.Key-module_key__kchQI').forEach((elem: HTMLElement) => {
      const letter: Letter = new Letter(elem);
      let specialKey;
      if (Keyboard.alphabet.includes(letter.letter)) {
        Keyboard._letters.push(letter);
      } else if (specialKey = Keyboard.SPECIAL_KEYS[letter.letter]) {
        Keyboard[specialKey] = new Letter(elem);
      }
    })
  }

  static hit (letter: Letter) {
    letter.click(this.keyboardClass);
  }

  static get letters (): Letter[] {
    if (Keyboard._letters.length === 0) {
      Keyboard.categoriseLetters()
    }

    return Keyboard._letters;
  }

  static enter () {
    Keyboard.hit(Keyboard.ENTER_KEY);
  }

  static backspace () {
    Keyboard.hit(Keyboard.BACKSPACE_KEY);
  }

  static getLetter(letterString: string): Letter {
    return Keyboard.letters.find((letter: Letter) => letter.letter === letterString)
  }

  static get alphabet(): string[] {
    return ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  }

  static onKey(key: string, fn: () => void) {
    document.addEventListener('keyup', (event) => {
      if (event.key === key) {
        fn();
      }
    });
    // TODO: also listen for when the keys are triggered programatically
  }

  static LettersWithState(state: string): Letter[] {
    return Keyboard.letters.filter(
      (letter: Letter) => letter.state === state
    );
  }
}