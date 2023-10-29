import { HideDirective } from "@/scripts/Directives/HideDirective"
import Reactive from "@/scripts/Directives/Reactive"
import DirectiveHandler from "@/scripts/Directives/DirectiveHandler"

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

    it('removes directive attribute when done rendering', () => {
        // Given
        const context = new class {
            constructor () {
                this.shouldHide = new Reactive(true);
            }
        }

        // When
        const directive = new HideDirective(element.firstElementChild, context)
        directive.render()

        // Then
        expect(element.querySelector('#item-to-hide').getAttribute('data-subscribe')).toBe(null)
    })
});


describe('Directives/DirectiveHandler', () => {
    it('asserts that DirectiveHandler calls HideDirective', () => {
        // Given
        element = document.createElement('div');
        element.innerHTML = `
            <div id="item-to-hide" data-hide="shouldHide">
                <p>item to hide</p>
            </div>
        `;
        const render = jest.fn();
        DirectiveHandler.directives = {
            hide: class {
                render () { render() }
            }
        }

        // When
        new DirectiveHandler(element, new class {});

        // Then
        expect(render).toHaveBeenCalledTimes(1);
    });
});
