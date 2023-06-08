import GameBoard from './GameBoard';
import ColorCounter from './ColorCounter';

class GameController {
    gameBoard: GameBoard;
    colorCounters: ColorCounter[];
    selectedColor: string | null = null;

    constructor(gameBoard: GameBoard, colorCounters: ColorCounter[]) {
        this.gameBoard = gameBoard;
        this.colorCounters = colorCounters;
    }

    selectColor(color: string): void {
        this.selectedColor = color;
    }

    selectPanel(panelNumber: number): void {
        if (this.selectedColor === null) {
            throw new Error('No color has been selected');
        }
        const row = Math.floor(panelNumber / this.gameBoard.getBoard()[0].length);
        const col = panelNumber % this.gameBoard.getBoard()[0].length;
        this.gameBoard.changeColor(row, col, this.selectedColor);
    }
}

export default GameController;
