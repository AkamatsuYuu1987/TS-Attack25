import GameBoard from './GameBoard';
import ColorCounter from './ColorCounter';
import { Panel, PanelColor } from './panel';

class GameController {
    gameBoard: GameBoard;
    colorCounters: ColorCounter[];
    selectedColor: PanelColor | null = null;

    constructor(gameBoard: GameBoard, colorCounters: ColorCounter[]) {
        this.gameBoard = gameBoard;
        this.colorCounters = colorCounters;
    }

    setGameBoard(gameBoard: GameBoard): void {
        this.gameBoard = gameBoard;
    }

    selectColor(color: PanelColor): void {
        this.selectedColor = color;
    }

    selectPanel(panelNumber: number): GameBoard {
        if (this.selectedColor === null) {
            throw new Error('No color has been selected');
        }

        // Get the panel to be changed
        const panel = this.gameBoard.getBoard().flat().find(p => p.getNumber() === panelNumber);
        if (!panel) {
            throw new Error('Panel not found');
        }

        // Decrement the counter of the current panel's color, unless it's gray
        const currentColorCounter = this.colorCounters.find(counter => counter.getColor() === panel.getColor());
        if (currentColorCounter && panel.getColor() !== PanelColor.GRAY) {
            currentColorCounter.decrement();
        }

        // Clone the gameBoard and apply the color change
        const newGameBoard = new GameBoard(this.gameBoard.getBoard().length, this.gameBoard.getBoard()[0].length);
        newGameBoard.setBoard(this.gameBoard.getBoard().map(row => row.map(panel => new Panel(panel.getColor(), panel.getNumber()))));
        newGameBoard.changeColor(panelNumber, this.selectedColor);

        // Increment the counter of the new panel's color
        const newColorCounter = this.colorCounters.find(counter => counter.getColor() === this.selectedColor);
        if (newColorCounter) {
            newColorCounter.increment();
        }

        return newGameBoard;
    }
}

export default GameController;
