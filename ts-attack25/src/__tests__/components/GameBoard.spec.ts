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
        new ColorCounter(PanelColor.RED, 'red'),
        new ColorCounter(PanelColor.GREEN, 'green'),
        new ColorCounter(PanelColor.WHITE, 'white'),
        new ColorCounter(PanelColor.BLUE, 'blue')
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

    it('emits the new game board when a panel is clicked', async () => {
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

        // This is the expected state of the game board after the panel has been clicked.
        const expectedBoard = [
            [new Panel(1, 1), new Panel(5, 2), new Panel(5, 3), new Panel(5, 4)],
            [new Panel(5, 5), new Panel(5, 6), new Panel(5, 7), new Panel(5, 8)],
            [new Panel(5, 9), new Panel(5, 10), new Panel(5, 11), new Panel(5, 12)]
        ];

        const updateBoardEmits = wrapper.emitted().updateBoard as (Panel[][])[];

        // As the expected board state depends on the game logic which might be complex,
        // we validate here that the 'updateBoard' event was emitted and the emitted value is an instance of Panel[][].
        expect(updateBoardEmits).toHaveLength(1);
        expect(updateBoardEmits[0][0]).toEqual(expectedBoard);
    });

});
