// __tests__/store/modules/game-controller-store.spec.ts
import { GameControllerStoreModule } from '@/store/modules/game-controller-store';
import GameBoard from '@/domain/GameBoard';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import ColorCounterType from '@/domain/ColorCounter';
import { PanelColor } from '@/domain/panel';
import { createGameController } from '@/factories/gameControllerFactory';
import { createStore, Store } from 'vuex';
import InitializationService from '@/domain/services/InitializationService';

describe('GameControllerStore Vuex Module', () => {
    let store: Store<any>;
    let newGameController: ReturnType<typeof createGameController>;

    beforeEach(() => {
        store = createStore({
            modules: {
                GameControllerStoreModule: GameControllerStoreModule
            }
        });
        newGameController = createGameController(new GameBoard(5, 5), new ColorCounterBoard([
            new ColorCounterType(PanelColor.RED, 'red', 5),
            new ColorCounterType(PanelColor.GREEN, 'green', 4),
            new ColorCounterType(PanelColor.BLUE, 'blue', 3),
            new ColorCounterType(PanelColor.WHITE, 'white', 2),
        ]));
    });

    describe('initial state', () => {
        it('should initialize with the correct gameController from InitializationService', () => {
            const service = new InitializationService();
            const expectedData = service.initialize().gameController;
            expect(store.state.GameControllerStoreModule.gameController).toEqual(expectedData);
        });
    });

    describe('mutations', () => {
        it('SET_GAME_CONTROLLER should set game controller', () => {
            store.commit('GameControllerStoreModule/SET_GAME_CONTROLLER', newGameController);
            const state = store.state.GameControllerStoreModule;
            expect(state.gameController).toEqual(newGameController);
        });

        it('UPDATE_GAME_BOARD should update game board', () => {
            const newGameBoard = new GameBoard(3, 3);
            store.commit('GameControllerStoreModule/UPDATE_GAME_BOARD', newGameBoard);
            const state = store.state.GameControllerStoreModule;
            expect(state.gameController.gameBoard).toEqual(newGameBoard);
        });

        it('UPDATE_COLOR_COUNTER_BOARD should update color counter board', () => {
            const newColorCounterBoard = new ColorCounterBoard([
                new ColorCounterType(PanelColor.RED, 'red', 1),
                new ColorCounterType(PanelColor.GREEN, 'green', 2),
                new ColorCounterType(PanelColor.BLUE, 'blue', 3),
                new ColorCounterType(PanelColor.WHITE, 'white', 4),
            ]);
            store.commit('GameControllerStoreModule/UPDATE_COLOR_COUNTER_BOARD', newColorCounterBoard);
            const state = store.state.GameControllerStoreModule;
            expect(state.gameController.colorCounterBoard).toEqual(newColorCounterBoard);
        });
    });

    describe('actions', () => {
        it('setGameController should commit SET_GAME_CONTROLLER', async () => {
            await store.dispatch('GameControllerStoreModule/setGameController', newGameController);
            expect(store.state.GameControllerStoreModule.gameController).toEqual(newGameController);
        });

        it('updateGameBoard should commit UPDATE_GAME_BOARD', async () => {
            await store.dispatch('GameControllerStoreModule/setGameController', newGameController);
            const newGameBoard = new GameBoard(3, 3);
            await store.dispatch('GameControllerStoreModule/updateGameBoard', newGameBoard);
            expect(store.state.GameControllerStoreModule.gameController.gameBoard).toEqual(newGameBoard);
        });

        it('updateColorCounterBoard should commit UPDATE_COLOR_COUNTER_BOARD', async () => {
            await store.dispatch('GameControllerStoreModule/setGameController', newGameController);
            const newColorCounterBoard = new ColorCounterBoard([
                new ColorCounterType(PanelColor.RED, 'red', 1),
                new ColorCounterType(PanelColor.GREEN, 'green', 2),
                new ColorCounterType(PanelColor.BLUE, 'blue', 3),
                new ColorCounterType(PanelColor.WHITE, 'white', 4),
            ]);
            await store.dispatch('GameControllerStoreModule/updateColorCounterBoard', newColorCounterBoard);
            expect(store.state.GameControllerStoreModule.gameController.colorCounterBoard).toEqual(newColorCounterBoard);
        });
    });

    describe('getters', () => {
        it('gameBoardGetter should return game board', () => {
            const state = store.state.GameControllerStoreModule;
            const getter = GameControllerStoreModule.getters!.gameBoardGetter as any;
            const result = getter(state);
            expect(result).toEqual(newGameController.gameBoard);
        });

        it('colorCounterBoardGetter should return color counter board', () => {
            const service = new InitializationService();
            const expectedData = service.initialize().gameController.colorCounterBoard;
            const state = store.state.GameControllerStoreModule;
            const getter = GameControllerStoreModule.getters!.colorCounterBoardGetter as any;
            const result = getter(state);
            expect(result).toEqual(expectedData);
        });
    });
});
