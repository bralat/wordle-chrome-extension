import { Reactive } from "./Reactive"

export class SubscribeDirective
{
    rootElement: Element
    parentElement: Element
    context: Element
    listeners: Reactive<[]>

    constructor(rootElement: Element, context: Element) {
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