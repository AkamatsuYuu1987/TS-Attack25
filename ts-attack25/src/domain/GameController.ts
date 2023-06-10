import GameBoard from './GameBoard';
import ColorCounter from './ColorCounter';
import { Panel, PanelColor } from './panel';  // Fixed the import here

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

    selectPanel(panelNumber: number): GameBoard {
        if (this.selectedColor === null) {
            throw new Error('No color has been selected');
        }
        const row = Math.floor(panelNumber / this.gameBoard.getBoard().length);
        const col = panelNumber % this.gameBoard.getBoard().length;

        // Clone the gameBoard and apply the color change
        const newGameBoard = new GameBoard(this.gameBoard.getBoard().length, this.gameBoard.getBoard()[0].length);
        newGameBoard.setBoard(this.gameBoard.getBoard().map(row => row.map(panel => new Panel(panel.getColor(), panel.getNumber()))));
        newGameBoard.changeColor(panelNumber, this.selectedColor);

        return newGameBoard;
    }
}

export default GameController;
