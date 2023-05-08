import { customElement } from "../decorators";
import BaseElement from './BaseElement';

@customElement('word-selector')
class WordSelector extends BaseElement
{
  constructor () {
    super()
    this.render()
  }

  render () {

  }
}

export default WordSelector