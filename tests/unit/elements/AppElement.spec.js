import AppElement from '@/scripts/elements/AppElement';
import Board from '@/scripts/game/Board';
import WordSelectorElement from '@/scripts/elements/WordSelectorElement';
import StarterButtonElement from '@/scripts/elements/StartButtonElement';
import mockView from '../../fixtures/mockNewGame.js';
import mockDictionary from '../../fixtures/mockDictionary.js';
import Predictor from '@/scripts/predictor/Predictor';
import { customElement } from "@/scripts/decorators";

describe('Elements/AppElement.ts', () => {
    beforeAll(() => {
        document.body.innerHTML = mockView;
        jest.useFakeTimers();
        customElement('word-predictor')(AppElement);
        customElement('word-selector')(WordSelectorElement);
        customElement('start-button')(StarterButtonElement);
    });

    it('should update predictions when reset', () => {
        // Given
        const app = new AppElement();
        const runPredictionSpy = jest.spyOn(app, 'runPrediction').mockImplementation(() => { });
        const attachToEmptyRowSpy = jest.spyOn(app, 'attachToEmptyRow').mockImplementation(() => { });

        // When
        app.reset()
        jest.runAllTimers();

        // Then
        expect(runPredictionSpy).toHaveBeenCalled();
        expect(attachToEmptyRowSpy).toHaveBeenCalled();
    })

    it('should use starter words if it\'s a new game', () => {
        // Given
        const app = new AppElement();
        const runPredictionSpy = jest.spyOn(app, 'runPrediction').mockImplementation(() => { });
        const attachToEmptyRowSpy = jest.spyOn(app, 'attachToEmptyRow').mockImplementation(() => { });
        const showSpy = jest.spyOn(app, 'show').mockImplementation(() => { });

        // When
        app.initExtension()
        jest.runAllTimers();

        // Then
        expect(app.wordSelector._words.value).toBe(Predictor.starterWords);
        expect(runPredictionSpy).not.toHaveBeenCalled();
        expect(attachToEmptyRowSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
    })


    it('should run prediction if it\'s not a new game', () => {
        // Given
        localStorage.setItem('words', JSON.stringify(mockDictionary));
        const app = new AppElement();
        jest.spyOn(Board.prototype, 'isEmpty', 'get').mockReturnValue(false);
        const runPredictionSpy = jest.spyOn(app, 'runPrediction');

        // When
        app.initExtension()
        jest.runAllTimers();

        // Then
        expect(runPredictionSpy).toHaveBeenCalled();
    });
})
