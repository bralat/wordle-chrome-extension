import Letter from "@/src/scripts/game/Letter";

describe('Game/Letter', () => {
    it('extracts the state and letter from element', () => {
        // Given
        const element = document.createElement('div');
        element.innerHTML = `
            <div data-state="present" data-key="a">a</div>
        `;

        // When
        const letter = new Letter(element.firstElementChild);

        // Then
        expect(letter.letter).toBe('a');
        expect(letter.statePosition.state).toBe('present');
    });

    it('checks the state of the letter', () => {
        // Given
        const element = document.createElement('div');
        element.innerHTML = `
            <div data-state="present" data-key="a">a</div>
        `;

        // When/Then
        const letter = new Letter(element.firstElementChild);
        expect(letter.isState('empty')).toBe(false);
        expect(letter.isState('present')).toBe(true);
    });

    it('detects states that have lower priority than itself', () => {
        // Given
        const element = document.createElement('div');
        element.innerHTML = `
            <div data-state="present" data-key="a">a</div>
        `;

        // When/Then
        const letter = new Letter(element.firstElementChild);
        expect(letter.isPriorityLowerThan('correct')).toBe(true);
        expect(letter.isPriorityLowerThan('present')).toBe(false);
        expect(letter.isPriorityLowerThan('absent')).toBe(false);
    });

    it('detects states that have have the same priority as itself', () => {
        // Given
        const element = document.createElement('div');
        element.innerHTML = `
            <div data-state="present" data-key="a">a</div>
        `;

        // When/Then
        const letter = new Letter(element.firstElementChild);
        expect(letter.isPriorityEqualTo('correct')).toBe(false);
        expect(letter.isPriorityEqualTo('present')).toBe(true);
        expect(letter.isPriorityEqualTo('absent')).toBe(false);
    });

    it('triggers the click event on the element', () => {
        // Given
        const element = document.createElement('div');
        element.innerHTML = `
            <div data-state="present" data-key="a">a</div>
        `;

        // When/Then
        const letter = new Letter(element.firstElementChild);
        expect(letter.isPriorityEqualTo('correct')).toBe(false);
        expect(letter.isPriorityEqualTo('present')).toBe(true);
        expect(letter.isPriorityEqualTo('absent')).toBe(false);
    });
});
