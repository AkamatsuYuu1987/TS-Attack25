import GameBoard from './GameBoard';
import ColorCounter from './ColorCounter';
import { PanelColor } from './panel';

class GameController {
    gameBoard: GameBoard;
    colorCounters: ColorCounter[];
    selectedColor: PanelColor | null = null;

    constructor(gameBoard: GameBoard, colorCounters: ColorCounter[]) {
        this.gameBoard = gameBoard;
        this.colorCounters = colorCounters;
    }

    selectColor(color: PanelColor): void {
        this.selectedColor = color;
    }

    selectPanel(panelNumber: number): void {
        if (this.selectedColor === null) {
            throw new Error('No color has been selected');
        }
        const row = Math.floor(panelNumber / this.gameBoard.getBoard().length);
        const col = panelNumber % this.gameBoard.getBoard().length;
        this.gameBoard.changeColor(row, col, this.selectedColor);
    }
}

export default GameController;
