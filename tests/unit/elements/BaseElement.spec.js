import BaseElement from "@/src/scripts/elements/BaseElement"
import { customElement } from "@/src/scripts/decorators";
import DirectiveHandler from "@/src/scripts/Directives/DirectiveHandler"

jest.mock('@/src/scripts/Directives/DirectiveHandler')

describe('Elements/BaseElement', () => {
    beforeAll(() => {
        customElement('base-element')(BaseElement);
    });

    it('creates an element from a string with one root element', () => {
        // Given/When
        const element = (new BaseElement).createElementFromString(`
            <div>
                <p>child</p>
            </div>
        `);

        // Then
        // assert div element returned
        expect(element.tagName).toBe('DIV');
        // assert div element has the right children
        expect(element.firstElementChild.tagName).toBe('P');
        // assert child element has right content
        expect(element.firstElementChild.innerHTML).toBe('child');
    });

    it('creates an element from a string with multiple elements at root', () => {
        // Given/When
        const elements = (new BaseElement).createElementFromString(`
            <div>
                <p>child</p>
            </div>
            <div>
                <p>child</p>
            </div>
        `);

        // Then
        // assert div elements returned
        expect(elements.length).toBe(2)
        for (const child of elements) {
            expect(child.tagName).toBe('DIV');
            // assert div element has the right children
            expect(child.firstElementChild.tagName).toBe('P');
            // assert child element has right content
            expect(child.firstElementChild.innerHTML).toBe(`child`);
        }
    });

    it('sets the style of the element', () => {
        // Given
        const element = new BaseElement;
        const style = `
            .elem {
                display: block;
            }
        `;
        element.css = style;

        // When
        element.setStyle();

        // Then
        expect(element.shadow.querySelector('style').innerHTML).toBe(style);
    });

    it('appends rendered element', () => {
        // Given
        const element = new BaseElement;

        // When
        element.appendToView(document.createElement('div'));

        // Then
        expect(element.shadow.innerHTML).toBe('<div></div>');
    })

    it('executes each handler in the pipeline', () => {
        // Given/When
        const element = new BaseElement;
        const handler1 = jest.fn();
        const handler2 = jest.fn();

        // When
        element.pipeline(
            document.createElement('div'),
            [
                handler1,
                handler2,
            ]
        );

        // Then
        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).toHaveBeenCalledTimes(1);
    })

    it('calls the directive handler', () => {
        // Given
        const element = new BaseElement;

        // When
        element.runDirectives(document.createElement('div'));

        // Then
        expect(DirectiveHandler).toHaveBeenCalledTimes(1);
    })

    it('renders element', () => {
        // Given
        const element = new BaseElement;
        element.setStyle = jest.fn();
        element.createElementFromString = jest.fn();
        element.runDirectives = jest.fn();
        element.appendToView = jest.fn();

        // When
        element.view = '<div></div>'
        element.render();

        // Then
        expect(element.setStyle).toHaveBeenCalledTimes(1);
        expect(element.createElementFromString).toHaveBeenCalledTimes(1);
        expect(element.runDirectives).toHaveBeenCalledTimes(1);
        expect(element.appendToView).toHaveBeenCalledTimes(1);
    })
});
