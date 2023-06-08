import GameController from '@/domain/GameController';
import GameBoard from '@/domain/GameBoard';
import ColorCounter from '@/domain/ColorCounter';
import { PanelColor } from '@/domain/panel';

describe('GameController', () => {
    let gameController: GameController;

    beforeEach(() => {
        const gameBoard = new GameBoard(5, 5);
        const colorCounters = [
            new ColorCounter(),
            new ColorCounter(),
            new ColorCounter(),
            new ColorCounter()
        ];
        gameController = new GameController(gameBoard, colorCounters);
    });

    it('should initialize with a game board and color counters', () => {
        expect(gameController.gameBoard).toBeInstanceOf(GameBoard);
        expect(gameController.colorCounters.length).toBe(4);
        expect(gameController.colorCounters[0]).toBeInstanceOf(ColorCounter);
    });

    it('should be able to select a color', () => {
        gameController.selectColor('red');
        expect(gameController.selectedColor).toBe('red');
    });

    it('should be able to select a panel and change its color', () => {
        gameController.selectColor('green');
        gameController.selectPanel(12); // Panel number 12 is at position (2, 2) in a 5x5 board
        expect(gameController.gameBoard.getBoard()[2][2].getColor()).toBe(PanelColor.GREEN);
    });

    it('should throw an error if a panel is selected before a color', () => {
        expect(() => gameController.selectPanel(12)).toThrow('No color has been selected');
    });
});
