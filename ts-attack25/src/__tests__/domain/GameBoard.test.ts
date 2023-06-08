import GameBoard from '@/domain/GameBoard';
import { Panel, PanelColor } from '@/domain/panel';

describe('GameBoard', () => {
    it('creates a square game board with correct size', () => {
        const gameBoard = new GameBoard(5, 5);
        const board = gameBoard.getBoard();
        expect(board.length).toBe(5);
        board.forEach(row => {
            expect(row.length).toBe(5);
            row.forEach(panel => {
                expect(panel.getColor()).toBe(PanelColor.GRAY);
            });
        });
    });

    it('creates a rectangular game board with correct size', () => {
        const gameBoard = new GameBoard(4, 6);
        const board = gameBoard.getBoard();
        expect(board.length).toBe(4);
        board.forEach(row => {
            expect(row.length).toBe(6);
            row.forEach(panel => {
                expect(panel.getColor()).toBe(PanelColor.GRAY);
            });
        });
    });

    it('changes panel color correctly', () => {
        const gameBoard = new GameBoard(5, 5);
        gameBoard.changeColor(0, 0, 'red');
        const panel = gameBoard.getBoard()[0][0];
        expect(panel.getColor()).toBe(PanelColor.RED);
    });

    it('returns true for isUniformColor if all panels are the same color', () => {
        const gameBoard = new GameBoard(5, 5);
        gameBoard.getBoard().forEach((row, i) => {
            row.forEach((_, j) => {
                gameBoard.changeColor(i, j, 'blue');
            });
        });
        expect(gameBoard.isUniformColor()).toBe(true);
    });

    it('returns false for isUniformColor if any panels are a different color', () => {
        const gameBoard = new GameBoard(5, 5);
        gameBoard.getBoard().forEach((row, i) => {
            row.forEach((_, j) => {
                gameBoard.changeColor(i, j, 'blue');
            });
        });
        gameBoard.changeColor(0, 0, 'red');
        expect(gameBoard.isUniformColor()).toBe(false);
    });
});
