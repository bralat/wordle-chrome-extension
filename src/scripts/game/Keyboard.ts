export default class Keyboard
{
  static BACKSPACE_KEY: string = '←'
  static ENTER_KEY: string = '↵'

  element: HTMLElement
  static keyboardClass: string = '.Keyboard-module_keyboard__uYuqf'
  letters: {
    [x: string]: String[],
  }
  
  // states
  readonly EMPTY_STATE: string = 'empty'
  readonly ABSENT_STATE: string = 'absent'
  readonly PRESENT_STATE: string = 'present'
  readonly CORRECT_STATE: string = 'correct'

  constructor() {
    this.letters = {
      [this.EMPTY_STATE]: [],
      [this.ABSENT_STATE]: [],
      [this.PRESENT_STATE]: [],
      [this.CORRECT_STATE]: [],
    }
    // this.categoriseLetters()
  }

  categoriseLetters () {
    this.element = document.querySelector(Keyboard.keyboardClass) as HTMLElement;
    this.element.querySelectorAll('button.Key-module_key__kchQI').forEach((elem: Element) => {
      const state: string = elem.getAttribute('data-state') as string;
      if (state) {
        this.letters[state].push(elem.getAttribute('data-key') as string);
      } else {
        this.letters[this.EMPTY_STATE].push(elem.getAttribute('data-key') as string);
      }
    })
  }

  allLettersFound (): Boolean {
    return this.letters[this.CORRECT_STATE].length === 5;
  }

  static hit (key: string) {
    document.querySelector(`${this.keyboardClass} button[data-key='${key}']`)?.click();
  }
}