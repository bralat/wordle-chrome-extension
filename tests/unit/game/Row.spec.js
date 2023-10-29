import Row from '@/scripts/game/Row';

jest.mock('@/scripts/game/Column')
jest.mock('@/scripts/game/Keyboard')

describe('Game/Row', () => {
    let element;

    beforeEach (() => {
        element = document.createElement('div');
        element.innerHTML = `
            <div class="Row-module_row__pwpBq" role="group" aria-label="Row 2">
                <div class="" style="animation-delay: 0ms;">
                    <div class="Tile-module_tile__UWEHN" role="img" aria-roledescription="tile" aria-label="1st letter, B, absent" data-state="absent" data-animation="idle" data-testid="tile" aria-live="polite" style="opacity: 1;">
                        <!-- letter goes here -->
                    </div>
                </div>
                <div class="" style="animation-delay: 100ms;">
                    <div class="Tile-module_tile__UWEHN" role="img" aria-roledescription="tile" aria-label="2nd letter, O, absent" data-state="absent" data-animation="idle" data-testid="tile" aria-live="polite" style="opacity: 1;">
                        <!-- letter goes here -->
                    </div>
                </div>
                <div class="" style="animation-delay: 200ms;">
                    <div class="Tile-module_tile__UWEHN" role="img" aria-roledescription="tile" aria-label="3rd letter, O, correct" data-state="correct" data-animation="idle" data-testid="tile" aria-live="polite" style="opacity: 1;">
                        <!-- letter goes here -->
                    </div>
                </div>
                <div class="" style="animation-delay: 300ms;">
                    <div class="Tile-module_tile__UWEHN" role="img" aria-roledescription="tile" aria-label="4th letter, K, absent" data-state="absent" data-animation="idle" data-testid="tile" aria-live="polite" style="opacity: 1;">
                        <!-- letter goes here -->
                    </div>
                </div>
                <div class="" style="animation-delay: 400ms;">
                    <div class="Tile-module_tile__UWEHN" role="img" aria-roledescription="tile" aria-label="5th letter, S, absent" data-state="absent" data-animation="idle" data-testid="tile" aria-live="polite" style="opacity: 1;">
                        <!-- letter goes here -->
                    </div>
                </div>
            </div>
        `;
    });

    it('extracts columns from element', () => {
        // Given/When
        const row = new Row(element.firstElementChild);

        // Then
        expect(row.columns.length).toBe(5);
    });

    it('inserts word into each column', () => {
        // Given
        const row = new Row(element.firstElementChild);
        const spy = jest.spyOn(row, 'clear')

        // When
        row.insertWord('about');

        // Then
        expect(spy).toHaveBeenCalled();
        expect(row.columns[0].insert).toHaveBeenCalledWith('a');
        expect(row.columns[1].insert).toHaveBeenCalledWith('b');
        expect(row.columns[2].insert).toHaveBeenCalledWith('o');
        expect(row.columns[3].insert).toHaveBeenCalledWith('u');
        expect(row.columns[4].insert).toHaveBeenCalledWith('t');
    });

    it('hints each letter into columns', () => {
        // Given
        const row = new Row(element.firstElementChild);

        // When
        row.hintWord('about');

        // Then
        expect(row.columns[0].hint).toHaveBeenCalledWith('a');
        expect(row.columns[1].hint).toHaveBeenCalledWith('b');
        expect(row.columns[2].hint).toHaveBeenCalledWith('o');
        expect(row.columns[3].hint).toHaveBeenCalledWith('u');
        expect(row.columns[4].hint).toHaveBeenCalledWith('t');
    });

    it('returns filled if columns have relevant states', () => {
        // Given
        const row = new Row(element.firstElementChild);

        // When
        row.columns.forEach(column => {
            // return false here to simulate a column that is filled
            column.isState.mockReturnValue(false);
        });

        // Then
        expect(row.state).toBe('filled');
    });

    it('returns empty if columns have relevant states', () => {
        // Given
        const row = new Row(element.firstElementChild);

        // When
        row.columns.forEach(column => {
            // return true here to simulate a column that is not filled
            column.isState.mockReturnValue(true);
        });

        // Then
        expect(row.state).toBe('empty');
    });

    it('clears each column', () => {
        // Given
        const row = new Row(element.firstElementChild);

        // When
        row.clear();

        // Then
        expect(row.columns[0].clear).toHaveBeenCalled();
        expect(row.columns[1].clear).toHaveBeenCalled();
        expect(row.columns[2].clear).toHaveBeenCalled();
        expect(row.columns[3].clear).toHaveBeenCalled();
        expect(row.columns[4].clear).toHaveBeenCalled();
    });

    it('retrieves word from columns', () => {
        // Given
        const row = new Row(element.firstElementChild);

        // When
        row.columns.forEach(column => {
            column.letter = { letter: 'a' };
        });

        // Then
        expect(row.word).toBe('aaaaa');
    });
});