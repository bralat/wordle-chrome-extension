import Rule from "./Rule";

export default class LetterRule extends Rule
{
    rule: (a: string) => boolean

    constructor() {
        super()
    }

    is (originalLetter: string): this {
        this.rule = (newLetter: string) => newLetter === originalLetter;

        return this;
    }

    isNot(originalLetter: string): this {
        this.rule = (newLetter: string) => newLetter !== originalLetter;

        return this;
    }
}
