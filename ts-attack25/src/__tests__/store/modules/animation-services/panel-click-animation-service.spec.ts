// panel-click-animation-service.spec.ts
import { PanelClickAnimationServiceModule } from '@/store/modules/animation-services/panel-click-animation-service';
import { Panel, PanelColor } from '@/domain/panel';

const defaultState = PanelClickAnimationServiceModule.state;

describe('PanelClickAnimationServiceModule Vuex Module', () => {
    describe('mutations', () => {
        it('SET_PANELS_TO_CHANGE_COLOR should set panels to change color', () => {
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                panelsToChangeColor: []
            };

            const panel1 = new Panel(PanelColor.RED, 1, 2, 3);
            const panel2 = new Panel(PanelColor.BLUE, 4, 5, 6);

            PanelClickAnimationServiceModule.mutations!.SET_PANELS_TO_CHANGE_COLOR(state, [panel1, panel2]);

            expect(state.panelsToChangeColor).toEqual([
                { color: PanelColor.RED, number: 1, row: 2, col: 3 },
                { color: PanelColor.BLUE, number: 4, row: 5, col: 6 },
            ]);
        });

        // Similarly, write test for REMOVE_PANEL_FROM_CHANGE_COLOR_LIST mutation
        it('REMOVE_PANEL_FROM_CHANGE_COLOR_LIST should remove panel from change color list', () => {
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                panelsToChangeColor: [{ color: PanelColor.RED, number: 1, row: 2, col: 3 }]
            };

            const panel1 = new Panel(PanelColor.RED, 1, 2, 3);
            const panel2 = new Panel(PanelColor.BLUE, 4, 5, 6);

            PanelClickAnimationServiceModule.mutations!.SET_PANELS_TO_CHANGE_COLOR(state, [panel1, panel2]);


            PanelClickAnimationServiceModule.mutations!.REMOVE_PANEL_FROM_CHANGE_COLOR_LIST(state, panel1);

            expect(state.panelsToChangeColor).toEqual([panel2]);

            PanelClickAnimationServiceModule.mutations!.REMOVE_PANEL_FROM_CHANGE_COLOR_LIST(state, panel2);

            expect(state.panelsToChangeColor).toEqual([]);
        })
    });

    describe('actions', () => {
        // You can write tests for actions here. You will need to mock commit function and check if it gets called with correct arguments.
        it('initiatePanelColorChange should commit SET_PANELS_TO_CHANGE_COLOR', async () => {
            const commit = jest.fn();
            const panel1 = new Panel(PanelColor.RED, 1, 2, 3);
            const panel2 = new Panel(PanelColor.BLUE, 4, 5, 6);

            // 型アサーションを使用して、関数として呼び出す
            await (PanelClickAnimationServiceModule.actions!.initiatePanelColorChange as any)({ commit }, [panel1, panel2]);

            expect(commit).toHaveBeenCalledWith('SET_PANELS_TO_CHANGE_COLOR', [panel1, panel2]);
        });

        it('removePanelFromChangeColorList should commit REMOVE_PANEL_FROM_CHANGE_COLOR_LIST', async () => {
            const commit = jest.fn();
            const panel1 = new Panel(PanelColor.RED, 1, 2, 3);

            // 型アサーションを使用して、関数として呼び出す
            await (PanelClickAnimationServiceModule.actions!.removePanelFromChangeColorList as any)({ commit }, panel1);

            expect(commit).toHaveBeenCalledWith('REMOVE_PANEL_FROM_CHANGE_COLOR_LIST', panel1);
        })


    });

    describe('getters', () => {
        it('panelsToChangeColorGetter should return panels to change color', () => {
            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                panelsToChangeColor: [{ color: PanelColor.RED, number: 1, row: 2, col: 3 }]
            };

            const result = PanelClickAnimationServiceModule.getters!.panelsToChangeColorGetter(state, {}, {}, {});

            expect(result).toEqual([{ color: PanelColor.RED, number: 1, row: 2, col: 3 }]);
        });
    });
});
