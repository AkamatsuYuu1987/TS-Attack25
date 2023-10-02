// GameController.test.ts
import GameController from '@/domain/GameController';
import GameBoard from '@/domain/GameBoard';
import ColorCounter from '@/domain/ColorCounter';
import ColorCounterBoard from '@/domain/ColorCounterBoard';
import { Panel, PanelColor } from '@/domain/panel';
import SelectPanelExecutor from '@/domain/SelectPanelExecutor';
import _ from 'lodash';
import { PanelsToFlip } from '@/domain/PanelsToFlip';

describe('GameController', () => {
    let gameController: GameController;

    beforeEach(() => {
        const gameBoard = new GameBoard();
        const colorCounterBoard = new ColorCounterBoard([
            new ColorCounter(PanelColor.RED, 'red', 0),
            new ColorCounter(PanelColor.GREEN, 'green', 0),
            new ColorCounter(PanelColor.WHITE, 'white', 0),
            new ColorCounter(PanelColor.BLUE, 'blue', 0),
        ]);
        const selectPanelExecutor = new SelectPanelExecutor();
        gameController = new GameController(gameBoard, colorCounterBoard, selectPanelExecutor);
    });

    it('should initialize with a game board and color counter board', () => {
        expect(gameController.gameBoard).toBeInstanceOf(GameBoard);
        expect(gameController.colorCounterBoard).toBeInstanceOf(ColorCounterBoard);
    });

    it('should be able to select a color', () => {
        gameController.selectColor(PanelColor.RED);
        expect(gameController.selectedColor).toBe(PanelColor.RED);
    });

    it('should be able to select a panel and change its color', () => {
        gameController.selectColor(PanelColor.GREEN);
        const { newGameBoard } = gameController.selectPanel(12);
        const panel = newGameBoard.getBoard().flat().find(panel => panel.getNumber() === 12);
        expect(panel!.getColor()).toBe(PanelColor.GREEN);
    });

    it('should update the color counters when a panel color is changed, excluding gray', () => {
        // Set panel 12 to red
        gameController.selectColor(PanelColor.RED);
        let result = gameController.selectPanel(12);
        gameController.setGameBoard(result.newGameBoard);

        // Now change panel 12 to green
        gameController.selectColor(PanelColor.GREEN);
        result = gameController.selectPanel(12);
        gameController.setGameBoard(result.newGameBoard);

        // Verify that the red counter has decreased to 0 and the green counter has increased to 1
        const redCounter = gameController.colorCounterBoard.getCounters().find(counter => counter.getColor() === PanelColor.RED);
        const greenCounter = gameController.colorCounterBoard.getCounters().find(counter => counter.getColor() === PanelColor.GREEN);

        // Check if counters exist before proceeding with test
        if (!redCounter || !greenCounter) {
            throw new Error('Counter not found for specified color');
        }

        expect(redCounter.getCount()).toBe(0);
        expect(greenCounter.getCount()).toBe(1);
    });

    it('should throw an error if a panel is selected before a color', () => {
        expect(() => gameController.selectPanel(12)).toThrow('No color has been selected');
    });

    it('should update the color counter board correctly', () => {
        // Set up the game board
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

        // Call the method under test
        const updatedColorCounterBoard = gameController.updateColorCounterboard();

        // Assert the result
        const counters = updatedColorCounterBoard.getCounters();
        const greenCounter = counters.find(counter => counter.getColor() === PanelColor.GREEN);
        const redCounter = counters.find(counter => counter.getColor() === PanelColor.RED);

        // Check if counters exist before proceeding with test
        if (!greenCounter || !redCounter) {
            throw new Error('Counter not found for specified color');
        }

        expect(greenCounter.getCount()).toBe(8); // 8 green panels in the initial layout
        expect(redCounter.getCount()).toBe(9); // 9 red panels in the initial layout
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
        const result = gameController.selectPanel(13);

        // The panels between the selected panel and another green panel should have flipped to green
        const expectedLayout = [
            [PanelColor.GREEN, PanelColor.GRAY, PanelColor.GREEN, PanelColor.GRAY, PanelColor.GREEN],
            [PanelColor.GRAY, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GRAY],
            [PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN],
            [PanelColor.GRAY, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GREEN, PanelColor.GRAY],
            [PanelColor.GREEN, PanelColor.GRAY, PanelColor.GREEN, PanelColor.GRAY, PanelColor.GREEN]
        ];
        const newLayout = result.newGameBoard.getBoard().map(row => row.map(panel => panel.getColor()));
        expect(newLayout).toEqual(expectedLayout);
    });

    it('should update the color counter board correctly after flipping panels', () => {
        // Set up the game board
        const initialLayout = [
            [new Panel(PanelColor.GREEN, 1, 0, 0), new Panel(PanelColor.GRAY, 2, 0, 1), new Panel(PanelColor.GREEN, 3, 0, 2), new Panel(PanelColor.GRAY, 4, 0, 3), new Panel(PanelColor.GREEN, 5, 0, 4)],
            [new Panel(PanelColor.RED, 6, 1, 0), new Panel(PanelColor.RED, 7, 1, 1), new Panel(PanelColor.RED, 8, 1, 2), new Panel(PanelColor.RED, 9, 1, 3), new Panel(PanelColor.GRAY, 10, 1, 4)],
            [new Panel(PanelColor.GREEN, 11, 2, 0), new Panel(PanelColor.RED, 12, 2, 1), new Panel(PanelColor.RED, 13, 2, 2), new Panel(PanelColor.RED, 14, 2, 3), new Panel(PanelColor.GREEN, 15, 2, 4)],
            [new Panel(PanelColor.RED, 16, 3, 0), new Panel(PanelColor.RED, 17, 3, 1), new Panel(PanelColor.RED, 18, 3, 2), new Panel(PanelColor.RED, 19, 3, 3), new Panel(PanelColor.GRAY, 20, 3, 4)],
            [new Panel(PanelColor.GREEN, 21, 4, 0), new Panel(PanelColor.GRAY, 22, 4, 1), new Panel(PanelColor.GREEN, 23, 4, 2), new Panel(PanelColor.GRAY, 24, 4, 3), new Panel(PanelColor.GREEN, 25, 4, 4)]
        ];
        const gameBoard = new GameBoard();
        gameBoard.setBoard(initialLayout);
        gameController.setGameBoard(gameBoard);

        // Select green color and select the panel at the middle
        gameController.selectColor(PanelColor.GREEN);
        const result = gameController.selectPanel(13);
        gameController.setGameBoard(result.newGameBoard);

        // Call the method under test
        const updatedColorCounterBoard = gameController.updateColorCounterboard();

        // Assert the result
        const counters = updatedColorCounterBoard.getCounters();
        const greenCounter = counters.find(counter => counter.getColor() === PanelColor.GREEN);
        const redCounter = counters.find(counter => counter.getColor() === PanelColor.RED);

        // Check if counters exist before proceeding with test
        if (!greenCounter || !redCounter) {
            throw new Error('Counter not found for specified color');
        }

        expect(greenCounter.getCount()).toBe(17); // After flipping, 15 green panels in the board
        expect(redCounter.getCount()).toBe(2); // After flipping, 2 red panels left in the board
    });

    it('should update a specific panel in the game board', () => {
        const newPanel = new Panel(PanelColor.RED, 12, 2, 1);
        gameController.updateGameBoard(newPanel);
        const updatedPanel = gameController.gameBoard.getBoard()[newPanel.getRow()][newPanel.getColumn()];
        expect(updatedPanel.getColor()).toBe(PanelColor.RED);
    });

    // Newly added test cases
    test('should throw error if no color has been selected', () => {
        expect(() => {
            gameController.applyColorChange(1);
        }).toThrowError('No color has been selected');
    });

    test('should throw error if panel not found', () => {
        gameController.selectColor(PanelColor.RED);

        // Depending on your implementation, set up a non-existing panel number
        expect(() => {
            gameController.applyColorChange(999);
        }).toThrowError('Panel not found');
    });

    test('should change the color of the panel and return panels to flip', () => {
        gameController.selectColor(PanelColor.RED);

        // An existing panel number
        const panelNumber = 5;

        const panelsToFlip = gameController.applyColorChange(panelNumber);

        expect(panelsToFlip).toBeInstanceOf(PanelsToFlip);
        // Add more assertions to check if the panel color is changed correctly and panelsToFlip contains the expected values
    });

});
