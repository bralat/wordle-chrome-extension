export default class BaseElement extends HTMLElement
{
  shadow: ShadowRoot;

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'});
  }

  createElementFromString(html: string): HTMLCollection {
    const div: HTMLDivElement = document.createElement('div') as HTMLDivElement
    div.innerHTML = html.trim();

    return div.children;
  }
}