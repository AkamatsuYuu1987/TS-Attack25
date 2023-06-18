// store/index.ts
import { createStore } from 'vuex';
import { PanelClickAnimationServiceModule } from '@/store/modules/animation-services/panel-click-animation-service';

const store = createStore({
    modules: {
        PanelClickAnimationService: PanelClickAnimationServiceModule
    }
});

export default store;
