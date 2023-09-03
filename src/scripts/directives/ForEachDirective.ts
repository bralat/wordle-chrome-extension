import BaseElement from "../elements/BaseElement"
import { DirectiveInterface } from "../types/DirectiveInterface"
import { Reactive } from "./Reactive"

export class ForEachDirective implements DirectiveInterface
{
    rootElement: HTMLElement
    parentElement: HTMLElement
    context: BaseElement
    iterable: Reactive<[]>
    replaceTerm: string

    constructor(rootElement: HTMLElement, context: BaseElement) {
        this.rootElement = rootElement
        this.parentElement = this.rootElement.parentElement
        this.context = context
        const attrValue = this.rootElement.getAttribute('data-foreach');
        const sections = attrValue.split('in').map((section: string) => section.trim());
        this.replaceTerm = sections[0]
        this.iterable = this.context[sections[1]];
        this.rootElement.removeAttribute('data-foreach')
    }

    render () {
        this.iterable.setEffect((updatedIterable: any) => {
            this.duplicateElements();
        })
        
        this.duplicateElements();
    }

    get template(): BaseElement {
        return this.rootElement.cloneNode(true) as BaseElement
    }

    duplicateElements() {
        const docFragment = document.createDocumentFragment();

        this.iterable.value.forEach((iterableValue: any, index: number) => {
            // take template
            const template  = this.template
            // get content
            let content = template.innerHTML
            // find all variables
            const replacables = content.matchAll(/{{(.*?)}}/g)
            // replace variables in content
            for (const replacable of replacables) {
                if (replacable[1].startsWith(this.replaceTerm)) {
                    if (replacable[1].trim() === this.replaceTerm) {
                        content = content.replace(replacable[0], iterableValue);
                        continue;
                    }

                    const prop = replacable[1].split(".")[1]
                    content = content.replace(replacable[0], iterableValue[prop]);
                }
            }
            template.innerHTML = content;
            // append to fragment
            docFragment.appendChild(template);
        })

        this.parentElement.replaceChildren(...docFragment.children)
    }
}
