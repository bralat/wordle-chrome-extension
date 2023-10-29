import Position from '@/scripts/predictor/Position'
import LetterRule from "@/scripts/predictor/LetterRule"

let position;
describe ('Predictor/Position', () => {
    beforeEach(() => {
        position = new Position();
        ['A', 'C'].forEach((letter) => {
            const letterRule = new LetterRule();
            letterRule.isNot(letter);
            position.addRule(letterRule);
        });
    });

    it('adds multiple rules per position', () => {
        // When/Then
        expect(position.rules.length).toBe(2)
    });

    it('satisfies all rules', () => {
        // When
        const doesItMatch = position.satisfies('B')

        // Then
        expect(doesItMatch).toBe(true);
    });

    it('fails if one rule is not satisfied', () => {
        // When
        const doesItMatch = position.satisfies('C')

        // Then
        expect(doesItMatch).toBe(false);
    });
});
