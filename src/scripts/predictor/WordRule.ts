import Rule from "./Rule";

export default class WordRule extends Rule
{
    mustHave (letter: string): WordRule {
        this.rule = (word: string) => word.includes(letter);

        return this
    }

    mustNotHave (letter: string): this {
        this.rule = (word: string) => !word.includes(letter);

        return this
    }
}
