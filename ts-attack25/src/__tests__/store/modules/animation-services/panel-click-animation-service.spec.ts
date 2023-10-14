// panel-click-animation-service.spec.ts
import { PanelClickAnimationServiceModule } from '@/store/modules/animation-services/panel-click-animation-service';
import { Panel, PanelColor } from '@/domain/panel';
import ColorCounter from '@/domain/ColorCounter';
import { MockGameBoard, MockColorCounterBoard } from '@/mocks/mocks';
import { createGameController } from '@/factories/gameControllerFactory';

// const defaultState = PanelClickAnimationServiceModule.state;

describe('PanelClickAnimationServiceModule Vuex Module', () => {
    describe('actions', () => {

        it('handles panel click', async () => {

            const dispatch = jest.fn();

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

            // createGameControllerでconst gameControllerを初期化
            const gameController = createGameController(mockGameBoard, mockColorCounterBoard);

            // gameControllerでselectedColorをセットする
            gameController.selectColor(PanelColor.BLUE);

            const panelNumber = 9; // 任意のパネル番号を選択

            // PanelClickAnimationServiceModule.actions!.handlePanelClick as anyを呼び出す
            // 引数はpanelNumberとgameController
            await (PanelClickAnimationServiceModule.actions!.handlePanelClick as any)({ dispatch, rootGetters }, { panelNumber, gameController });

            // アクションが他のゲッターやアクションを正しく呼び出したかを検証
            //expect(dispatch).toHaveBeenCalledWith('animateOnPanelClick', expect.any(Array));  // ここで animateOnPanelClick アクションが呼ばれていることと、パラメータが配列であることを確認しています

            // async animateOnPanelClick(context, panelsToChangeColor: Panel[]) が正しく呼び出されたことと、
            // 引数のTypeがPanel[]であることを検証
            expect(dispatch).toHaveBeenCalledWith(
                'animateOnPanelClick',
                expect.arrayContaining([expect.any(Panel)])  // ここで引数が Panel のインスタンスを含む配列であることを検証
            );

        });

        it('animateOnPanelClick should animate panels and update game', async () => {
            const dispatch = jest.fn();
            const panel1 = new Panel(PanelColor.RED, 2, 0, 1);
            const panel2 = new Panel(PanelColor.RED, 3, 0, 2);
            const panel3 = new Panel(PanelColor.RED, 8, 2, 1);

            const panelsToChangeColor = [panel1, panel2, panel3];

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

            // animateOnPanelClickにpanelsToChangeColorを渡して呼び出す
            await (PanelClickAnimationServiceModule.actions!.animateOnPanelClick as any)({ dispatch, rootGetters }, panelsToChangeColor);

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
