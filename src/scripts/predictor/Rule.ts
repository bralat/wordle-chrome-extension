export default class Rule 
{
    satisfies (newLetter: string): boolean {
        return this.rule(newLetter);
    }
}
