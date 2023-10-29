import Keyboard from '@/scripts/game/Keyboard';
import Letter from '@/scripts/game/Letter';

describe('Game/Keyboard', () => {
    beforeEach(() => {
        // reset Keyboard values
        Keyboard._letters = [];
        Keyboard.BACKSPACE_KEY = null;
        Keyboard.ENTER_KEY = null;
        // insert keyboard into document
        document.body.innerHTML = `
            <div class="Keyboard-module_keyboard__uYuqf">
                <div class="Keyboard-module_row__ilOKU">
                    <button data-key="q" class="Key-module_key__kchQI">q</button>
                    <button data-key="w" class="Key-module_key__kchQI">w</button>
                    <button data-key="e" class="Key-module_key__kchQI">e</button>
                </div>
                <div class="Keyboard-module_row__ilOKU">
                    <button data-key="a" class="Key-module_key__kchQI">a</button>
                    <button data-key="s" class="Key-module_key__kchQI">s</button>
                    <button data-key="d" class="Key-module_key__kchQI">d</button>
                </div>
                <div class="Keyboard-module_row__ilOKU">
                    <button data-key="↵" class="Key-module_key__kchQI">↵</button>
                    <button data-key="←" class="Key-module_key__kchQI">←</button>
                </div>
            </div>
        `;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('extracts the keyboard keys from the document', () => {
        // confirm the special keys have not been set 
        expect(Keyboard.BACKSPACE_KEY).not.toBeInstanceOf(Letter);
        expect(Keyboard.BACKSPACE_KEY).not.toBeInstanceOf(Letter);

        // When
        Keyboard.categoriseLetters();

        // Then
        expect(Keyboard._letters.length).toBe(6);
        // assert letters have been extracted in the correct order
        ['q', 'w', 'e', 'a', 's', 'd'].forEach((letter, index) => {
            expect(Keyboard._letters[index].letter).toBe(letter);
        });
        // assert special keys have been extracted
        expect(Keyboard.BACKSPACE_KEY).toBeInstanceOf(Letter);
        expect(Keyboard.ENTER_KEY).toBeInstanceOf(Letter);
    });

    it('triggers the click event of a letter', () => {
        // Given
        Keyboard.categoriseLetters();
        const spy = jest.spyOn(Keyboard._letters[0], 'click');

        // When
        Keyboard.hit(Keyboard._letters[0]);

        // Then
        expect(spy).toHaveBeenCalled();
    });

    it('retrieves keys from keyboard if it has not already been done', () => {
        const spy = jest.spyOn(Keyboard, 'categoriseLetters');

        // When
        const letters = Keyboard.letters;

        // Then
        expect(spy).toHaveBeenCalled();
    });

    it('does not retrieve keys from keyboard if it has already been done', () => {
        // Given
        Keyboard.categoriseLetters();
        const spy = jest.spyOn(Keyboard, 'categoriseLetters');

        // When
        const letters = Keyboard.letters;

        // Then
        expect(spy).not.toHaveBeenCalled();
    });

    it('triggers the click event of a special key', () => {
        // Given
        Keyboard.categoriseLetters();
        const enterKeySpy = jest.spyOn(Keyboard.ENTER_KEY, 'click');
        const backspaceKeySpy = jest.spyOn(Keyboard.BACKSPACE_KEY, 'click');

        // When
        Keyboard.enter();
        Keyboard.backspace();

        // Then
        expect(enterKeySpy).toHaveBeenCalled();
        expect(backspaceKeySpy).toHaveBeenCalled();
    });

    it('gets letter by string', () => {
        // Given
        Keyboard.categoriseLetters();

        // When
        const letter = Keyboard.getLetter('w');

        // Then
        expect(letter).toBe(Keyboard._letters[1]);
    });

    it('retrieves the full english alphabet', () => {
        expect(Keyboard.alphabet.join('')).toBe('abcdefghijklmnopqrstuvwxyz');
    });
});
