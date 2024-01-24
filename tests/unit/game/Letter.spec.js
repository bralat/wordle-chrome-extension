import Letter from "@/scripts/game/Letter";

describe('Game/Letter', () => {
    let element;

    beforeEach(() => {
        element = document.createElement('div');
        element.innerHTML = `
            <div data-state="present" data-key="a">a</div>
        `;
    });

    it('extracts the state and letter from element', () => {
        // Given/When
        const letter = new Letter(element.firstElementChild);

        // Then
        expect(letter.letter).toBe('a');
        expect(letter.statePosition.state).toBe('present');
    });

    it('checks the state of the letter', () => {
        // Given/When
        const letter = new Letter(element.firstElementChild);

        // Then
        expect(letter.isState('empty')).toBe(false);
        expect(letter.isState('present')).toBe(true);
    });

    it('detects states that have lower priority than itself', () => {
        // Given/When
        const letter = new Letter(element.firstElementChild);

        // Then
        expect(letter.isPriorityLowerThan('correct')).toBe(true);
        expect(letter.isPriorityLowerThan('present')).toBe(false);
        expect(letter.isPriorityLowerThan('absent')).toBe(false);
    });

    it('detects states that have have the same priority as itself', () => {
        // Given/When
        const letter = new Letter(element.firstElementChild);

        // Then
        expect(letter.isPriorityEqualTo('correct')).toBe(false);
        expect(letter.isPriorityEqualTo('present')).toBe(true);
        expect(letter.isPriorityEqualTo('absent')).toBe(false);
    });

    it('triggers the click event on the element', () => {
        // Given/When
        const letter = new Letter(element.firstElementChild);
        const spy = jest.spyOn(element.firstElementChild, 'click');
        letter.click();

        // Then
        expect(spy).toHaveBeenCalled();
    });

    it('does not append state if state is not valid', () => {
        // Given/When
        const letter = new Letter(element.firstElementChild);
        letter.appendState('invalid');

        // Then
        expect(letter.statePosition.state).toBe('present');
    });

    it('replaces current state if incoming state is higher', () => {
        // Given/When
        const letter = new Letter(element.firstElementChild);
        letter.appendState('correct', 2);

        // Then
        expect(letter.statePosition.state).toBe('correct');
        expect(letter.statePosition.positions).toStrictEqual([2]);
    });

    it('appends position if incoming state is equal to current state', () => {
        // Given/When
        const letter = new Letter(element.firstElementChild);
        letter.appendState('present', 2);
        letter.appendState('present', 3);

        // Then
        expect(letter.statePosition.state).toBe('present');
        expect(letter.statePosition.positions).toStrictEqual([2, 3]);
    });

    it('adds listeners for click event', () => {
        // Given
        const letter = new Letter(element.firstElementChild);
        const documentSpy = jest.spyOn(document, 'addEventListener');
        const elementSpy = jest.spyOn(letter.element, 'addEventListener');

        // When
        letter.onClick(() => {});

        // Then
        expect(documentSpy).toHaveBeenCalledWith('keyup', expect.any(Function));
        expect(elementSpy).toHaveBeenCalledWith('click', expect.any(Function));
    })

    it('returns tbd if state is null', () => {
        // Given
        const letter = new Letter(element.firstElementChild);
        letter.statePosition.state = null;

        // When
        const result = letter.state;

        // Then
        expect(result).toBe('tbd');
    });
});
