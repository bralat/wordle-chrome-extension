import WordRule from "@/scripts/predictor/WordRule"

describe('Predictor/WordRule', () => {
    it('satisfies "mustHave" rule if word contains the letter', () => {
        // Given
        const wordRule = new WordRule();
        wordRule.mustHave('A');

        // When
        const doesItMatch = wordRule.satisfies('TAMALE');

        // Then
        expect(doesItMatch).toBe(true);
    });

    it('does not satisfy "mustHave" rule if word does not contain the letter', () => {
        // Given
        const wordRule = new WordRule();
        wordRule.mustHave('Z');

        // When
        const doesItMatch = wordRule.satisfies('TAMALE');

        // Then
        expect(doesItMatch).toBe(false);
    });

    it('satisfies "mustNotHave" rule if word does not contain the letter', () => {
        // Given
        const wordRule = new WordRule();
        wordRule.mustNotHave('Z');

        // When
        const doesItMatch = wordRule.satisfies('KUMASI');

        // Then
        expect(doesItMatch).toBe(true);
    });

    it('does not satisfy "mustNotHave" rule if word contains the letter', () => {
        // Given
        const wordRule = new WordRule();
        wordRule.mustNotHave('A');

        // When
        const doesItMatch = wordRule.satisfies('KUMASI');

        // Then
        expect(doesItMatch).toBe(false);
    });
});
