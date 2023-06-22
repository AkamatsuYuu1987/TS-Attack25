// color-counter-board-store.ts
import { Module, Commit, ActionTree } from 'vuex';
import ColorCounterBoard from '@/domain/ColorCounterBoard';

interface State {
    colorCounterBoard: ColorCounterBoard | null;
}

const state = (): State => ({
    colorCounterBoard: null,
})

const getters = {
    colorCounterBoardGetter: (state: State) => state.colorCounterBoard,
}

const mutations = {
    SET_COLOR_COUNTER_BOARD(state: State, colorCounterBoard: ColorCounterBoard) {
        state.colorCounterBoard = colorCounterBoard;
    },
}

const actions: ActionTree<State, unknown> = {
    updateColorCounterBoardState({ commit }: { commit: Commit }, colorCounterBoard: ColorCounterBoard) {
        commit('SET_COLOR_COUNTER_BOARD', colorCounterBoard);
    },
}

export const ColorCounterBoardStoreModule: Module<State, unknown> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
