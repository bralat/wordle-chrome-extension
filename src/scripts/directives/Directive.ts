import { ForEachDirective } from "./ForEachDirective"
import { HideDirective } from "./HideDirective"
import { SubscribeDirective } from "./SubscribeDirective"

export default class Directive
{
    element: Element
    context: Element
    finalElement: Element

    constructor (element: Element, context: Element ) {
        this.element = element
        this.context = context
        this.finalElement = this.analyseTree(this.element)
    }

    hide(rootElement: Element) {
        (new HideDirective(rootElement, this.context)).render()
    }

    foreach(rootElement: Element) {
        (new ForEachDirective(rootElement, this.context)).render()
    }

    subscribe(rootElement: Element) {
        (new SubscribeDirective(rootElement, this.context)).render()
    }

    analyseTree(parent: Element): Element {
        for (const attributeName of parent.getAttributeNames()) {
            console.log(attributeName);
            if (attributeName.startsWith('data-')) {
                const method = attributeName.split('data-');
                if (method[1] && this[method[1]]) {
                    this[method[1]](parent)
                }
            }
        }

        for (const child of parent.children) {
            this.analyseTree(child)
        }

        return parent;
    }
}