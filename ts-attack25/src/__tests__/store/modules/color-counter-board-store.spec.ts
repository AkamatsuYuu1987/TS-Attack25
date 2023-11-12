// __tests__/store/modules/color-counter-board-store.spec.ts
import { ColorCounterBoardStoreModule } from '@/store/modules/color-counter-board-store';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import ColorCounter from '@/domain/ColorCounter';
import { PanelColor } from '@/domain/panel'
import InitializationService from '@/domain/services/InitializationService';
import { createStore, Store } from 'vuex';

const defaultState = ColorCounterBoardStoreModule.state;

describe('ColorCounterBoardStore Vuex Module', () => {

    let store: Store<any>;

    beforeEach(() => {
        store = createStore({
            modules: {
                ColorCounterBoardStoreModule: ColorCounterBoardStoreModule
            }
        });
    });

    describe('state', () => {
        it('should initialize with the correct colorCounterBoard from InitializationService', () => {
            const service = new InitializationService();
            const expectedData = service.initialize().colorCounterBoard;
            expect(store.state.ColorCounterBoardStoreModule.colorCounterBoard).toEqual(expectedData);
        });
    });

    describe('mutations', () => {
        it('SET_COLOR_COUNTER_BOARD should set color counter board', () => {
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                colorCounterBoard: new ColorCounterBoard([])
            };

            // TODO: テストデータを初期値と変える
            const newColorCounterBoard = new ColorCounterBoard([
                new ColorCounter(PanelColor.RED, 'red', 1),
                new ColorCounter(PanelColor.GREEN, 'green', 2),
                new ColorCounter(PanelColor.WHITE, 'white', 3),
                new ColorCounter(PanelColor.BLUE, 'blue', 4),
            ]);

            ColorCounterBoardStoreModule.mutations!.SET_COLOR_COUNTER_BOARD(state, newColorCounterBoard);

            expect(state.colorCounterBoard).toEqual(newColorCounterBoard);
        });
    });

    describe('actions', () => {
        it('updateColorCounterBoardState should commit SET_COLOR_COUNTER_BOARD', async () => {
            const commit = jest.fn();
            const newColorCounterBoard = new ColorCounterBoard([
                new ColorCounter(PanelColor.RED, 'red', 1),
                new ColorCounter(PanelColor.GREEN, 'green', 2),
                new ColorCounter(PanelColor.WHITE, 'white', 3),
                new ColorCounter(PanelColor.BLUE, 'blue', 4),
            ]);

            // 型アサーションを使用して、関数として呼び出す
            await (ColorCounterBoardStoreModule.actions!.updateColorCounterBoardState as any)({ commit }, newColorCounterBoard);

            expect(commit).toHaveBeenCalledWith('SET_COLOR_COUNTER_BOARD', newColorCounterBoard);
        });
    });

    describe('getters', () => {
        it('colorCounterBoardGetter should return color counter board', () => {
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                colorCounterBoard: new ColorCounterBoard([
                    new ColorCounter(PanelColor.RED, 'red', 1),
                    new ColorCounter(PanelColor.GREEN, 'green', 2),
                    new ColorCounter(PanelColor.WHITE, 'white', 3),
                    new ColorCounter(PanelColor.BLUE, 'blue', 4),
                ])
            };

            const result = ColorCounterBoardStoreModule.getters!.colorCounterBoardGetter(state, {}, {}, {});

            expect(result).toEqual(state.colorCounterBoard);
        });
    });
});
