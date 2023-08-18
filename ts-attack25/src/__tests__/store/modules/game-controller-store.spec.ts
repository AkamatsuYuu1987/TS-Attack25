// __tests__/store/modules/game-controller-store.spec.ts
import { GameControllerStoreModule } from '@/store/modules/game-controller-store';
import GameController from '@/domain/GameController';
import GameBoard from '@/domain/GameBoard';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import { PanelColor } from '@/domain/panel';
import ColorCounterType from '@/domain/ColorCounter';
import SelectPanelExecutor from '@/domain/SelectPanelExecutor';

const defaultState = GameControllerStoreModule.state;

describe('GameControllerStore Vuex Module', () => {

    const colorCounters = [
        new ColorCounterType(PanelColor.RED, 'red', 5),
        new ColorCounterType(PanelColor.GREEN, 'green', 4),
        new ColorCounterType(PanelColor.BLUE, 'blue', 3),
        new ColorCounterType(PanelColor.WHITE, 'white', 2),
    ];
    // colorCounterBoardをコンストラクタから生成
    const colorCounterBoard = new ColorCounterBoard(colorCounters);

    const selectPanelExecutor = new SelectPanelExecutor();

    describe('mutations', () => {
        it('SET_GAME_CONTROLLER should set game controller', () => {
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                gameController: null
            };

            const newGameController = new GameController(new GameBoard(5, 5), colorCounterBoard, selectPanelExecutor);

            GameControllerStoreModule.mutations!.SET_GAME_CONTROLLER(state, newGameController);

            expect(state.gameController).toEqual(newGameController);
        });

        it('UPDATE_GAME_BOARD should update game board', () => {
            const gameBoard = new GameBoard(5, 5);
            const gameController = new GameController(gameBoard, colorCounterBoard, selectPanelExecutor);
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                gameController
            };

            const newGameBoard = new GameBoard(3, 3);
            GameControllerStoreModule.mutations!.UPDATE_GAME_BOARD(state, newGameBoard);

            expect(state.gameController?.gameBoard).toEqual(newGameBoard);
        });

        it('UPDATE_COLOR_COUNTER_BOARD should update color counter board', () => {
            const gameBoard = new GameBoard(5, 5);
            const gameController = new GameController(gameBoard, colorCounterBoard, selectPanelExecutor);
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                gameController
            };

            const newColorCounters = [
                new ColorCounterType(PanelColor.RED, 'red', 5),
                new ColorCounterType(PanelColor.GREEN, 'green', 4),
                new ColorCounterType(PanelColor.BLUE, 'blue', 3),
                new ColorCounterType(PanelColor.WHITE, 'white', 2),
            ];
            const newColorCounterBoard = new ColorCounterBoard(newColorCounters);
            GameControllerStoreModule.mutations!.UPDATE_COLOR_COUNTER_BOARD(state, newColorCounterBoard);

            expect(state.gameController?.colorCounterBoard).toEqual(newColorCounterBoard);
        });
    });

    describe('actions', () => {
        it('setGameController should commit SET_GAME_CONTROLLER', async () => {
            const commit = jest.fn();
            const newGameController = new GameController(new GameBoard(5, 5), colorCounterBoard, selectPanelExecutor);

            // 型アサーションを使用して、関数として呼び出す
            await (GameControllerStoreModule.actions!.setGameController as any)({ commit }, newGameController);

            expect(commit).toHaveBeenCalledWith('SET_GAME_CONTROLLER', newGameController);
        });

        it('updateGameBoard should commit UPDATE_GAME_BOARD', async () => {
            const commit = jest.fn();
            const newGameBoard = new GameBoard(5, 5);

            // 型アサーションを使用して、関数として呼び出す
            await (GameControllerStoreModule.actions!.updateGameBoard as any)({ commit }, newGameBoard);

            expect(commit).toHaveBeenCalledWith('UPDATE_GAME_BOARD', newGameBoard);
        });

        it('updateColorCounterBoard should commit UPDATE_COLOR_COUNTER_BOARD', async () => {
            const commit = jest.fn();
            const newColorCounters = [
                new ColorCounterType(PanelColor.RED, 'red', 5),
                new ColorCounterType(PanelColor.GREEN, 'green', 4),
                new ColorCounterType(PanelColor.BLUE, 'blue', 3),
                new ColorCounterType(PanelColor.WHITE, 'white', 2),
            ];
            const newColorCounterBoard = new ColorCounterBoard(newColorCounters);

            // 型アサーションを使用して、関数として呼び出す
            await (GameControllerStoreModule.actions!.updateColorCounterBoard as any)({ commit }, newColorCounterBoard);

            expect(commit).toHaveBeenCalledWith('UPDATE_COLOR_COUNTER_BOARD', newColorCounterBoard);
        });
    });

    describe('getters', () => {
        it('gameBoardGetter should return game board', () => {
            const gameBoard = new GameBoard(5, 5);
            const gameController = new GameController(gameBoard, colorCounterBoard, selectPanelExecutor);

            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                gameController
            };

            const result = GameControllerStoreModule.getters!.gameBoardGetter(state, {}, {}, {});

            expect(result).toEqual(gameBoard);
        });

        it('colorCounterBoardGetter should return color counter board', () => {
            const gameBoard = new GameBoard(5, 5);
            const gameController = new GameController(gameBoard, colorCounterBoard, selectPanelExecutor);

            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                gameController
            };

            const result = GameControllerStoreModule.getters!.colorCounterBoardGetter(state, {}, {}, {});

            expect(result).toEqual(colorCounterBoard);
        });
    });
});
