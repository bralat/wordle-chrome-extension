import Rule from "./Rule";

export default class WordRule extends Rule
{
    rule: (a: string) => (b: string) => boolean

    mustHave (originalLetter: string) {
        this.rule = (newLetter: string) => (originalLetter: string) => newLetter === originalLetter;
    }

    mustNotHave (originalLetter: string) {
        this.rule = (newLetter: string) => (originalLetter: string) => newLetter !== originalLetter;
    }
}
