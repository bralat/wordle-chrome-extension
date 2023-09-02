import { Reactive } from "./Reactive"

export class HideDirective
{
    rootElement: Element
    parentElement: Element
    context: Element
    hide: Reactive<[]>

    constructor(rootElement: Element, context: Element) {
        this.rootElement = rootElement
        this.context = context
        const hideVariable = rootElement.getAttribute('data-hide');
        this.hide = this.context[hideVariable];

        if (!(this.hide instanceof Reactive)) {
            throw new Error('data-hide only works with a reactive variable');
        }

        this.rootElement.removeAttribute('data-hide')
    }

    render () {
        this.hide.setEffect((value) => {
            this.toggleVisibility()
        });

        this.toggleVisibility()
    }

    toggleVisibility() {
        if (this.hide.value) {
            (this.rootElement as HTMLElement).style.display = 'none';
        } else {
            (this.rootElement as HTMLElement).style.display = '';
        }
    }
}