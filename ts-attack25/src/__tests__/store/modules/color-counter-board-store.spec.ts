// __tests__/store/modules/color-counter-board-store.spec.ts
import { ColorCounterBoardStoreModule } from '@/store/modules/color-counter-board-store';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import ColorCounter from '@/domain/ColorCounter';
import { PanelColor } from '@/domain/panel';
import InitializationService from '@/domain/services/InitializationService';
import { createStore, Store } from 'vuex';

describe('ColorCounterBoardStore Vuex Module', () => {

    let store: Store<any>;
    let newColorCounterBoard: ColorCounterBoard;

    beforeEach(() => {
        store = createStore({
            modules: {
                ColorCounterBoardStoreModule: ColorCounterBoardStoreModule
            }
        });
        newColorCounterBoard = new ColorCounterBoard([
            new ColorCounter(PanelColor.RED, 'red', 1),
            new ColorCounter(PanelColor.GREEN, 'green', 2),
            new ColorCounter(PanelColor.WHITE, 'white', 3),
            new ColorCounter(PanelColor.BLUE, 'blue', 4),
        ]);
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
            store.commit('ColorCounterBoardStoreModule/SET_COLOR_COUNTER_BOARD', newColorCounterBoard);
            const state = store.state.ColorCounterBoardStoreModule;
            expect(state.colorCounterBoard).toEqual(newColorCounterBoard);
        });
    });

    describe('actions', () => {
        it('updateColorCounterBoardState should commit SET_COLOR_COUNTER_BOARD', async () => {
            store.dispatch('ColorCounterBoardStoreModule/updateColorCounterBoardState', newColorCounterBoard);
            expect(store.state.ColorCounterBoardStoreModule.colorCounterBoard).toEqual(newColorCounterBoard);
        });
    });

    describe('getters', () => {
        it('colorCounterBoardGetter should return color counter board', () => {
            const state = store.state.ColorCounterBoardStoreModule;
            const getter = ColorCounterBoardStoreModule.getters!.colorCounterBoardGetter as any;
            const result = getter(state);
            expect(result).toEqual(state.colorCounterBoard);
        });
    });
});
