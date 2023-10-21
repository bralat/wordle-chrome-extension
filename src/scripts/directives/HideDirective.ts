import BaseElement from "../elements/BaseElement"
import { DirectiveInterface } from "../types/DirectiveInterface"
import Reactive from "./Reactive"

export class HideDirective implements DirectiveInterface
{
    rootElement: HTMLElement
    context: BaseElement
    hide: Reactive<[]>

    constructor(rootElement: HTMLElement, context: BaseElement) {
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
            this.rootElement.style.display = 'none';
        } else {
            this.rootElement.style.display = '';
        }
    }
}