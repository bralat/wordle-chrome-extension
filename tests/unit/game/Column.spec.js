import Column from '@/scripts/game/Column';
import Letter from '@/scripts/game/Letter';
import Keyboard from '@/scripts/game/Keyboard';

describe('Game/Column', () => {
    let element;

    beforeAll(() => { 
        // create a letters to be used in the column
        ['a', 'b'].forEach((letter) => {
            const letterElement = document.createElement('div');
            letterElement.innerHTML = `<div data-state="present" data-key="${letter}">${letter}</div>`;
            Keyboard._letters.push(new Letter(letterElement.firstElementChild))
        });
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
                aria-live="polite">a</div>
        `;
    });

    it('it extracts the relevant data from the element if empty', () => {
        // Given/When
        element.innerHTML = `
            <div aria-label="3rd letter, empty" data-state="empty"></div>
        `;
        const column = new Column(element.firstElementChild, 2);

        // Then
        expect(column.letter).toBe(null);
        expect(column.position).toBe(2);
        expect(column.state).toBe('empty');
    });

    it('it extracts the relevant data from the element if letter present', () => {
        // Given/When
        const column = new Column(element.firstElementChild, 2);

        // Then
        expect(column.letter.letter).toBe('a');
        expect(column.position).toBe(2);
        expect(column.state).toBe('present');
    });

    it('updates letter state when element attribute changes', () => {
        // Given
        const column = new Column(element.firstElementChild, 2);

        // When
        element.firstElementChild.setAttribute('data-state', 'correct');

        // Then
        expect(column.state).toBe('correct');
    });

    it('does not refresh letter state if letter is empty', () => {
        // Given
        element.innerHTML = `
            <div aria-label="3rd letter, empty" data-state="empty"></div>
        `;
        const column = new Column(element.firstElementChild, 2);

        // When
        element.firstElementChild.setAttribute('data-state', 'correct');

        // Then
        expect(column._state).toBe('empty');
    });

    it('checks if state matches current state', () => {
        // Given
        const column = new Column(element.firstElementChild, 2);

        // Then
        expect(column.isState('correct')).toBe(false);
        expect(column.isState('present')).toBe(true);
    });

    it('inserts letter when Letter instance is passed', () => {
        // Given
        const column = new Column(element.firstElementChild, 2);
        const clickSpy = jest.spyOn(Keyboard._letters[1], 'click');
        const observerSpy = jest.spyOn(column, 'setUpObserver');

        // When
        column.insert(Keyboard._letters[1]);

        // Then
        expect(column.letter).toBe(Keyboard._letters[1]);
        expect(clickSpy).toHaveBeenCalled();
        expect(observerSpy).toHaveBeenCalled();
    });

    it('inserts letter when Letter string is passed', () => {
        // Given
        const column = new Column(element.firstElementChild, 2);
        const clickSpy = jest.spyOn(Keyboard._letters[1], 'click');
        const observerSpy = jest.spyOn(column, 'setUpObserver');

        // When
        column.insert(Keyboard._letters[1].letter);

        // Then
        expect(column.letter).toBe(Keyboard._letters[1]);
        expect(clickSpy).toHaveBeenCalled();
        expect(observerSpy).toHaveBeenCalled();
    });

    it('hints letter when Letter instance is passed', () => {
        // Given
        const column = new Column(element.firstElementChild, 2);

        // When
        column.hint(Keyboard._letters[1]);

        // Then
        expect(column.element.innerHTML).toBe(Keyboard._letters[1].letter);
        expect(column.element.getAttribute('aria-label')).toBe(Keyboard._letters[1].letter);
    });
    
    it('hints letter when Letter string is passed', () => {
        // Given
        const column = new Column(element.firstElementChild, 2);

        // When
        column.hint(Keyboard._letters[1].letter);

        // Then
        expect(column.element.innerHTML).toBe(Keyboard._letters[1].letter);
        expect(column.element.getAttribute('aria-label')).toBe(Keyboard._letters[1].letter);
    });

    it('sets opacity to 0.5 when setting the mode to hint', () => {
        // Given
        const column = new Column(element.firstElementChild, 2);

        // When
        column.mode = 'hint';

        // Then
        expect(column.element.style.opacity).toBe('0.5');
    });

    it('sets opacity to 1 when setting the mode to insert', () => {
        // Given
        const column = new Column(element.firstElementChild, 2);

        // When
        column.mode = 'insert';

        // Then
        expect(column.element.style.opacity).toBe('1');
    });

    it('clears the column', () => { 
        // Given
        const column = new Column(element.firstElementChild, 2);
        Keyboard.backspace = jest.fn();

        // When
        column.clear();

        // Then
        expect(column.letter).toBe(null);
        expect(column._state).toBe('empty');
        expect(column.element.innerHTML).toBe('');
        expect(column._mode).toBe('insert');
        expect(Keyboard.backspace).toHaveBeenCalled();
    })
});
