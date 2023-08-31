import { PredictedWordInterface } from "../types/PredictedWordsInterface"
import { Reactive } from "./Reactive"

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

    hide(rootElement: Element): Element {
        console.log("HIDE")
        const hideVariable = rootElement.getAttribute('data-hide');
        const hide = this.context[hideVariable];

        if (!(hide instanceof Reactive)) {
            throw new Error('data-hide only works with a reactive variable');
        }

        // convert to Proxy object
        hide.setEffect((value) => {
            if (value) {
                rootElement.remove();
            } else {
                this.context.appendToView(rootElement);
            }
        });


        return rootElement;
    }

    foreach(rootElement: Element): Element|DocumentFragment {
        const attrValue = rootElement.getAttribute('data-foreach');
        const sections = attrValue.split('in').map((section: string) => section.trim());
        const iterable = this.context[sections[1]];
        iterable.setEffect((updatedIterable: any) => {

        })
        const replaceTerm = sections[0]
        const docFragment = document.createDocumentFragment();
        rootElement.removeAttribute('data-foreach')

        iterable.forEach((iterableValue: any) => {
            const element = rootElement.cloneNode(true) as Element;
            let childAsString = element.innerHTML;
            const replacables = childAsString.matchAll(/{{(.*?)}}/g)

            for (const replacable of replacables) {
                if (replacable[1].startsWith(replaceTerm)) {
                    if (replacable[1].trim() === replaceTerm) {
                        childAsString = childAsString.replace(replacable[0], iterableValue);
                        continue;
                    }

                    const prop = replacable[1].split(".")[1]
                    childAsString = childAsString.replace(replacable[0], iterableValue[prop]);
                }
            }

            element.innerHTML = childAsString;
            docFragment.appendChild(element);
        })

        return docFragment
    }

    analyseTree(parent: Element): Element {
        for (const attributeName of parent.getAttributeNames()) {
            console.log(attributeName);
            if (attributeName.startsWith('data-')) {
                const method = attributeName.split('data-');
                if (method[1] && this[method[1]]) {
                    parent = this[method[1]](parent)
                }
            }
        }

        for (const child of parent.children) {
            parent.replaceChild(this.analyseTree(child), child);
            // check if any data attribute matches a directive. if yes, call directive and pass node
        }

        return parent;
    }
}