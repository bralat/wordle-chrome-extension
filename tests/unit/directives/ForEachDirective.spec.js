import { ForEachDirective } from "@/scripts/Directives/ForEachDirective"
import Reactive from "@/scripts/Directives/Reactive"
import DirectiveHandler from "@/scripts/Directives/DirectiveHandler"

let element;

describe('Directives/ForEachDirective', () => {
    it('duplicates element for each item in array of primitves', () => {
        // Given
        const context = new class {
            constructor () {
                this.items = new Reactive([
                    'item1',
                    'item2'
                ]);
            }
        }
        element = document.createElement('div');
        element.innerHTML = `
            <div class="item-to-duplicate" data-foreach="item in items">
                <p>{{item}}</p>
            </div>
        `;

        // When
        const directive = new ForEachDirective(element.firstElementChild, context)
        directive.render()

        // Then
        const itemElems = element.querySelectorAll('.item-to-duplicate');
        expect(itemElems.length).toBe(2)
        itemElems.forEach((itemElem, index) => {
            expect(itemElem.innerHTML).toEqual(expect.stringContaining(`item${index+1}`))
        })
    });

    it('duplicates element for each item in array of objects', () => {
        // Given
        const context = new class {
            constructor () {
                this.items = new Reactive([
                    { name: 'item1' },
                    { name: 'item2' },
                ]);
            }
        }
        element = document.createElement('div');
        element.innerHTML = `
            <div class="item-to-duplicate" data-foreach="item in items">
                <p>{{item.name}}</p>
            </div>
        `;

        // When
        const directive = new ForEachDirective(element.firstElementChild, context)
        directive.render()

        // Then
        const itemElems = element.querySelectorAll('.item-to-duplicate');
        expect(itemElems.length).toBe(2)
        itemElems.forEach((itemElem, index) => {
            expect(itemElem.innerHTML).toEqual(expect.stringContaining(`item${index+1}`))
        })
    });
});

describe('Directives/DirectiveHandler', () => {
    it('asserts that DirectiveHandler calls ForEachDirective', () => {
        // Given
        element = document.createElement('div');
        element.innerHTML = `
            <div class="item-to-duplicate" data-foreach="item in items">
                <p>{{item.name}}</p>
            </div>
        `;
        const render = jest.fn();
        DirectiveHandler.directives = {
            foreach: class {
                render () { render() }
            }
        }

        // When
        new DirectiveHandler(element, new class {});

        // Then
        expect(render).toHaveBeenCalledTimes(1);
    });
});
