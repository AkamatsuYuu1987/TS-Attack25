// GameController.ts
import GameBoard from './GameBoard';
import ColorCounterBoard from './ColorCounterBoard';
import { Panel, PanelColor } from './panel';
import SelectPanelExecutor from '@/domain/SelectPanelExecutor';
import { createPanelsToFlip } from "@/factories/panelsToFlipFactory";


class GameController {
    gameBoard: GameBoard;
    colorCounterBoard: ColorCounterBoard;
    selectedColor: PanelColor | null = null;
    selectPanelExecutor: SelectPanelExecutor;

    constructor(gameBoard: GameBoard, colorCounterBoard: ColorCounterBoard, selectPanelExecutor: SelectPanelExecutor) {
        this.gameBoard = gameBoard;
        this.colorCounterBoard = colorCounterBoard;
        this.selectPanelExecutor = selectPanelExecutor;
    }

    // colorCounterBoardを設定するメソッド
    setColorCounterBoard(colorCounterBoard: ColorCounterBoard): void {
        this.colorCounterBoard = colorCounterBoard;
    }

    setGameBoard(gameBoard: GameBoard): void {
        this.gameBoard = gameBoard;
    }

    selectColor(color: PanelColor): void {
        this.selectedColor = color;
    }

    selectPanel(panelNumber: number): { newGameBoard: GameBoard, newColorCounterBoard: ColorCounterBoard } {
        if (this.selectedColor === null) {
            throw new Error('No color has been selected');
        }

        const newGameBoard = this.gameBoard.clone();

        // Get the panel to be changed
        const selectedPanel = newGameBoard.getPanelByNumber(panelNumber);
        if (!selectedPanel) {
            throw new Error('Panel not found');
        }

        // Change the color of the selected panel
        selectedPanel.setColor(this.selectedColor);

        //const panelsToFlip = this.selectPanelExecutor.findPanelsToFlipInAllDirections(newGameBoard.getBoard(), selectedPanel, this.selectedColor);
        const panelsToFlip = createPanelsToFlip(newGameBoard.getBoard(), selectedPanel, this.selectedColor);
        this.selectPanelExecutor.flipPanels(panelsToFlip.getPanels(), this.selectedColor);


        // Create a new ColorCounterBoard and update the counters based on the new game board
        this.colorCounterBoard.updateColorCounters(newGameBoard.getBoard().flat());
        const newColorCounterBoard = this.colorCounterBoard;

        return { newGameBoard, newColorCounterBoard };
    }

    updateColorCounterboard(): ColorCounterBoard {
        this.colorCounterBoard.changeColorCounters(this.gameBoard.getBoard().flat());
        return this.colorCounterBoard;
    }

    updateGameBoard(panel: Panel): GameBoard {
        this.gameBoard.replaceSinglePanel(panel);
        return this.gameBoard;
    }

}

export default GameController;
