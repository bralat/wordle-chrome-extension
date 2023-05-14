import Rule from "./Rule";

export default class LetterRule extends Rule
{
    rule: (a: string) => boolean

    constructor() {
        super()
    }

    is (originalLetter: string) {
        this.rule = (newLetter: string) => newLetter === originalLetter;
    }

    isNot(originalLetter: string) {
        this.rule = (newLetter: string) => newLetter !== originalLetter;
    }
}
