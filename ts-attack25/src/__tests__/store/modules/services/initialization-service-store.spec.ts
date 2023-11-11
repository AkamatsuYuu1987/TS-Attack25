import { createStore, Store } from 'vuex';
import InitializationService from '@/domain/services/InitializationService';
import { InitializationResult } from '@/types/domain/services/InitializationServiceTypes';
import { InitializationServiceModule } from '@/store/modules/services/initialization-service-store';

interface RootState {
    InitializationServiceModule: InitializationResult;
}

describe('initializationModule', () => {
    let store: Store<RootState>;

    beforeEach(() => {
        store = createStore<RootState>({
            modules: {
                InitializationServiceModule
            }
        });
    });

    it('should initialize with correct default state', () => {
        expect(store.state.InitializationServiceModule.gameBoard).toBeNull();
        expect(store.state.InitializationServiceModule.colorCounterBoard).toBeNull();
        expect(store.state.InitializationServiceModule.gameController).toBeNull();
    });

    it('should commit the correct mutation when initializeApp action is dispatched', async () => {
        const service = new InitializationService();
        const expectedData = service.initialize();

        await store.dispatch('InitializationServiceModule/initializeApp');

        expect(store.state.InitializationServiceModule.gameBoard).toEqual(expectedData.gameBoard);
        expect(store.state.InitializationServiceModule.colorCounterBoard).toEqual(expectedData.colorCounterBoard);
        expect(store.state.InitializationServiceModule.gameController).toEqual(expectedData.gameController);
    });

    it('should return the correct data from getters', () => {
        const service = new InitializationService();
        const expectedData = service.initialize();

        store.commit('InitializationServiceModule/SET_INITIAL_DATA', expectedData);

        expect(store.getters['InitializationServiceModule/gameBoardGetter']).toEqual(expectedData.gameBoard);
        expect(store.getters['InitializationServiceModule/colorCounterBoardGetter']).toEqual(expectedData.colorCounterBoard);
        expect(store.getters['InitializationServiceModule/gameControllerGetter']).toEqual(expectedData.gameController);
    });
});
