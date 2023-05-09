import { customElement } from "../decorators";
import { PredictedWordInterface } from "../types/PredictedWordsInterface";
import BaseElement from './BaseElement';

@customElement('word-selector')
class WordSelectorElement extends BaseElement
{
  _words: PredictedWordInterface[] = []
  container: Element
  styleElem: HTMLStyleElement

  constructor () {
    super()

    this.container = this.createElementFromString(`
      <div class="container"></div>
    `)[0] as Element

    this.setStyle()
    this.render();
    this.shadow.appendChild(this.container)
  }

  set words(words: PredictedWordInterface[]) {
    this._words = words
    this.render()
  }

  setStyle() {
    this.styleElem = document.createElement('style')
    this.styleElem.innerHTML = `
      .container{
        min-width: 200px;
        height: auto;
        min-height: 100px;
        border-radius: 10px;
        border-width: 0px;
        background: #ECECEC;
        padding: 20px;
        display: flex;
        flex-direction: column;
      }

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

      .word {
        font-weight: 200;
        font-size: 25px;
        text-transform: uppercase;
      }

      .accuracy {
        font-weight: 200;
        font-size: 25px;
      }
    `

    this.shadow.appendChild(this.styleElem)
  }

  render () {
    this._words.forEach(function (word) {
      this.container.innerHTML += `
        <div class="prediction">
          <div class="word">${word.word}</div>
          <div class="accuracy">${word.accuracy}%</div>
        </div>
      `;
    }, this)
  }
}

export default WordSelectorElement