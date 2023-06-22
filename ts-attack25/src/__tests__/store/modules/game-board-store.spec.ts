// __tests__/store/modules/game-board-store.spec.ts
import { GameBoardStoreModule } from '@/store/modules/game-board-store';
import GameBoard from '@/domain/GameBoard';
// import { Panel, PanelColor } from '@/domain/panel';

const defaultState = GameBoardStoreModule.state;

describe('GameBoardStore Vuex Module', () => {
    describe('mutations', () => {
        it('SET_GAME_BOARD should set game board', () => {
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                gameBoard: new GameBoard(0, 0)
            };

            const newGameBoard = new GameBoard(5, 5);

            GameBoardStoreModule.mutations!.SET_GAME_BOARD(state, newGameBoard);

            expect(state.gameBoard).toEqual(newGameBoard);
        });
    });

    describe('actions', () => {
        it('updateGameBoardState should commit SET_GAME_BOARD', async () => {
            const commit = jest.fn();
            const newGameBoard = new GameBoard(5, 5);

            // 型アサーションを使用して、関数として呼び出す
            await (GameBoardStoreModule.actions!.updateGameBoardState as any)({ commit }, newGameBoard);

            expect(commit).toHaveBeenCalledWith('SET_GAME_BOARD', newGameBoard);
        });
    });

    describe('getters', () => {
        it('gameBoardGetter should return game board', () => {
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                gameBoard: new GameBoard(5, 5)
            };

            const result = GameBoardStoreModule.getters!.gameBoardGetter(state, {}, {}, {});

            expect(result).toEqual(state.gameBoard);
        });
    });
});
