export default class Rule 
{
    rule: (b: string) => boolean

    satisfies (newLetter: string): boolean {
        return this.rule(newLetter);
    }
}
