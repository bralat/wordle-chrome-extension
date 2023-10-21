import { SubscribeDirective } from "@/src/scripts/Directives/SubscribeDirective"
import { fireEvent } from '@testing-library/dom';

let element;

describe('Directives/SubscribeDirective', () => {
    beforeEach(() => {
        element = document.createElement('div');
        element.innerHTML = `
            <div id="item-to-listen-to" data-subscribe="eventHandlers">
                <p>item to listen to</p>
            </div>
        `;
    });

    it('adds event listeners', () => {
        // Given
        const clickHandler = jest.fn();
        const mouseOverHandler = jest.fn();
        const context = new class {
            constructor () {
                this.eventHandlers = {
                    'click': clickHandler,
                    'mouseover': mouseOverHandler,
                }
            }
        }

        // When
        const directive = new SubscribeDirective(element.firstElementChild, context)
        directive.render()

        // confirm item is visible and toggle value
        const itemToListenTo = element.querySelector('#item-to-listen-to');
        fireEvent.click(itemToListenTo);
        fireEvent.mouseOver(itemToListenTo);

        // Then
        expect(clickHandler).toHaveBeenCalledTimes(1)
        expect(mouseOverHandler).toHaveBeenCalledTimes(1)
        expect(itemToListenTo.getAttribute('data-subscribe')).toBe(null)
    });
});