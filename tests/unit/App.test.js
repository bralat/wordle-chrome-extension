import { describe, expect, test, fixture } from '@jest/globals';
import App from "../../src/scripts/App";
import Board from '../../src/scripts/game/Board';
import mockView from '../fixtures/mockView.js';
import mockDictionary from '../fixtures/mockDictionary';
import Predictor from '../../src/scripts/predictor/Predictor';

describe('App.ts', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    test('it should get dictionary from storage if already loaded', () => {
        // Given
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ word: 'word' }]),
            })
        );
        global.localStorage.getItem = jest.fn(() => {
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

    test('it should get dictionary via http request', () => {
        // Given
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ word: 'word' }]),
            })
        );
        global.localStorage.getItem = jest.fn(() => null)
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

    test('it should update predictions when reset', () => {
        // Given
        document.body.innerHTML = mockView;
        localStorage.setItem('words', JSON.stringify(mockDictionary));
        const board = new Board({
            'board': '.Board-module_boardContainer__TBHNL',
            'row': '.Row-module_row__pwpBq',
            'column': 'div.Tile-module_tile__UWEHN'
        });
        const app = new App(board);
        const currentWords = app.wordSelector.element._words.value;

        // When
        app.reset()
        jest.advanceTimersByTime(3000)

        // Then
        expect(app.wordSelector.element._words.value).not.toBe(currentWords);
    })

    test('it should use starter words if it\'s a new game', () => {
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
        expect(app.wordSelector.element._words.value).toBe(Predictor.starterWords);
    })
})