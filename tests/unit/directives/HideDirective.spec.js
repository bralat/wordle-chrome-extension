import { HideDirective } from "@/src/scripts/Directives/HideDirective"
import Reactive from "@/src/scripts/Directives/Reactive"

let element;

describe('Directives/HideDirective', () => {
    beforeEach(() => {
        element = document.createElement('div');
        element.innerHTML = `
            <div id="item-to-hide" data-hide="shouldHide">
                <p>item to hide</p>
            </div>
        `;
    });

    it('hides elements when value is false', () => {
        // Given
        const context = new class {
            constructor () {
                this.shouldHide = new Reactive(false);
            }
        }

        // When
        const directive = new HideDirective(element.firstElementChild, context)
        directive.render()

        // confirm item is visible and toggle value
        expect(element.querySelector('#item-to-hide').style.display).toBe('')
        context.shouldHide.value = true

        // Then
        expect(element.querySelector('#item-to-hide').style.display).toBe('none')
    });

    it('hides elements when value is true', () => {
        // Given
        const context = new class {
            constructor () {
                this.shouldHide = new Reactive(true);
            }
        }

        // When
        const directive = new HideDirective(element.firstElementChild, context)
        directive.render()

        // confirm item is hidden and toggle value
        expect(element.querySelector('#item-to-hide').style.display).toBe('none')
        context.shouldHide.value = false

        // Then
        expect(element.querySelector('#item-to-hide').style.display).toBe('')
    });
});
