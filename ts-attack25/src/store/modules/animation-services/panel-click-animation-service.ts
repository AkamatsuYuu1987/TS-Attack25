// panel-click-animation-service.ts
import { Module, ActionTree } from 'vuex';
import { Panel } from '@/domain/panel';
import GameController from '@/domain/GameController';


interface State {
    panelsToChangeColor: Panel[];
}

const state = (): State => ({
    panelsToChangeColor: [],
})

const getters = {
    panelsToChangeColorGetter: (state: State) => state.panelsToChangeColor,
}

const mutations = {
    SET_PANELS_TO_CHANGE_COLOR(state: State, panels: Panel[]) {
        state.panelsToChangeColor = panels;
    },
    REMOVE_PANEL_FROM_CHANGE_COLOR_LIST(state: State, panel: Panel) {
        const index = state.panelsToChangeColor.findIndex(p => p === panel);
        if (index > -1) {
            state.panelsToChangeColor.splice(index, 1);
        }
    }
}

const actions: ActionTree<State, unknown> = {
    async animateOnPanelClick(context, panels: Panel[]) {
        context.commit('SET_PANELS_TO_CHANGE_COLOR', panels);

        // game-board-store.tsからgameBoardGetterを呼び出す
        const gameBoard = context.rootGetters['GameBoardStoreModule/gameBoardGetter'];

        // game-controller-store.tsからcolorCounterBoardGetterを呼び出す
        const colorCounterBoard = context.rootGetters['ColorCounterBoardStoreModule/colorCounterBoardGetter'];

        // gameControllerをnewする
        const gameController = new GameController(gameBoard, colorCounterBoard);

        // Assuming AnimationService, GameController, etc. are available here
        while (context.state.panelsToChangeColor.length > 0) {
            const panel = context.state.panelsToChangeColor[0];

            // Update game board in GameController
            await gameController.updateGameBoard(panel);

            // gameControllerのgameBoardをgame-board-store.tsにわたす
            await context.dispatch('GameControllerStoreModule/updateGameBoard', gameController.gameBoard);

            // Update color counter in GameController
            await gameController.updateColorCounterboard();

            // Remove panel from change color list
            context.commit('REMOVE_PANEL_FROM_CHANGE_COLOR_LIST', panel);
        }
    },
    removePanelFromChangeColorList(context, panel: Panel) {
        context.commit('REMOVE_PANEL_FROM_CHANGE_COLOR_LIST', panel);
    }
}

export const PanelClickAnimationServiceModule: Module<State, unknown> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
