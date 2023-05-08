export const customElement = (name: string) => (element: CustomElementConstructor) => {
  window.customElements.define(name, element)
}
