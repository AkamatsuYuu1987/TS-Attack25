// GameBoard.test.ts
import GameBoard from '@/domain/GameBoard';
import { Panel, PanelColor } from '@/domain/panel';

describe('GameBoard', () => {
    let gameBoard: GameBoard;
    const rows = 5;
    const cols = 5;

    beforeEach(() => {
        gameBoard = new GameBoard(rows, cols);
    });

    test('constructor initializes with default 5x5 grid', () => {
        const board = gameBoard.getBoard();

        expect(board).toHaveLength(rows);
        board.forEach((row, i) => {
            expect(row).toHaveLength(cols);
            row.forEach((panel, j) => {
                expect(panel).toBeInstanceOf(Panel);
                expect(panel.getColor()).toBe(PanelColor.GRAY);
                expect(panel.getNumber()).toBe(i * cols + j + 1);
            });
        });
    });

    test('constructor initializes with custom grid size', () => {
        const customRows = 3;
        const customCols = 7;
        const customGameBoard = new GameBoard(customRows, customCols);
        const board = customGameBoard.getBoard();

        expect(board).toHaveLength(customRows);
        board.forEach((row, i) => {
            expect(row).toHaveLength(customCols);
            row.forEach((panel, j) => {
                expect(panel).toBeInstanceOf(Panel);
                expect(panel.getColor()).toBe(PanelColor.GRAY);
                expect(panel.getNumber()).toBe(i * customCols + j + 1);
            });
        });
    });

    test('changeColor changes the color of a specific panel', () => {
        const number = 7;
        gameBoard.changeColor(number, PanelColor.BLUE);

        const board = gameBoard.getBoard();
        const changedPanel = board.flat().find(panel => panel.getNumber() === number);

        expect(changedPanel).toBeDefined();
        expect(changedPanel!.getColor()).toBe(PanelColor.BLUE);
    });

    test('getRows returns correct row count', () => {
        expect(gameBoard.getRows()).toBe(rows);
    });

    test('getCols returns correct column count', () => {
        expect(gameBoard.getCols()).toBe(cols);
    });

    it('should replace a single panel correctly', () => {
        const newPanel = new Panel(PanelColor.RED, 1, 0, 0);
        gameBoard.replaceSinglePanel(newPanel);
        const board = gameBoard.getBoard();
        expect(board[0][0]).toEqual(newPanel);
    });
});
