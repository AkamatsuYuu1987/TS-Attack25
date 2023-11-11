// store/modules/initializationModule.ts

import { Module, Commit } from 'vuex';
import { InitializationResult } from '@/types/domain/services/InitializationServiceTypes';
import InitializationService from '@/domain/services/InitializationService';

interface RootState {
    InitializationServiceModule: InitializationResult;
}

const initializationService = new InitializationService();

const state: InitializationResult = {
    gameBoard: null,
    colorCounterBoard: null,
    gameController: null
};

const getters = {
    gameBoardGetter: (state: InitializationResult) => state.gameBoard,
    colorCounterBoardGetter: (state: InitializationResult) => state.colorCounterBoard,
    gameControllerGetter: (state: InitializationResult) => state.gameController
};

const mutations = {
    SET_INITIAL_DATA(state: InitializationResult, data: InitializationResult) {
        state.gameBoard = data.gameBoard;
        state.colorCounterBoard = data.colorCounterBoard;
        state.gameController = data.gameController;
    }
};

const actions = {
    async initializeApp({ commit }: { commit: Commit }) {
        const data = initializationService.initialize();
        commit('SET_INITIAL_DATA', data);
    }
};

export const InitializationServiceModule: Module<InitializationResult, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
