import Keyboard from "../game/Keyboard";
import Letter from "../game/Letter";
import { DictionaryType } from "../types/DictionaryType";
import { LetterStatePosition } from "../types/LetterStatePosition";
import { PredictedWordInterface } from "../types/PredictedWordsInterface";
import LetterRule from "./LetterRule";
import Position from "./Position";
import WordRule from "./WordRule";

export default class Predictor
{
    letterDetails: LetterStatePosition
    positions: Position[] = []
    rules: WordRule[] = []
    static _dictionary: DictionaryType[]
    static starterWords = [
        { word: 'adieu' },
        { word: 'about' },
        { word: 'react' },
        { word: 'later' },
        { word: 'roast' },
    ]

    constructor() {
        this.positions = [...Array(5)].map(() => new Position);

        // set rules for each position based on letter
        Keyboard.letters.forEach((letter: Letter) => {
            if (letter.state === 'correct') {
                const rule = new LetterRule()
                rule.is(letter.letter)
                letter.statePosition.positions.forEach( (index: number) => {
                    this.positions[index].addRule(rule as LetterRule)
                });
            } else if (letter.state === 'present') {
                let rule: LetterRule | WordRule = new LetterRule;
                rule.isNot(letter.letter)
                letter.statePosition.positions.forEach( (index: number) => {
                    this.positions[index].addRule(rule as LetterRule)
                });

                rule = new WordRule;
                rule.mustHave(letter.letter);
                this.addRule(rule);
            } else if (letter.state === 'absent') {
                const rule = new WordRule;
                rule.mustNotHave(letter.letter);
                this.addRule(rule);
            }
        })
    }

    static get ready (): Boolean {
        return Boolean(Predictor.dictionary)
    }

    static get dictionary () {
        if (!Predictor._dictionary) {
            Predictor._dictionary = JSON.parse(localStorage.getItem('words'));
        }
        // Predictor._dictionary = [
        //     {
        //         word: 'about',
        //         popularity: 1
        //     }
        // ]

        return Predictor._dictionary;
    }

    predict(wordCount: number = 5) {
        const matchingWords: PredictedWordInterface[] = [];

        let index = 0;
        while(index < Predictor.dictionary.length && matchingWords.length < wordCount) {
            const word = Predictor.dictionary[index]
            // run letter rules
            const isLetterMatch = word.word.split('').every((letter: string, index: number) => {
                return this.positions[index].satisfies(letter)
            });

            // run word rules
            const isWordMatch = this.satisfies(word.word);

            if (isLetterMatch && isWordMatch) {
                matchingWords.push({
                    word: word.word,
                    accuracy: '100',
                });
            }
            index += 1;
        }

        return matchingWords;
    }
    
    private addRule(rule: WordRule) {
        this.rules.push(rule)
    }

    private satisfies (word: string): boolean {
        return this.rules.every((rule: WordRule) => rule.satisfies(word))
    }
}