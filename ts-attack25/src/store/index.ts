// store/index.ts
import { createStore } from 'vuex';
import { PanelClickAnimationServiceModule } from '@/store/modules/animation-services/panel-click-animation-service';
import { ColorCounterBoardStoreModule } from '@/store/modules/color-counter-board-store';
import { GameBoardStoreModule } from '@/store/modules/game-board-store';
import { GameControllerStoreModule } from '@/store/modules/game-controller-store';

const store = createStore({
    modules: {
        PanelClickAnimationService: PanelClickAnimationServiceModule,
        ColorCounterBoardStore: ColorCounterBoardStoreModule,
        GameBoardStoreModule: GameBoardStoreModule,
        GameControllerStoreModule: GameControllerStoreModule,
    }
});

export default store;
