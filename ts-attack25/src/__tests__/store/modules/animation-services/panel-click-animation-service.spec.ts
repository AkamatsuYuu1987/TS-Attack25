// panel-click-animation-service.spec.ts
import { PanelClickAnimationServiceModule } from '@/store/modules/animation-services/panel-click-animation-service';
import { Panel, PanelColor } from '@/domain/panel';
import ColorCounter from '@/domain/ColorCounter';
import { MockGameBoard, MockColorCounterBoard } from '@/mocks/mocks';

const defaultState = PanelClickAnimationServiceModule.state;

describe('PanelClickAnimationServiceModule Vuex Module', () => {
    describe('actions', () => {

        it('animateOnPanelClick should animate panels and update game', async () => {
            const commit = jest.fn();
            const dispatch = jest.fn();
            const panel1 = new Panel(PanelColor.RED, 2, 0, 1);
            const panel2 = new Panel(PanelColor.RED, 3, 0, 2);
            const panel3 = new Panel(PanelColor.RED, 8, 2, 1);

            const gameBoardInitial: Panel[][] = [
                [new Panel(PanelColor.RED, 1, 0, 0), new Panel(PanelColor.GREEN, 2, 0, 1), new Panel(PanelColor.BLUE, 3, 0, 2)],
                [new Panel(PanelColor.GREEN, 4, 1, 0), new Panel(PanelColor.RED, 5, 1, 1), new Panel(PanelColor.GREEN, 6, 1, 2)],
                [new Panel(PanelColor.BLUE, 7, 2, 0), new Panel(PanelColor.GREEN, 8, 2, 1), new Panel(PanelColor.GREEN, 9, 2, 2)]
            ];
            
            const mockGameBoard = new MockGameBoard(gameBoardInitial);

            const colorCounterBoardInitial = [
                new ColorCounter(PanelColor.RED, 'red', 1),
                new ColorCounter(PanelColor.GREEN, 'green', 2),
                new ColorCounter(PanelColor.WHITE, 'white', 1),
                new ColorCounter(PanelColor.BLUE, 'blue', 1),
            ];

            const mockColorCounterBoard = new MockColorCounterBoard(colorCounterBoardInitial);

            const rootGetters = {
                'GameBoardStoreModule/gameBoardGetter': mockGameBoard,
                'ColorCounterBoardStoreModule/colorCounterBoardGetter': mockColorCounterBoard,
            };

            const state = {
                ...(typeof defaultState === 'function' ? defaultState() : defaultState),
                panelsToChangeColor: [panel1, panel2, panel3],
            };

            // animateOnPanelClickにpanelsToChangeColorを渡して呼び出す
            await (PanelClickAnimationServiceModule.actions!.animateOnPanelClick as any)({ commit, dispatch, rootGetters, state }, state.panelsToChangeColor);

            const gameBoardAfter: Panel[][] = [
                [new Panel(PanelColor.RED, 1, 0, 0), new Panel(PanelColor.RED, 2, 0, 1), new Panel(PanelColor.RED, 3, 0, 2)],
                [new Panel(PanelColor.GREEN, 4, 1, 0), new Panel(PanelColor.RED, 5, 1, 1), new Panel(PanelColor.GREEN, 6, 1, 2)],
                [new Panel(PanelColor.BLUE, 7, 2, 0), new Panel(PanelColor.RED, 8, 2, 1), new Panel(PanelColor.GREEN, 9, 2, 2)]
            ];

            const colorCounterBoardAfter = {
                "counters": [
                    new ColorCounter(PanelColor.RED, 'red', 5),
                    new ColorCounter(PanelColor.GREEN, 'green', 3),
                    new ColorCounter(PanelColor.WHITE, 'white', 0),
                    new ColorCounter(PanelColor.BLUE, 'blue', 1),
                ]
            };

            expect(rootGetters['GameBoardStoreModule/gameBoardGetter'].getBoard()).toEqual(gameBoardAfter);
            expect(rootGetters['ColorCounterBoardStoreModule/colorCounterBoardGetter']).toEqual(colorCounterBoardAfter);
        });
    });
});
