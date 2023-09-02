export class Reactive<T>
{
    _value: T;
    _effect?: (value: any) => void

    constructor (value: T, effect?: () => void) {
        this._value = value;
        this._effect = effect;
    }

    setEffect(effect: (value: T) => void) {
        this._effect = effect;
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
        this._effect && this._effect(value)
    }
}
