import { customElement } from "../decorators";
import { Reactive } from "../directives/Reactive";
import { PredictedWordInterface } from "../types/PredictedWordsInterface";
import BaseElement from './BaseElement';

@customElement('word-selector')
class WordSelectorElement extends BaseElement
{
  _words: Reactive<PredictedWordInterface[]>
  container: Element
  styleElem: HTMLStyleElement
  _hideNote: Reactive<Boolean>
  noteElement: Element

  constructor () {
    super()

    this._hideNote = new Reactive(true);
    this._words = new Reactive([]);
    this.eventHandlers = {
      'click': this.clickHandler,
      'mouseover': this.mouseOverHandler,
      'leave': this.mouseLeaveHandler
    }
    this.render()
  }

  clickHandler(e: Event) {
    e.target?.dispatchEvent(new CustomEvent("selected", {
      bubbles: true,
      composed: true,
      detail: {
        word: (e.target as HTMLElement)?.querySelector('.prediction-word').innerHTML as string,
        // accuracy: e.target?.querySelector('.prediction-accuracy').innerHTML as string,
      }
    }))
  }

  mouseOverHandler(e: Event) {
    e.target?.dispatchEvent(new CustomEvent("hinted", {
      bubbles: true,
      composed: true,
      detail: {
        word: (e.target as HTMLElement)?.querySelector('.prediction-word').innerHTML as string,
        // accuracy: e.target?.querySelector('.prediction-accuracy').innerHTML as string,
      }
    }))
  }

  mouseLeaveHandler(e: Event) {
    e.target?.dispatchEvent(new CustomEvent("clear", {
      bubbles: true,
      composed: true,
    }))
  }

  set words(words: PredictedWordInterface[]) {
    this._words.value = words
  }

  hideNote() {
    this._hideNote.value = true;
  }

  get css(): string {
    return `
      .wrapper{
        min-width: 100px;
        height: auto;
        min-height: 100px;
        border-radius: 10px;
        border-width: 0px;
        background: #ECECEC;
        padding: 20px;
        display: flex;
        flex-direction: column;
      }

      .wrapper small {
        opacity: 0.5;
        padding: 0px 5px;
      }

      .container{}

      .prediction {
        display: flex;
        justify-content: space-between;
        padding: 5px 8px;
        border-radius: 5px;
        margin-bottom: 5px;
      }

      .prediction:hover {
        background: #E5E5E5;
        cursor: pointer;
      }

      .prediction-word {
        font-weight: 200;
        font-size: 25px;
        text-transform: uppercase;
        pointer-events: none;
      }

      .prediction-accuracy {
        font-weight: 200;
        font-size: 25px;
        pointer-events: none;
      }
    `
  }

  get view(): string {
    return `
      <div class="wrapper">
        <small data-hide="_hideNote">These are some recommended starter words</small>
        <div class="container" data-subscribe="eventHandlers">
          <div class="prediction" data-forEach="word in _words">
            <div class="prediction-word">{{word.word}}</div>
            <!-- <div class="prediction-accuracy">{{word.accuracy}}%</div> -->
          </div>
        </div>
      </div>
    `
  }
}

export default WordSelectorElement