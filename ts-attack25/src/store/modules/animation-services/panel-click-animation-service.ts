// panel-click-animation-service.ts
import { Module, ActionTree } from 'vuex';
import { Panel } from '@/domain/panel';
import GameController from '@/domain/GameController';
import GameBoard from '@/domain/GameBoard';
import ColorCounterBoard from '@/domain/ColorCounterBoard';


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
    async animateOnPanelClick(context, panelsToChangeColor: Panel[]) {
        //context.commit('SET_PANELS_TO_CHANGE_COLOR', panels);

        // game-board-store.tsからgameBoardGetterを呼び出す
        // TypeScriptの型アサーションを使用してgameBoardの型を明示的に指定
        const gameBoard = context.rootGetters['GameBoardStoreModule/gameBoardGetter'] as GameBoard;

        // game-controller-store.tsからcolorCounterBoardGetterを呼び出す
        const colorCounterBoard = context.rootGetters['ColorCounterBoardStoreModule/colorCounterBoardGetter'] as ColorCounterBoard

        // gameControllerをnewする
        const gameController = new GameController(gameBoard, colorCounterBoard);
        // console.log('before while loop')
        // console.log(panelsToChangeColor)
        // Assuming AnimationService, GameController, etc. are available here
        while (panelsToChangeColor.length > 0) {
            const panel = panelsToChangeColor[0];
            // console.log('panelsToChange', panel)
            // Update game board in GameController
            const updatedGameBoard = await gameController.updateGameBoard(panel);

            // console.log('before dispatch', updatedGameBoard);

            // gameControllerのgameBoardをgame-board-store.tsにわたす
            await context.dispatch('GameControllerStoreModule/updateGameBoard', updatedGameBoard);

            // dispatchした結果をgetter経由で取得する
            // const gameBoard = context.rootGetters['GameControllerStoreModule/gameBoardGetter'] as GameBoard;

            // console.log('after dispatch', gameBoard);

            // Update color counter in GameController
            const updatedColorCounterBoard = await gameController.updateColorCounterboard();

            console.log('updatedColorCounterBoard', updatedColorCounterBoard);

            // gameControllerのcolorCounterBoardをcolor-counter-board-store.tsにわたす
            await context.dispatch('GameControllerStoreModule/updateColorCounterBoard', updatedColorCounterBoard);

            // Remove panel from change color list
            // await context.commit('REMOVE_PANEL_FROM_CHANGE_COLOR_LIST', panel);
            // 配列panelsToChangeColor[0]を削除する
            panelsToChangeColor.shift();

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
