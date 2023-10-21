import LetterRule from "@/src/scripts/predictor/LetterRule"

describe('LetterRule', () => {
    it('it satisfies rule if letter matches', () => {
        // Given
        const letterRule = new LetterRule();
        letterRule.is('A');

        // When
        const doesItMatch = letterRule.satisfies('A');
        
        // Then
        expect(doesItMatch).toBe(true);
    });

    it('it satisfies rule if letter does not match', () => {
        // Given
        const letterRule = new LetterRule();
        letterRule.is('A');

        // When
        const doesItMatch = letterRule.satisfies('B');
        
        // Then
        expect(doesItMatch).toBe(false);
    });
})