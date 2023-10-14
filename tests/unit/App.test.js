import { jest, describe, expect, test } from '@jest/globals';
import App from "../../src/scripts/App";

describe('App.ts', () => {
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
    })

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

    test('it should wait 2 seconds after script is executed to declare it\'s ready', () => {

    })

    test('it should initialise event listeners', () => {

    })
    test('it should update predictions when reset', () => {

    })

    test('it should run predictions if game is in progress', () => {

    })

    test('it should use starter words if it\'s a new game', () => {

    })
})
