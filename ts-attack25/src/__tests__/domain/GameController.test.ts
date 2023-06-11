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
        let gameBoard = gameController.selectPanel(12);

        // Save the new gameBoard state to the gameController
        gameController.setGameBoard(gameBoard);

        // Now change panel 12 to green
        gameController.selectColor(PanelColor.GREEN);
        gameBoard = gameController.selectPanel(12);

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
});
