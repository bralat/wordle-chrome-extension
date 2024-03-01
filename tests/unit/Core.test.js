import Core from "@/scripts/Core";

const mockBind = () => {};
const mockApp = {
    constructor: jest.fn(),
    attachToEmptyRow: {
        bind: jest.fn().mockImplementation(() => mockBind)
    }
}
jest.mock('@/scripts/elements/AppElement',  () => {
    return {
        default: jest.fn().mockImplementation(() => mockApp),
    };
})

describe('Core.ts', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.restoreAllMocks()
    });

    it('should get dictionary and wait for game to be ready when initialised', async () => {
        // Given
        const getDictionarySpy = jest
            .spyOn(Core, 'getDictionary')
            .mockImplementation(() => { })
        const readySpy = jest
            .spyOn(Core, 'ready')
            .mockImplementation(() =>
                Promise.resolve()
            )
        const setupSpy = jest
            .spyOn(Core, 'setup')
            .mockImplementation(() => { })

        // When
        await Core.init()

        // Then
        // assert no http request was made
        expect(getDictionarySpy).toHaveBeenCalled();
        expect(readySpy).toHaveBeenCalled();
        expect(setupSpy).toHaveBeenCalled();
    });

    it('should setup foundation for the app', () => {
        // Given
        const bodyAppendChildSpy = jest
            .spyOn(document.body, 'appendChild')
            .mockImplementation(() => { })
        const headAppendChildSpy = jest
            .spyOn(document.head, 'appendChild')
            .mockImplementation(() => { })
        const eventListenerSpy = jest
            .spyOn(window, 'addEventListener')
            .mockImplementation(() => { })

        // When
        Core.setup()

        // Then
        expect(bodyAppendChildSpy).toHaveBeenCalledWith(mockApp);
        expect(headAppendChildSpy).toHaveBeenCalledWith(expect.any(HTMLStyleElement));
        expect(eventListenerSpy).toHaveBeenCalledWith('resize', mockBind);
    });

    it('should get dictionary from storage if already loaded', () => {
        // Given
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ word: 'word' }]),
            })
        );
        Storage.prototype.getItem = jest.fn(() => {
            return JSON.stringify([
                { word: 'word' }
            ])
        })

        // When
        Core.getDictionary()
        jest.runAllTimers()

        // Then
        // assert no http request was made
        expect(global.fetch).not.toHaveBeenCalled()
    });

    it('should get dictionary via http request', () => {
        // Given
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ word: 'word' }]),
            })
        );
        Storage.prototype.getItem = jest.fn(() => null)
        Object.assign(global, {
            chrome: {
                runtime: {
                    getURL: (path) => 'home/' + path
                }
            }
        })

        // When
        Core.getDictionary()

        // Then
        // assert no http request was made
        expect(global.fetch).toHaveBeenCalled()
    })
})
