// class Predictor
// {
//   // prop to store all 5-letter words
//   // prop to store used letters and their categories

//   // constructor that receives all the 5 letter words

//   // method to receive and categorise used letters

//   // method to predict next word, accept second param to get top n results
// }

// function countRows(board: Element): Number {
//   return board.querySelectorAll('Row-module_row__pwpBq').length
// }

const customElement = (name: string) => (element: CustomElementConstructor) => {
  window.customElements.define(name, element)
}

class BaseElement extends HTMLElement
{
  shadow: ShadowRoot;

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'});
  }
}

@customElement('start-button')
class StartButton extends BaseElement
{
  constructor () {
    super()
    this.render()
  }

  render () {
    const button: HTMLButtonElement = document.createElement('button')
    button.innerHTML = this.icon

    const style: HTMLStyleElement = document.createElement('style')
    style.innerHTML = `
      button{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        border-width: 0px;
      }

      button svg {
        margin-left: -5px;
      }
    `

    this.shadow.appendChild(style)
    this.shadow.appendChild(button)
  }

  get icon(): string {
    // Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools
    return `
      <svg width="50px" height="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier">
            <circle cx="34.52" cy="11.43" r="5.82"/>
            <circle cx="53.63" cy="31.6" r="5.82"/>
            <circle cx="34.52" cy="50.57" r="5.82"/>
            <circle cx="15.16" cy="42.03" r="5.82"/>
            <circle cx="15.16" cy="19.27" r="5.82"/>
            <circle cx="34.51" cy="29.27" r="4.7"/>
            <line x1="20.17" y1="16.3" x2="28.9" y2="12.93"/>
            <line x1="38.6" y1="15.59" x2="49.48" y2="27.52"/>
            <line x1="50.07" y1="36.2" x2="38.67" y2="46.49"/>
            <line x1="18.36" y1="24.13" x2="30.91" y2="46.01"/>
            <line x1="20.31" y1="44.74" x2="28.7" y2="48.63"/>
            <line x1="17.34" y1="36.63" x2="31.37" y2="16.32"/>
            <line x1="20.52" y1="21.55" x2="30.34" y2="27.1"/>
            <line x1="39.22" y1="29.8" x2="47.81" y2="30.45"/>
            <line x1="34.51" y1="33.98" x2="34.52" y2="44.74"/>
        </g>
      </svg>
    `
  }
}

class Keyboard
{
  keyboardElem: HTMLElement
  letters: {
    [x: string]: String[],
  }
  
  // states
  readonly UNASSIGNED_STATE: string = 'unassigned'
  readonly ABSENT_STATE: string = 'absent'
  readonly PRESENT_STATE: string = 'present'
  readonly CORRECT_STATE: string = 'correct'

  constructor() {
    this.letters = {
      [this.UNASSIGNED_STATE]: [],
      [this.ABSENT_STATE]: [],
      [this.PRESENT_STATE]: [],
      [this.CORRECT_STATE]: [],
    }
    this.categoriseLetters()
  }

  categoriseLetters () {
    this.keyboardElem = document.querySelector('.Keyboard-module_keyboard__uYuqf') as HTMLElement;
    this.keyboardElem.querySelectorAll('button.Key-module_key__kchQI').forEach((elem: Element) => {
      const state: string = elem.getAttribute('data-state') as string;
      // console.log(state);
      if (state) {
        this.letters[state].push(elem.getAttribute('data-key') as string);
      } else {
        this.letters[this.UNASSIGNED_STATE].push(elem.getAttribute('data-key') as string);
      }
      
    })
  }

  allLettersFound (): Boolean {
    return this.letters[this.CORRECT_STATE].length === 5;
  }
}

/**
 * Stores the current state of the game
 */
class Board
{
  boardElem: HTMLElement
  board: {
    [x: string]: string,
  }[][]

  constructor() {
    this.board = Array(6).fill([]).map(() => (new Array(5)).fill({}));
    this.boardElem = document.querySelector('.Board-module_boardContainer__TBHNL') as HTMLElement;

    // get data on each row
    const rowElems = this.boardElem.querySelectorAll('.Row-module_row__pwpBq');
    rowElems.forEach(function (rowElem: Element, rowIndex: number) {
      rowElem.querySelectorAll('div.Tile-module_tile__UWEHN').forEach(function (letterElem: Element, letterIndex: number) {
        const state: string = letterElem.getAttribute('data-state') as string;
        if (state !== 'empty') {
          const letter = letterElem.innerHTML;
          this.board[rowIndex][letterIndex] = {
            [letter]: state
          }
        }
      }, this)
    }, this)
  }
}

setTimeout(() => {
  // is game completed
  const keyboard = new Keyboard;
  if (keyboard.allLettersFound()) {
    return;
  }

  const board = new Board;

  // if not find empty row - and insert button
  // count the number of empty rows
  const boardElem: Element = document.querySelector('.Board-module_boardContainer__TBHNL') as Element;

  // insert button
  const buttonElem: StartButton = document.createElement('start-button') as StartButton;
  boardElem.appendChild(buttonElem);
}, 1000)