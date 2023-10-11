// panel-click-animation-service.ts
import { Module, ActionTree } from 'vuex';
import { Panel } from '@/domain/panel';
import GameBoard from '@/domain/GameBoard';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import { createGameController } from '@/factories/gameControllerFactory'


interface State {
}

const actions: ActionTree<State, unknown> = {
    async animateOnPanelClick(context, panelsToChangeColor: Panel[]) {

        // game-board-store.tsからgameBoardGetterを呼び出す
        // TypeScriptの型アサーションを使用してgameBoardの型を明示的に指定
        const gameBoard = context.rootGetters['GameBoardStoreModule/gameBoardGetter'] as GameBoard;

        // game-controller-store.tsからcolorCounterBoardGetterを呼び出す
        const colorCounterBoard = context.rootGetters['ColorCounterBoardStoreModule/colorCounterBoardGetter'] as ColorCounterBoard

        // gameControllerをnewする
        const gameController = createGameController(gameBoard, colorCounterBoard);

        // Assuming AnimationService, GameController, etc. are available here
        for (const panel of panelsToChangeColor) {
            // Update game board in GameController
            const updatedGameBoard = await gameController.updateGameBoard(panel);

            // gameControllerのgameBoardをgame-board-store.tsにわたす
            await context.dispatch('GameControllerStoreModule/updateGameBoard', updatedGameBoard);

            // Update color counter in GameController
            const updatedColorCounterBoard = await gameController.updateColorCounterboard();

            // gameControllerのcolorCounterBoardをcolor-counter-board-store.tsにわたす
            await context.dispatch('GameControllerStoreModule/updateColorCounterBoard', updatedColorCounterBoard);
        }
    }
}

export const PanelClickAnimationServiceModule: Module<State, unknown> = {
    namespaced: true,
    actions,
};
