// game-controller-store.ts
import { Module, Commit, ActionTree } from 'vuex';
import GameController from '@/domain/GameController';
import GameBoard from '@/domain/GameBoard';
import ColorCounterBoard from '@/domain/ColorCounterBoard';

interface State {
    gameController: GameController | null;
}

const state = (): State => ({
    gameController: null,
})

const getters = {
    gameBoardGetter: (state: State) => state.gameController?.gameBoard,
    colorCounterBoardGetter: (state: State) => state.gameController?.colorCounterBoard,
}

const mutations = {
    SET_GAME_CONTROLLER(state: State, gameController: GameController) {
        state.gameController = gameController;
    },
    UPDATE_GAME_BOARD(state: State, gameBoard: GameBoard) {
        if (state.gameController) {
            state.gameController.gameBoard = gameBoard;
        }
    },
    UPDATE_COLOR_COUNTER_BOARD(state: State, colorCounterBoard: ColorCounterBoard) {
        if (state.gameController) {
            state.gameController.colorCounterBoard = colorCounterBoard;
        }
    },
}

const actions: ActionTree<State, unknown> = {
    setGameController({ commit }: { commit: Commit }, gameController: GameController) {
        commit('SET_GAME_CONTROLLER', gameController);
    },
    updateGameBoard({ commit }: { commit: Commit }, gameBoard: GameBoard) {
        commit('UPDATE_GAME_BOARD', gameBoard);
    },
    updateColorCounterBoard({ commit }: { commit: Commit }, colorCounterBoard: ColorCounterBoard) {
        commit('UPDATE_COLOR_COUNTER_BOARD', colorCounterBoard);
    },
}

export const GameControllerStoreModule: Module<State, unknown> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
