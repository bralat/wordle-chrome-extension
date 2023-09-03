import { ForEachDirective } from "./ForEachDirective"
import { HideDirective } from "./HideDirective"
import { SubscribeDirective } from "./SubscribeDirective"
import BaseElement from "../elements/BaseElement"

export default class Directive
{
    element: HTMLElement
    context: BaseElement
    finalElement: HTMLElement
    directives: {[d: string]: typeof HideDirective | typeof ForEachDirective | typeof SubscribeDirective } = {
        hide: HideDirective,
        foreach: ForEachDirective,
        subscribe: SubscribeDirective,
    }

    constructor (element: HTMLElement, context: BaseElement ) {
        this.element = element
        this.context = context
        this.finalElement = this.analyseTree(this.element)
    }

    analyseTree(parent: HTMLElement): HTMLElement {
        for (const attributeName of parent.getAttributeNames()) {
            console.log(attributeName);
            if (attributeName.startsWith('data-')) {
                const method = attributeName.split('data-');
                if (method[1] && Object.keys(this.directives).includes(method[1])) {
                    (new this.directives[method[1]](parent, this.context)).render()
                }
            }
        }

        for (const child of parent.children) {
            this.analyseTree(child as BaseElement)
        }

        return parent;
    }
}
