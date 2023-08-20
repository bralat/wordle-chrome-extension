import BaseElement from "./BaseElement"
import { customElement } from "../decorators";

@customElement('wrapper-element')
export default class WrapperElement<E extends BaseElement> extends BaseElement {
  element: E
  wrapperElement: Element
  styleElement: Element

  constructor(element: E) {
    super()
    this.element = element;

    this.wrapperElement = document.createElement('div');
    this.wrapperElement.appendChild(element)
    this.styleElement = document.createElement('style');
    this.styleElement.innerHTML = `
      .hide {
        display: none;
      }
    `;
    this.shadow.appendChild(this.wrapperElement)
    this.shadow.appendChild(this.styleElement)
  }

  hide () {
    this.wrapperElement.classList.add('hide');
  }

  show () {
    this.wrapperElement.classList.remove('hide');
  }

  get isVisible(): boolean {
    return !this.wrapperElement.classList.contains('hide')
  }

  toggleDisplay() {
    this.isVisible ? this.hide() : this.show();
  }
}