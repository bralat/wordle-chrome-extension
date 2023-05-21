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
    dictionary: DictionaryType[] = []

    constructor(letterDetails: LetterStatePosition) {
        this.letters = Keyboard.alphabet;
        this.getDictionary();

        this.positions = [...Array(5)].map(() => new Position);
        this.letterDetails = letterDetails;

        // set rules for each position based on letter
        this.letters.forEach((letter: string) => {
            if (this.letterDetails[letter].state === 'correct') {
                const rule = new LetterRule()
                rule.is(letter)
                this.positions[this.letterDetails[letter].position as number].addRule(rule)
            } else if (this.letterDetails[letter].state === 'present') {
                let rule = new LetterRule;
                rule.isNot(letter)
                this.positions[this.letterDetails[letter].position as number].addRule(rule)

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

    async getDictionary() {
        // console.log(chrome.runtime.getURL('/assets/words.json'));
        // const response = await fetch(chrome.runtime.getURL('assets/words.json'));
        // const json = await response.json();
        // console.log(json);

        // this.words = json
        this.words = [
            {
              word: 'slate',
              popularity: '1',
            },
            {
              word: 'miaou',
              popularity: '0.9'
            }
        ]
    }

    predict(wordCount: number = 5) {
        const matchingWords: PredictedWordInterface[]  = [];
        this.words.every((word) => {
            // run letter rules
            const isLetterMatch = word.word.split('').every((letter: string, index: number) => {
                return this.positions[index].satisfies(letter)
            });

            // run word rules
            // const isWordMatch = this.satisfies(word);
            const isWordMatch = true;

            if (isLetterMatch && isWordMatch) {
                matchingWords.push({
                    word: word.word,
                    accuracy: '100',
                });
            }
            if (matchingWords.length > wordCount) {
                return false
            }
        })

        console.log(matchingWords)

        return matchingWords;
    }
    
    private addRule(rule: WordRule) {
        this.rules.push(rule)
    }

    private satisfies (word: string): boolean {
        return this.rules.every((rule: WordRule) => {
            return rule.satisfies(word)
        })
    } 
}