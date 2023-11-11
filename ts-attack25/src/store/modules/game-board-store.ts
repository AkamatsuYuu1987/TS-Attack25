// game-board-store.ts
import { Module, Commit, ActionTree } from 'vuex';
import GameBoard from '@/domain/GameBoard';
import InitializationService from '@/domain/services/InitializationService';

const initializationService = new InitializationService();

interface State {
    gameBoard: GameBoard | null;
}

const state = (): State => ({
    gameBoard: initializationService.initialize().gameBoard,
})

const getters = {
    gameBoardGetter: (state: State) => state.gameBoard,
}

const mutations = {
    SET_GAME_BOARD(state: State, gameBoard: GameBoard) {
        state.gameBoard = gameBoard;
    },
}

const actions: ActionTree<State, unknown> = {
    updateGameBoardState({ commit }: { commit: Commit }, gameBoard: GameBoard) {
        commit('SET_GAME_BOARD', gameBoard);
    },
}

export const GameBoardStoreModule: Module<State, unknown> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
