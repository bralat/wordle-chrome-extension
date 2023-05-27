import Keyboard from "../game/Keyboard";
import { DictionaryType } from "../types/DictionaryType";
import { LetterStatePosition } from "../types/LetterStatePosition";
import { PredictedWordInterface } from "../types/PredictedWordsInterface";
import LetterRule from "./LetterRule";
import Position from "./Position";
import WordRule from "./WordRule";

export default class Predictor
{
    letterDetails: LetterStatePosition
    letters: string[] = []
    positions: Position[] = []
    rules: WordRule[] = []
    static _dictionary: DictionaryType[]

    constructor(letterDetails: LetterStatePosition) {
        this.letters = Keyboard.alphabet;
        this.positions = [...Array(5)].map(() => new Position);
        this.letterDetails = letterDetails;

        // set rules for each position based on letter
        this.letters.forEach((letter: string) => {
            if (this.letterDetails[letter].state === 'correct') {
                const rule = new LetterRule()
                rule.is(letter)
                this.positions[this.letterDetails[letter].positions.toReversed()[0] as number].addRule(rule)
            } else if (this.letterDetails[letter].state === 'present') {
                let rule = new LetterRule;
                rule.isNot(letter)
                this.letterDetails[letter].positions.forEach( (index: number) => {
                    this.positions[index].addRule(rule)
                });

                rule = new WordRule;
                rule.mustHave(letter);
                this.addRule(rule);
            } else if (this.letterDetails[letter].state === 'absent') {
                const rule = new WordRule;
                rule.mustNotHave(letter);
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