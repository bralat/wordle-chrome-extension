import Board from '@/scripts/game/Board';
import Column from '@/scripts/game/Column';

jest.mock('@/scripts/game/Column')
jest.mock('@/scripts/game/Keyboard')
jest.mock('@/scripts/game/Row')

describe('Game/Board', () => {
    let element;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="Board-module_boardContainer__TBHNL" style="overflow: unset;">
                <div class="Board-module_board__jeoPS" style="width: 300px; height: 360px;">
                    <div class="Row-module_row__pwpBq" role="group" aria-label="Row 1">
                    </div>
                    <div class="Row-module_row__pwpBq" role="group" aria-label="Row 2">
                    </div>
                    <div class="Row-module_row__pwpBq" role="group" aria-label="Row 3">
                    </div>
                    <div class="Row-module_row__pwpBq" role="group" aria-label="Row 4">
                    </div>
                    <div class="Row-module_row__pwpBq" role="group" aria-label="Row 5">
                    </div>
                    <div class="Row-module_row__pwpBq" role="group" aria-label="Row 6">
                    </div>
                </div>
            </div>
        `
    })

    it('extracts rows from element', () => {
        // Given/When
        const board = new Board();

        // Then
        expect(board.rows.length).toBe(6);
    });

    it('returns the first empty row', () => {
        // Given
        const board = new Board();
        board.rows[0].is.mockReturnValue(false);
        board.rows[1].is.mockReturnValue(true);

        // When/Then
        expect(board.nextRow).toBe(board.rows[1]);
    })

    it('returns the last filled row', () => {
        // Given
        const board = new Board();
        board.rows[0].is.mockReturnValue(true);
        board.rows[1].is.mockReturnValue(true);
        board.rows[2].is.mockReturnValue(false);

        // When/Then
        expect(board.lastFilledRow).toBe(board.rows[1]);
    })

    it('returns true when isComplete is called if all columns in last filled row is correct', () => {
        // Given
        const board = new Board();
        jest.spyOn(Column.prototype, 'isState').mockReturnValue(true);
        jest.spyOn(Board.prototype, 'lastFilledRow', 'get').mockReturnValue(board.rows[0]);
        board.rows[0].columns = [
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column()
        ];

        // When/Then
        expect(board.isComplete()).toBe(true);
    });

    it('returns false when isComplete is called if not columns in last filled row is correct', () => {
        // Given
        const board = new Board();
        jest.spyOn(Column.prototype, 'isState').mockReturnValue(false);
        jest.spyOn(Board.prototype, 'lastFilledRow', 'get').mockReturnValue(board.rows[0]);
        board.rows[0].columns = [
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column()
        ];

        // When/Then
        expect(board.isComplete()).toBe(false);
    });

    it('returns true if game has not been started', () => {
        // Given
        const board = new Board();
        // mock is on each row to return true
        board.rows.forEach(row => {
            row.is.mockReturnValue(true);
        });

        // When/Then
        expect(board.isEmpty).toBe(true);
    });

    it('returns false if game has been started', () => {
        // Given
        const board = new Board();
        board.rows[0].is.mockReturnValue(false);
        board.rows.slice(1).forEach(row => {
            row.is.mockReturnValue(true);
        });

        // When/Then
        expect(board.isEmpty).toBe(false);
    });

    // TODO: test appendRow

    // TODO: test appendToEmptyRow
});
