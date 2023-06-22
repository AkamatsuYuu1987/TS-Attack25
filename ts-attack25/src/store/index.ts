// store/index.ts
import { createStore } from 'vuex';
import { PanelClickAnimationServiceModule } from '@/store/modules/animation-services/panel-click-animation-service';
import { ColorCounterBoardStoreModule } from '@/store/modules/color-counter-board-store'; // Add this line

const store = createStore({
    modules: {
        PanelClickAnimationService: PanelClickAnimationServiceModule,
        ColorCounterBoardStore: ColorCounterBoardStoreModule // Add this line
    }
});

export default store;
