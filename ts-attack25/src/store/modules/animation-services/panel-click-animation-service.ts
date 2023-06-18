// panel-click-animation-service.ts
import { Module, Commit, ActionTree } from 'vuex';
import { Panel, PanelColor } from '@/domain/panel';

interface PanelData {
    color: PanelColor;
    number: number;
    row: number;
    col: number;
}

interface State {
    panelsToChangeColor: PanelData[];
}

const state = (): State => ({
    panelsToChangeColor: [],
})

const getters = {
    panelsToChangeColorGetter: (state: State) => state.panelsToChangeColor,
}

const mutations = {
    SET_PANELS_TO_CHANGE_COLOR(state: State, panels: Panel[]) {
        state.panelsToChangeColor = panels.map(panel => ({
            color: panel.getColor(),
            number: panel.getNumber(),
            row: panel.getRow(),
            col: panel.getColumn()
        }));
    },
    REMOVE_PANEL_FROM_CHANGE_COLOR_LIST(state: State, panel: Panel) {
        const panelData = {
            color: panel.getColor(),
            number: panel.getNumber(),
            row: panel.getRow(),
            col: panel.getColumn()
        };
        const index = state.panelsToChangeColor.findIndex(p =>
            p.color === panelData.color &&
            p.number === panelData.number &&
            p.row === panelData.row &&
            p.col === panelData.col
        );
        if (index > -1) {
            state.panelsToChangeColor.splice(index, 1);
        }
    }
}

const actions: ActionTree<State, unknown> = {
    initiatePanelColorChange({ commit }: { commit: Commit }, panels: Panel[]) {
        commit('SET_PANELS_TO_CHANGE_COLOR', panels);
    },
    // Remove panel from change color list
    removePanelFromChangeColorList({ commit }: { commit: Commit }, panel: Panel) {
        commit('REMOVE_PANEL_FROM_CHANGE_COLOR_LIST', panel);
    }
}

export const PanelClickAnimationServiceModule: Module<State, unknown> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
