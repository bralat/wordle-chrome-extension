import Directive from "../directives/Directive";

export default class BaseElement extends HTMLElement
{
  shadow: ShadowRoot;
  eventHandlers: {
    [eventName: string]: (e: Event) => void
  }

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
      this.createEventListeners,
      this.appendToView.bind(this),
    ])
    
  }

  runDirectives(element: Element): Element {
    return (new Directive(element, this)).finalElement
  }

  createEventListeners(element: Element): Element {
    return element;
  }

  appendToView(element: HTMLElement): Element {
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
}