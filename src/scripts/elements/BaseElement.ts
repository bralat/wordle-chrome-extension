import DirectiveHandler from "../directives/DirectiveHandler";
import { SubscriberType } from "../types/SubscriberType";

export default class BaseElement extends HTMLElement
{
  [s: string]: any;
  shadow: ShadowRoot;
  eventHandlers: SubscriberType

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'});
  }

  createElementFromString(html: string): HTMLCollection|Element {
    const div: HTMLDivElement = document.createElement('div') as HTMLDivElement
    div.innerHTML = html.trim();

    return div.children.length === 1 ? div.children[0] : div.children;
  }

  setStyle() {
    const styleElem = document.createElement('style')
    styleElem.innerHTML = this.css

    this.shadow.appendChild(styleElem)
  }

  render() {
    this.setStyle()
    this.pipeline(this.view, [
      this.createElementFromString,
      this.runDirectives.bind(this),
      this.appendToView.bind(this),
    ])
  }

  runDirectives(element: HTMLElement): HTMLElement {
    return (new DirectiveHandler(element, this)).finalElement
  }

  appendToView(element: HTMLElement): HTMLElement {
    this.shadow.appendChild(element)

    return element;
  }

  pipeline(element: HTMLElement, handlers: ((...args: any[]) => any)[]): HTMLElement {
    let result = element;
    handlers.forEach((handler: (...args: any[]) => any) => {
      result = handler(result)
    })

    return result
  }

  get isVisible(): boolean {
    return !(this.style.display && this.style.display === 'none')
  }

  hide () {
    // set display of custom element to none
    this.style.display = 'none';
  }

  show () {
    this.style.display = null;
  }

  toggleDisplay() {
    this.style.display = this.isVisible ? 'none' : null;
  }
}