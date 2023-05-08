export default class BaseElement extends HTMLElement
{
  shadow: ShadowRoot;

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'});
  }
}