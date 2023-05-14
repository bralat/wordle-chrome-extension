import LetterRule from "./LetterRule"

export default class Position
{
    rules: LetterRule[] = []

    addRule(rule: LetterRule) {
        this.rules.push(rule)
    }

    /**
     * Check that the letter satisfies all rules
     */
    satisfies (letter: string): boolean {
        return this.rules.every((rule: LetterRule) => {
            return rule.satisfies(letter)
        })
    }
}
