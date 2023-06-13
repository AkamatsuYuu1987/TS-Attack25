// GameController.test.ts
import GameController from '@/domain/GameController';
import GameBoard from '@/domain/GameBoard';
import ColorCounter from '@/domain/ColorCounter';
import { Panel, PanelColor } from '@/domain/panel';

describe('GameController', () => {
    let gameController: GameController;

    beforeEach(() => {
        const gameBoard = new GameBoard();
        const colorCounters = [
            new ColorCounter(PanelColor.RED, 'red'),
            new ColorCounter(PanelColor.GREEN, 'green'),
            new ColorCounter(PanelColor.WHITE, 'white'),
            new ColorCounter(PanelColor.BLUE, 'blue'),
            new ColorCounter(PanelColor.GRAY, 'gray')  // Added gray ColorCounter
        ];
        gameController = new GameController(gameBoard, colorCounters);
    });

    it('should initialize with a game board and color counters', () => {
        expect(gameController.gameBoard).toBeInstanceOf(GameBoard);
        expect(gameController.colorCounters.length).toBe(5); // Updated expected length to 5
        expect(gameController.colorCounters[0]).toBeInstanceOf(ColorCounter);
    });

    it('should be able to select a color', () => {
        gameController.selectColor(PanelColor.RED);
        expect(gameController.selectedColor).toBe(PanelColor.RED);
    });

    it('should be able to select a panel and change its color', async () => {
        gameController.selectColor(PanelColor.GREEN);
        const newGameBoard = await gameController.selectPanel(12);
        const panel = newGameBoard.getBoard().flat().find(panel => panel.getNumber() === 12);
        expect(panel!.getColor()).toBe(PanelColor.GREEN);
    });

    it('should update the color counters when a panel color is changed, excluding gray', async () => {
        // Set panel 12 to red
        gameController.selectColor(PanelColor.RED);
        let gameBoard = await gameController.selectPanel(12);

        // Save the new gameBoard state to the gameController
        gameController.setGameBoard(gameBoard);

        // Now change panel 12 to green
        gameController.selectColor(PanelColor.GREEN);
        gameBoard = await gameController.selectPanel(12);

        // Verify that the red counter has decreased to 0 and the green counter has increased to 1
        const redCounter = gameController.colorCounters.find(counter => counter.getColor() === PanelColor.RED);
        const greenCounter = gameController.colorCounters.find(counter => counter.getColor() === PanelColor.GREEN);
        const grayCounter = gameController.colorCounters.find(counter => counter.getColor() === PanelColor.GRAY);  // Added grayCounter
        expect(redCounter!.getCount()).toBe(0);
        expect(greenCounter!.getCount()).toBe(1);
        expect(grayCounter!.getCount()).toBe(0);  // Gray counter should stay the same
    });

    it('should throw an error if a panel is selected before a color', () => {
        expect(() => gameController.selectPanel(12)).toThrow('No color has been selected');
    });

    // Test the flipping panels logic
    it('should flip the color of panels between selected panel and another panel of the same color', () => {
        // Initialize the gameBoard to the specific state
        const initialLayout = [
            [new Panel(PanelColor.GREEN, 1, 0, 0), new Panel(PanelColor.GRAY, 2, 0, 1), new Panel(PanelColor.GREEN, 3, 0, 2), new Panel(PanelColor.GRAY, 4, 0, 3), new Panel(PanelColor.GREEN, 5, 0, 4)],
            [new Panel(PanelColor.GRAY, 6, 1, 0), new Panel(PanelColor.RED, 7, 1, 1), new Panel(PanelColor.RED, 8, 1, 2), new Panel(PanelColor.RED, 9, 1, 3), new Panel(PanelColor.GRAY, 10, 1, 4)],
            [new Panel(PanelColor.GREEN, 11, 2, 0), new Panel(PanelColor.RED, 12, 2, 1), new Panel(PanelColor.RED, 13, 2, 2), new Panel(PanelColor.RED, 14, 2, 3), new Panel(PanelColor.GREEN, 15, 2, 4)],
            [new Panel(PanelColor.GRAY, 16, 3, 0), new Panel(PanelColor.RED, 17, 3, 1), new Panel(PanelColor.RED, 18, 3, 2), new Panel(PanelColor.RED, 19, 3, 3), new Panel(PanelColor.GRAY, 20, 3, 4)],
            [new Panel(PanelColor.GREEN, 21, 4, 0), new Panel(PanelColor.GRAY, 22, 4, 1), new Panel(PanelColor.GREEN, 23, 4, 2), new Panel(PanelColor.GRAY, 24, 4, 3), new Panel(PanelColor.GREEN, 25, 4, 4)]
        ];
        const gameBoard = new GameBoard();
        gameBoard.setBoard(initialLayout);
        gameController.setGameBoard(gameBoard);

        // Select green color and select the panel at the middle
        gameController.selectColor(PanelColor.GREEN);
        const newGameBoard = gameController.selectPanel(13);

        // The panels between the selected panel and another green panel should have flipped to green
        const expectedLayout = [
            [PanelColor.GREEN, PanelColor.GRAY, PanelColor.GREEN, PanelColor.GRAY, PanelColor.GREEN],
            [PanelColor.GRAY, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GRAY],
            [PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN],
            [PanelColor.GRAY, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GRAY],
            [PanelColor.GREEN, PanelColor.GRAY, PanelColor.GREEN, PanelColor.GRAY, PanelColor.GREEN]
        ];
        const newLayout = newGameBoard.getBoard().map(row => row.map(panel => panel.getColor()));
        expect(newLayout).toEqual(expectedLayout);
    });
});
