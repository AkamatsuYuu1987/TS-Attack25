// GameBoard.spec.ts
import { mount } from '@vue/test-utils';
import GameBoard from '@/components/GameBoard.vue';
import GameSquare from '@/components/GameSquare.vue';
import { Panel, PanelColor } from '@/domain/panel';
import GameController from '@/domain/GameController';
import GameBoardDomain from '@/domain/GameBoard';
import ColorCounter from '@/domain/ColorCounter';

describe('GameBoard.vue', () => {
    const colorCounters = [
        new ColorCounter(PanelColor.RED, 'red', 0),
        new ColorCounter(PanelColor.GREEN, 'green', 0),
        new ColorCounter(PanelColor.WHITE, 'white', 0),
        new ColorCounter(PanelColor.BLUE, 'blue', 0)
    ];

    it('renders the game board with default 5x5 grid when no rows and cols are provided', () => {
        const defaultGameBoardDomain = new GameBoardDomain();
        const defaultGameController = new GameController(defaultGameBoardDomain, colorCounters);
        const wrapper = mount(GameBoard, {
            props: {
                gameController: defaultGameController
            }
        });
        expect(wrapper.findAllComponents(GameSquare)).toHaveLength(5 * 5);
    });

    it('renders the game board with the correct number of panels based on rows and cols props', () => {
        const rows = 3;
        const cols = 4;
        const gameBoardDomain = new GameBoardDomain(rows, cols);
        const gameController = new GameController(gameBoardDomain, colorCounters);

        const wrapper = mount(GameBoard, {
            props: {
                gameController
            }
        });
        expect(wrapper.findAllComponents(GameSquare)).toHaveLength(rows * cols);
    });

    it('passes the correct props to the GameSquare components', () => {
        const rows = 3;
        const cols = 4;
        const gameBoardDomain = new GameBoardDomain(rows, cols);
        const gameController = new GameController(gameBoardDomain, colorCounters);

        const wrapper = mount(GameBoard, {
            props: {
                gameController
            }
        });

        const gameSquares = wrapper.findAllComponents(GameSquare);
        gameSquares.forEach((gameSquare, i) => {
            expect(gameSquare.props('number')).toBe(i + 1);
            expect(gameSquare.props('panel')).toBeInstanceOf(Panel);
        });
    });

    it('emits the new game board and color counters when a panel is clicked', async () => {
        const rows = 3;
        const cols = 4;
        const gameBoardDomain = new GameBoardDomain(rows, cols);
        const gameController = new GameController(gameBoardDomain, colorCounters);

        const wrapper = mount(GameBoard, {
            props: {
                gameController
            }
        });

        gameController.selectColor(PanelColor.RED);

        const gameSquares = wrapper.findAllComponents(GameSquare);
        await gameSquares[0].trigger('click');

        // This is the expected state of the game board and color counters after the panel has been clicked.
        const expectedBoard = [
            [new Panel(PanelColor.RED, 1, 0, 0), new Panel(PanelColor.GRAY, 2, 0, 1), new Panel(PanelColor.GRAY, 3, 0, 2), new Panel(PanelColor.GRAY, 4, 0, 3)],
            [new Panel(PanelColor.GRAY, 5, 1, 0), new Panel(PanelColor.GRAY, 6, 1, 1), new Panel(PanelColor.GRAY, 7, 1, 2), new Panel(PanelColor.GRAY, 8, 1, 3)],
            [new Panel(PanelColor.GRAY, 9, 2, 0), new Panel(PanelColor.GRAY, 10, 2, 1), new Panel(PanelColor.GRAY, 11, 2, 2), new Panel(PanelColor.GRAY, 12, 2, 3)]
        ];
        const expectedColorCounters = [
            new ColorCounter(PanelColor.RED, 'red', 1),
            new ColorCounter(PanelColor.GREEN, 'green', 0),
            new ColorCounter(PanelColor.WHITE, 'white', 0),
            new ColorCounter(PanelColor.BLUE, 'blue', 0)
        ];

        const updateBoardEmits = wrapper.emitted().updateBoard as (Panel[][])[];
        const updateColorCountersEmits = wrapper.emitted().updateColorCounters as (ColorCounter[])[];

        // As the expected board and color counters states depend on the game logic which might be complex,
        // we validate here that the 'updateBoard' and 'updateColorCounters' events were emitted and the emitted values are instances of Panel[][] and ColorCounter[] respectively.
        expect(updateBoardEmits).toHaveLength(1);
        expect(updateBoardEmits[0][0]).toEqual(expectedBoard);
        expect(updateColorCountersEmits).toHaveLength(1);
        expect(updateColorCountersEmits[0][0]).toEqual(expectedColorCounters);
    });

    it('does not emit the new game board when no color is selected', async () => {
        const rows = 3;
        const cols = 4;
        const gameBoardDomain = new GameBoardDomain(rows, cols);
        const gameController = new GameController(gameBoardDomain, colorCounters);

        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

        const wrapper = mount(GameBoard, {
            props: {
                gameController
            }
        });

        const gameSquares = wrapper.findAllComponents(GameSquare);
        await gameSquares[0].trigger('click');

        // Check that no updateBoard event has been emitted
        expect(wrapper.emitted().updateBoard).toBeFalsy();

        // Check that alert was called
        expect(alertSpy).toHaveBeenCalledWith("Please select a color first!");

        alertSpy.mockRestore();
    });

});
