import { LetterState } from "../types/LetterState"
import { LetterStatePosition } from "../types/LetterStatePosition"

export default class Keyboard
{
  static BACKSPACE_KEY: string = '←'
  static ENTER_KEY: string = '↵'

  static element: HTMLElement
  static keyboardClass: string = '.Keyboard-module_keyboard__uYuqf'
  static _letters: LetterStatePosition = {}
  
  // states
  static readonly EMPTY_STATE: string = 'empty'
  static readonly ABSENT_STATE: string = 'absent'
  static readonly PRESENT_STATE: string = 'present'
  static readonly CORRECT_STATE: string = 'correct'

  static categoriseLetters () {
    Keyboard.element = document.querySelector(Keyboard.keyboardClass) as HTMLElement;
    Keyboard.element.querySelectorAll('button.Key-module_key__kchQI').forEach((elem: Element) => {
      const state: LetterState = elem.getAttribute('data-state') as LetterState;
      const letter: string = elem.getAttribute('data-key') as string;
      if (Keyboard.alphabet.includes(letter)) {
        Keyboard._letters[letter] = {
          state: state,
          positions: []
        }
      }
    })
  }

  static hit (key: string) {
    document.querySelector(`${this.keyboardClass} button[data-key='${key}']`)?.click();
  }

  static get letters (): LetterStatePosition {
    Keyboard.categoriseLetters()

    return Keyboard._letters;
  }

  static enter () {
    Keyboard.hit(Keyboard.ENTER_KEY);
  }

  static backspace () {
    Keyboard.hit(Keyboard.BACKSPACE_KEY);
  }

  static get alphabet(): string[] {
    return ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  }

  static onKey(key: string, fn) {
    document.addEventListener('keyup', (event) => {
      console.log(event);
      if (event.key === key) {
        fn();
      }
    });
    // TODO: also listen for when the keys are triggered programatically
  }
}