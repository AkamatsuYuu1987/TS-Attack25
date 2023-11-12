// __tests__/store/modules/game-board-store.spec.ts
import { GameBoardStoreModule } from '@/store/modules/game-board-store';
import GameBoard from '@/domain/GameBoard';
import { createStore, Store } from 'vuex';
import InitializationService from '@/domain/services/InitializationService';

describe('GameBoardStore Vuex Module', () => {

    let store: Store<any>;

    beforeEach(() => {
        store = createStore({
            modules: {
                GameBoardStoreModule: GameBoardStoreModule
            }
        });
    });

    describe('initial state', () => {
        it('should initialize with the correct gameBoard from InitializationService', () => {
            const service = new InitializationService();
            const expectedData = service.initialize().gameBoard;
            expect(store.state.GameBoardStoreModule.gameBoard).toEqual(expectedData);
        });
    });

    describe('mutations', () => {
        it('SET_GAME_BOARD should set game board', () => {
            const newGameBoard = new GameBoard(6, 6);
            store.commit('GameBoardStoreModule/SET_GAME_BOARD', newGameBoard);
            expect(store.state.GameBoardStoreModule.gameBoard).toEqual(newGameBoard);
        });
    });

    describe('actions', () => {
        it('updateGameBoardState should commit SET_GAME_BOARD', async () => {
            const newGameBoard = new GameBoard(6, 6);
            await store.dispatch('GameBoardStoreModule/updateGameBoardState', newGameBoard);
            expect(store.state.GameBoardStoreModule.gameBoard).toEqual(newGameBoard);
        });
    });

    describe('getters', () => {
        it('gameBoardGetter should return game board', () => {
            const newGameBoard = new GameBoard(6, 6);
            store.commit('GameBoardStoreModule/SET_GAME_BOARD', newGameBoard);
            const result = store.getters['GameBoardStoreModule/gameBoardGetter'];
            expect(result).toEqual(newGameBoard);
        });
    });
});
