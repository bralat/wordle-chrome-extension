import Rule from "./Rule";

export default class WordRule extends Rule
{
    mustHave (letter: string) {
        this.rule = (word: string) => word.includes(letter);
    }

    mustNotHave (letter: string) {
        this.rule = (word: string) => !word.includes(letter);
    }
}
