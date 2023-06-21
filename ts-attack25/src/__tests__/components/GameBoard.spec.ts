// GameBoard.spec.ts
import { mount } from '@vue/test-utils';
import GameBoard from '@/components/GameBoard.vue';
import GameSquare from '@/components/GameSquare.vue';
import { Panel, PanelColor } from '@/domain/panel';
import GameController from '@/domain/GameController';
import GameBoardDomain from '@/domain/GameBoard';
import ColorCounter from '@/domain/ColorCounter';
import ColorCounterBoard from '@/domain/ColorCounterBoard';

describe('GameBoard.vue', () => {
    const createColorCounterBoard = () => {
        const colorCounters = [
            new ColorCounter(PanelColor.RED, 'red', 0),
            new ColorCounter(PanelColor.GREEN, 'green', 0),
            new ColorCounter(PanelColor.WHITE, 'white', 0),
            new ColorCounter(PanelColor.BLUE, 'blue', 0)
        ];
        return new ColorCounterBoard(colorCounters);
    }

    it('renders the game board with default 5x5 grid when no rows and cols are provided', () => {
        const defaultGameBoardDomain = new GameBoardDomain();
        const defaultGameController = new GameController(defaultGameBoardDomain, createColorCounterBoard());
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
        const gameController = new GameController(gameBoardDomain, createColorCounterBoard());

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
        const gameController = new GameController(gameBoardDomain, createColorCounterBoard());

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
        const gameController = new GameController(gameBoardDomain, createColorCounterBoard());

        const wrapper = mount(GameBoard, {
            props: {
                gameController
            }
        });

        gameController.selectColor(PanelColor.RED);

        const gameSquares = wrapper.findAllComponents(GameSquare);
        await gameSquares[0].trigger('click');

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

        expect(updateBoardEmits).toHaveLength(1);
        expect(updateBoardEmits[0][0]).toEqual(expectedBoard);
    });

    it('does not emit the new game board when no color is selected', async () => {
        const rows = 3;
        const cols = 4;
        const gameBoardDomain = new GameBoardDomain(rows, cols);
        const gameController = new GameController(gameBoardDomain, createColorCounterBoard());

        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

        const wrapper = mount(GameBoard, {
            props: {
                gameController
            }
        });

        const gameSquares = wrapper.findAllComponents(GameSquare);
        await gameSquares[0].trigger('click');

        expect(wrapper.emitted().updateBoard).toBeFalsy();
        expect(alertSpy).toHaveBeenCalledWith("Please select a color first!");

        alertSpy.mockRestore();
    });
});
