import Predictor from '@/scripts/predictor/Predictor'
import Letter from '@/scripts/game/Letter'
import Keyboard from '@/scripts/game/Keyboard'
import LetterRule from '@/scripts/predictor/LetterRule'
import WordRule from '@/scripts/predictor/WordRule'
import Position from '@/scripts/predictor/Position'

jest.mock('@/scripts/predictor/LetterRule')
jest.mock('@/scripts/predictor/WordRule')
jest.mock('@/scripts/predictor/Position')

function setKeyboardLetters(data) {
    Keyboard._letters = data.map(letterData => {
        const element = document.createElement('div');
        element.setAttribute('data-state', letterData.statePosition.state);
        element.setAttribute('data-key', letterData.letter);

        const letter = new Letter(element);
        letter.statePosition = letterData.statePosition;

        return letter;
    });
};

describe('Predictor/Predictor', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sets rules in the right positions when the state is correct', () => {
        // Given
        const data = [
            {
                letter: 'a',
                statePosition: {
                    state: 'correct',
                    positions: [2]
                }
            },
        ]
        setKeyboardLetters(data);

        // When
        const predictor = new Predictor();

        // Then
        // expect the right method in the letter rule was called
        expect(LetterRule.mock.instances.length).toBe(1);
        expect(LetterRule.mock.instances[0].is).toHaveBeenCalledTimes(1);
        expect(LetterRule.mock.instances[0].is).toHaveBeenCalledWith('a');
        expect(LetterRule.mock.instances[0].isNot).not.toHaveBeenCalled();
        // assert the rules were added to the right positions
        const positionMocks = Position.mock.instances;
        expect(positionMocks.length).toBe(5);
        expect(positionMocks[0].addRule).not.toHaveBeenCalled();
        expect(positionMocks[1].addRule).not.toHaveBeenCalled();
        expect(positionMocks[2].addRule).toHaveBeenCalledTimes(1);
        expect(positionMocks[3].addRule).not.toHaveBeenCalled();
        expect(positionMocks[4].addRule).not.toHaveBeenCalled();
        // assert the right number of word rules were generated
        expect(predictor.rules.length).toBe(0);
    });

    it('sets rules in the right positions when the state is present', () => {
        // Given
        const data = [
            {
                letter: 'a',
                statePosition: {
                    state: 'present',
                    positions: [1,3]
                }
            },
        ]
        setKeyboardLetters(data);

        // When
        const predictor = new Predictor();

        // Then
        // expect the right method in the letter rule was called
        expect(LetterRule.mock.instances.length).toBe(1);
        expect(LetterRule.mock.instances[0].is).not.toHaveBeenCalled();
        expect(LetterRule.mock.instances[0].isNot).toHaveBeenCalledTimes(1);
        expect(LetterRule.mock.instances[0].isNot).toHaveBeenCalledWith('a');
        // assert the rules were added to the right positions
        const positionMocks = Position.mock.instances;
        expect(positionMocks.length).toBe(5);
        expect(positionMocks[0].addRule).not.toHaveBeenCalled();
        expect(positionMocks[1].addRule).toHaveBeenCalledTimes(1);
        expect(positionMocks[2].addRule).not.toHaveBeenCalled();
        expect(positionMocks[3].addRule).toHaveBeenCalledTimes(1);
        expect(positionMocks[4].addRule).not.toHaveBeenCalled();
        // expect the right method in the word rule was called
        expect(WordRule.mock.instances.length).toBe(1);
        expect(WordRule.mock.instances[0].mustHave).toHaveBeenCalledWith('a');
        expect(WordRule.mock.instances[0].mustNotHave).not.toHaveBeenCalled();
        // assert the right number of word rules were generated
        expect(predictor.rules.length).toBe(1);
    });

    it('sets rules in the right positions when the state is absent', () => {
        // Given
        const data = [
            {
                letter: 'a',
                statePosition: {
                    state: 'absent',
                    positions: [1,3]
                }
            },
        ]
        setKeyboardLetters(data);

        // When
        const predictor = new Predictor();

        // Then
        // expect no letter rule was created
        expect(LetterRule.mock.instances.length).toBe(0);
        // assert no rules were added
        const positionMocks = Position.mock.instances;
        expect(positionMocks.length).toBe(5);
        expect(positionMocks[0].addRule).not.toHaveBeenCalled();
        expect(positionMocks[1].addRule).not.toHaveBeenCalled();
        expect(positionMocks[2].addRule).not.toHaveBeenCalled();
        expect(positionMocks[3].addRule).not.toHaveBeenCalled();
        expect(positionMocks[4].addRule).not.toHaveBeenCalled();
        // expect the right method in the word rule was called
        expect(WordRule.mock.instances.length).toBe(1);
        expect(WordRule.mock.instances[0].mustHave).not.toHaveBeenCalled();
        expect(WordRule.mock.instances[0].mustNotHave).toHaveBeenCalledWith('a');
        // assert the right number of word rules were generated
        expect(predictor.rules.length).toBe(1);
    });
});
