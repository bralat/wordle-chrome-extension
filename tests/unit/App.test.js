import App from "@/scripts/App";
import Board from '@/scripts/game/Board';
import mockView from '../fixtures/mockView.js';
import mockDictionary from '../fixtures/mockDictionary';
import Predictor from '@/scripts/predictor/Predictor';

describe('App.ts', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it('should get dictionary from storage if already loaded', () => {
        // Given
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ word: 'word' }]),
            })
        );
        Storage.prototype.getItem = jest.fn(() => {
            return JSON.stringify([
                { word: 'word' }
            ])
        })

        // When
        App.getDictionary()

        // Then
        // assert no http request was made
        expect(global.fetch).not.toHaveBeenCalled()
    });

    it('should get dictionary via http request', () => {
        // Given
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ word: 'word' }]),
            })
        );
        Storage.prototype.getItem = jest.fn(() => null)
        Object.assign(global, {
            chrome: {
                runtime: {
                    getURL: (path) => 'home/' + path
                }
            }
        })

        // When
        App.getDictionary()

        // Then
        // assert no http request was made
        expect(global.fetch).toHaveBeenCalled()
    })

    it('should update predictions when reset', () => {
        // Given
        document.body.innerHTML = mockView;
        localStorage.setItem('words', JSON.stringify(mockDictionary));
        const board = new Board({
            'board': '.Board-module_boardContainer__TBHNL',
            'row': '.Row-module_row__pwpBq',
            'column': 'div.Tile-module_tile__UWEHN'
        });
        const app = new App(board);
        const currentWords = app.wordSelector._words.value;

        // When
        app.reset()
        jest.advanceTimersByTime(3000)

        // Then
        expect(app.wordSelector._words.value).not.toBe(currentWords);
    })

    it('should use starter words if it\'s a new game', () => {
        document.body.innerHTML = mockView;
        localStorage.setItem('words', JSON.stringify(mockDictionary));
        const board = new Board({
            'board': '.Board-module_boardContainer__TBHNL',
            'row': '.Row-module_row__pwpBq',
            'column': 'div.Tile-module_tile__UWEHN'
        });
        const app = new App(board);

        // When
        app.initExtension()
        jest.advanceTimersByTime(3000)

        // Then
        expect(app.wordSelector._words.value).toBe(Predictor.starterWords);
    })
})
