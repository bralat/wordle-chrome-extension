import { customElement } from "../decorators";
import { PredictedWordInterface } from "../types/PredictedWordsInterface";
import BaseElement from './BaseElement';

@customElement('word-selector')
class WordSelectorElement extends BaseElement
{
  _words: PredictedWordInterface[] = []
  container: Element
  styleElem: HTMLStyleElement
  _hideNote: Boolean = false
  noteElement: Element

  constructor () {
    super()

    const wrapper = this.createElementFromString(`
      <div class="wrapper">
        <small>These are some recommended starter words</small>
        <div class="container"></div>
      </div>
    `)[0] as Element

    this.noteElement = wrapper.querySelector('small');
    this.container = wrapper.querySelector('.container');

    this.setStyle()
    this.render()
    this.appendListeners()
    this.shadow.appendChild(wrapper)
  }

  appendListeners() {
    this.container.addEventListener('click', function (e: Event) {
      e.target?.dispatchEvent(new CustomEvent("selected", {
        bubbles: true,
        composed: true,
        detail: {
          word: (e.target as HTMLElement)?.querySelector('.prediction-word').innerHTML as string,
          // accuracy: e.target?.querySelector('.prediction-accuracy').innerHTML as string,
        }
      }))
    })

    this.container.addEventListener('mouseover', function (e: Event) {
      e.target?.dispatchEvent(new CustomEvent("hinted", {
        bubbles: true,
        composed: true,
        detail: {
          word: (e.target as HTMLElement)?.querySelector('.prediction-word').innerHTML as string,
          // accuracy: e.target?.querySelector('.prediction-accuracy').innerHTML as string,
        }
      }))
    })

    this.container.addEventListener('mouseleave', function (e: Event) {
      e.target?.dispatchEvent(new CustomEvent("clear", {
        bubbles: true,
        composed: true,
      }))
    })
  }

  set words(words: PredictedWordInterface[]) {
    this._words = words
    this.render()
  }

  hideNote() {
    this.noteElement.remove()
  }

  setStyle() {
    this.styleElem = document.createElement('style')
    this.styleElem.innerHTML = `
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

    this.shadow.appendChild(this.styleElem)
  }

  // attributeChangedCallback

  render () {
    this.container.innerHTML = '';
    this._words.forEach(function (word) {
      const predictionElem = this.createElementFromString(`
        <div class="prediction" >
          <div class="prediction-word">${word.word}</div>
          <!-- <div class="prediction-accuracy">${word.accuracy}%</div> -->
        </div>`
      )[0];
      this.container.appendChild(predictionElem);
    }, this);
  }
}

export default WordSelectorElement