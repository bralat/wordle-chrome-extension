import Column from '@/scripts/game/Column';
import Letter from '@/scripts/game/Letter';
import Keyboard from '@/scripts/game/Keyboard';

describe('Game/Column', () => {
    let element;

    beforeAll(() => { 
        // create a letter to be used in the column
        const letter = document.createElement('div');
        letter.innerHTML = `<div data-state="present" data-key="a">a</div>`;
        Keyboard.letters.push(new Letter(letter.firstElementChild))
    });

    beforeEach(() => {
        element = document.createElement('div');
        element.innerHTML = `
            <div
                class="Tile-module_tile__UWEHN"
                role="img"
                aria-roledescription="tile"
                aria-label="3rd letter, present"
                data-state="present"
                data-animation="idle"
                data-testid="tile"
                aria-live="polite"
            >
                a
            </div>
        `;
    });

    it('it extracts the relevant data from the element if empty', () => {
        // Given/When
        element.innerHTML = `
            <div aria-label="3rd letter, empty" data-state="empty"></div>
        `;
        const column = new Column(element.firstElementChild, 2);

        // Then
        expect(column.letter.letter).toBe(null);
        expect(column.position).toBe(2);
        expect(column.state).toBe('present');
    });

    it('it extracts the relevant data from the element if letter present', () => {
        // Given/When
        const column = new Column(element.firstElementChild, 2);

        // Then
        expect(column.letter.letter).toBe('a');
        expect(column.position).toBe(2);
        expect(column.state).toBe('present');
    });
});