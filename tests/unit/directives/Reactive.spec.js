import Reactive from "@/src/scripts/Directives/Reactive"

describe('Directives/Reactive', () => {
    it('allows value to be set even if it has no side effect', () => {
        // Given
        const reactiveItem = new Reactive('item');

        // When
        reactiveItem.value = 'new item';

        // Then
        expect(reactiveItem.value).toBe('new item');
    });

    it('allows side effect to be set when value is created', () => {
        // Given
        const effect = jest.fn()
        const reactiveItem = new Reactive('item', effect);

        // When
        reactiveItem.value = 'new item';

        // Then
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('allows side effect to be set later', () => {
        // Given
        const effect = jest.fn()
        const reactiveItem = new Reactive('item');
        reactiveItem.setEffect(effect);

        // When
        reactiveItem.value = 'new item';

        // Then
        expect(effect).toHaveBeenCalledTimes(1);
    });
});
