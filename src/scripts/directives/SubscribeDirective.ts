import BaseElement from "../elements/BaseElement"
import { DirectiveInterface } from "../types/DirectiveInterface"
import { SubscriberType } from "../types/SubscriberType"

export class SubscribeDirective implements DirectiveInterface
{
    rootElement: HTMLElement
    parentElement: BaseElement
    context: BaseElement
    listeners: SubscriberType

    constructor(rootElement: HTMLElement, context: BaseElement) {
        this.rootElement = rootElement
        this.context = context
        const subscribeVariable = rootElement.getAttribute('data-subscribe');
        this.listeners = this.context[subscribeVariable];

        this.rootElement.removeAttribute('data-subscribe')
    }

    render () {
        Object.keys(this.listeners).forEach((key: string) => {
            this.rootElement.addEventListener(key, this.listeners[key])
        })
    }
}
