import Rule from "./Rule";

export default class WordRule extends Rule
{
    rule: (b: string) => boolean

    mustHave (letter: string) {
        this.rule = (word: string) => word.includes(letter);
    }

    mustNotHave (letter: string) {
        this.rule = (word: string) => !word.includes(letter);
    }
}
