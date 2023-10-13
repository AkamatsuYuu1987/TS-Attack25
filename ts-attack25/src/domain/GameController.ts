// GameController.ts
import { inject, injectable } from "inversify";
import GameBoard from './GameBoard';
import ColorCounterBoard from './ColorCounterBoard';
import { Panel, PanelColor } from './panel';
import SelectPanelExecutor from '@/domain/SelectPanelExecutor';
import { createPanelsToFlip } from "@/factories/panelsToFlipFactory";
import { PanelsToFlip } from './PanelsToFlip';
import { GameControllerTypes } from "@/types/GameControllerTypes";

@injectable()
class GameController {
    gameBoard: GameBoard;
    colorCounterBoard: ColorCounterBoard;
    selectedColor: PanelColor | null = null;
    selectPanelExecutor: SelectPanelExecutor;

    constructor(
        @inject(GameControllerTypes.GameBoard) gameBoard: GameBoard,
        @inject(GameControllerTypes.ColorCounterBoard) colorCounterBoard: ColorCounterBoard,
        @inject(GameControllerTypes.SelectPanelExecutor) selectPanelExecutor: SelectPanelExecutor
    ) {
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

        const panelsToFlip = createPanelsToFlip(newGameBoard.getBoard(), selectedPanel, this.selectedColor);
        this.selectPanelExecutor.flipPanels(panelsToFlip.getPanels(), this.selectedColor);


        // Create a new ColorCounterBoard and update the counters based on the new game board
        this.colorCounterBoard.updateColorCounters(newGameBoard.getBoard().flat());
        const newColorCounterBoard = this.colorCounterBoard;

        return { newGameBoard, newColorCounterBoard };
    }

    public applyColorChange(panelNumber: number): PanelsToFlip {
        // 最初のクリックしたパネルの扱いを決める

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

        const panelsToFlip = createPanelsToFlip(newGameBoard.getBoard(), selectedPanel, this.selectedColor);
        return panelsToFlip;
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
