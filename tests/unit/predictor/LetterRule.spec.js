import LetterRule from "@/scripts/predictor/LetterRule"

describe('Predictor/LetterRule', () => {
    it('satisfies "is" rule if letter matches', () => {
        // Given
        const letterRule = new LetterRule();
        letterRule.is('A');

        // When
        const doesItMatch = letterRule.satisfies('A');

        // Then
        expect(doesItMatch).toBe(true);
    });

    it('does not satisfy "is" rule if letter does not match', () => {
        // Given
        const letterRule = new LetterRule();
        letterRule.is('A');

        // When
        const doesItMatch = letterRule.satisfies('B');

        // Then
        expect(doesItMatch).toBe(false);
    });

    it('satisfies "isNot" rule if letter does not match', () => {
        // Given
        const letterRule = new LetterRule();
        letterRule.isNot('A');

        // When
        const doesItMatch = letterRule.satisfies('B');
        
        // Then
        expect(doesItMatch).toBe(true);
    });

    it('does not satisfy "isNot" rule if letter matches', () => {
        // Given
        const letterRule = new LetterRule();
        letterRule.isNot('A');

        // When
        const doesItMatch = letterRule.satisfies('A');
        
        // Then
        expect(doesItMatch).toBe(false);
    });
})