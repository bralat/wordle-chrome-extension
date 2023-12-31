import App from "@/scripts/App";
import Board from '@/scripts/game/Board';
import mockNewGame from '../fixtures/mockNewGame.js';
import mockGameInProgress from '../fixtures/mockGameInProgress.js';
import mockDictionary from '../fixtures/mockDictionary.js';
import Predictor from '@/scripts/predictor/Predictor';

const isAppendedToRow = (element, row) => {
    // get positions
    const rectRow = row.getBoundingClientRect();

    return parseInt(element.style.top) === rectRow.top + 5;
}

describe('App.ts', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.spyOn(App, 'ready').mockImplementation(() => Promise.resolve(true));
    });

    it('appends to empty row on board for new game', async () => {
        // Given        
        localStorage.setItem("words", JSON.stringify(mockDictionary));
        document.body.innerHTML = mockNewGame;
        const rows = document.body.querySelectorAll('.Row-module_row__pwpBq');
        rows.forEach((row, index) => {
            row.getBoundingClientRect = jest.fn(() => ({
                top: index * 55,
                bottom: index * 55 + 55,
            }))
        });

        // When
        await import('@/scripts/index');
        jest.advanceTimersByTime(3000);

        const innerHTML = document.body.innerHTML;
        // Then
        // assert that the word selector is appended to the first row
        expect(isAppendedToRow(document.querySelector('word-selector'), rows[0])).toBe(true);
        // assert that the button is appended to the first row
        expect(isAppendedToRow(document.querySelector('start-button'), rows[0])).toBe(true);
    });

    it('appends to empty row on board for game in progress', async () => {
        // Given        
        localStorage.setItem("words", JSON.stringify(mockDictionary));
        document.body.innerHTML = mockGameInProgress;
        const rows = document.body.querySelectorAll('.Row-module_row__pwpBq');
        rows.forEach((row, index) => {
            row.getBoundingClientRect = jest.fn(() => ({
                top: index * 55,
                bottom: index * 55 + 55
            }))
        });

        // When
        delete require.cache[require.resolve('@/scripts/index')];
        await import('@/scripts/index');
        jest.advanceTimersByTime(3000);

        // Then
        // assert that the word selector is appended to the first row
        expect(isAppendedToRow(document.querySelector('word-selector'), rows[1])).toBe(true);
        // assert that the button is appended to the first row
        expect(isAppendedToRow(document.querySelector('start-button'), rows[1])).toBe(true);
    });
});